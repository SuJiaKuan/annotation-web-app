import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import concat from 'lodash/concat'
import includes from 'lodash/includes'
import map from 'lodash/map'
import remove from 'lodash/remove'

import AutoComplete from 'material-ui/AutoComplete'
import Chip from 'material-ui/Chip'
import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, StepContent, StepLabel, Stepper } from 'material-ui/Stepper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'

import { Link, PageLoading } from 'components'
import { labelColor } from 'utils/styles'
import { SUPPORTED_LABEL_TYPES, PREDEFINED_LABELS } from 'constants/Projects'

const ButtonsContainer = styled.div`
  margin-top: 15px;

  > * {
    margin-left: 15px;
    margin-right: 15px;
  }
`

const DescContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`

const MediaListSelectorContainer = styled.div`
  max-width: 400px;
`

const LabelsAdderContainer = styled.div`
  margin: 10px;
  width: 500px;
`

const LabelInserterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    margin: 0 10px;
  }
`

const InsertedLabelListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  max-height: 330px;
  overflow: auto;
`

const Label = styled(Chip)`
  margin-right: 10px !important;
  margin-bottom: 10px !important;
`

class ProjectAdder extends React.Component {
  static propTypes = {
    mediaList: PropTypes.arrayOf(PropTypes.object).isRequired,
    isLoading: PropTypes.bool.isRequired,
    isAdding: PropTypes.bool.isRequired,
    addProject: PropTypes.func.isRequired,
  }

  state = {
    stepIndex: 0,
    name: '',
    description: '',
    attachedMediaIds: [],
    selectedType: SUPPORTED_LABEL_TYPES[0].code,
    insertedLabel: '',
    insertedLabelList: [],
  }

  handlePrevBtnClick = () => {
    const { stepIndex } = this.state

    if (stepIndex > 0) {
      this.setState({
        stepIndex: stepIndex - 1,
      })
    }
  }

  handleNextBtnClick = () => {
    const { stepIndex } = this.state

    this.setState({
      stepIndex: stepIndex + 1,
    })
  }

  handleCompleteBtnClick = () => {
    this.props.addProject({
      name: this.state.name,
      description: this.state.description,
      mediaIds: this.state.attachedMediaIds,
      type: this.state.selectedType,
      labels: this.state.insertedLabelList,
      redirect: '/',
    })
  }

  handleNameChange = (e, name) => {
    this.setState({
      name,
    })
  }

  handleDescriptionChange = (e, description) => {
    this.setState({
      description,
    })
  }

  handleMediaListSelect = idxArr => {
    const { mediaList } = this.props

    this.setState({
      attachedMediaIds: map(idxArr, idx => mediaList[idx]._id),
    })
  }

  handleSelectedTypeChange = (e, value) => {
    this.setState({
      selectedType: value,
    })
  }

  handleInsertedLabelUpdate = insertedLabel => {
    this.setState({
      insertedLabel,
    })
  }

  handleLabelInsert = () => {
    const { insertedLabel, insertedLabelList } = this.state

    this.setState({
      insertedLabel: '',
      insertedLabelList: concat(insertedLabelList, insertedLabel),
    })
  }

  handleLabelRemove = removedLabel => {
    if (!this.props.isAdding) {
      this.setState({
        insertedLabelList: remove(this.state.insertedLabelList, insertedLabel => insertedLabel !== removedLabel),
      })
    }
  }

  renderNoMediaTip() {
    const ColorLink = Link.extend`
      color: ${props => `${props.theme.color.primary} !important`};
    `

    return (
      <div>
        <h4>No media found</h4>
        <ColorLink to="/media/new">Please Add a new media first</ColorLink>
      </div>
    )
  }

  renderStepActions() {
    const { mediaList, isAdding } = this.props
    const { stepIndex, name, attachedMediaIds, insertedLabelList } = this.state

    const prevBtnDisabled = stepIndex === 0 || (stepIndex === 3 && isAdding)
    const completBtnDisabled = insertedLabelList.length === 0 || isAdding
    let nextBtnDisabled = false

    if (stepIndex === 0) {
      nextBtnDisabled = !name
    } else if (stepIndex === 1) {
      nextBtnDisabled = mediaList.length === 0 || attachedMediaIds.length === 0
    }

    return (
      <ButtonsContainer>
        <FlatButton label="Back" disabled={prevBtnDisabled} onClick={this.handlePrevBtnClick} />
        {stepIndex < 3 && (
          <RaisedButton label="Next" primary={true} disabled={nextBtnDisabled} onClick={this.handleNextBtnClick} />
        )}
        {stepIndex === 3 && (
          <RaisedButton
            label="Complete"
            primary={true}
            disabled={completBtnDisabled}
            onClick={this.handleCompleteBtnClick}
          />
        )}
      </ButtonsContainer>
    )
  }

  renderDescInputs() {
    const { name, description } = this.state

    return (
      <DescContainer>
        <TextField floatingLabelText="Project Name" value={name} onChange={this.handleNameChange} />
        <TextField
          floatingLabelText="Project Description"
          multiLine={true}
          rows={3}
          value={description}
          onChange={this.handleDescriptionChange}
        />
      </DescContainer>
    )
  }

  renderMediaListSelector() {
    const { mediaList } = this.props
    const { attachedMediaIds } = this.state

    const showSelector = mediaList.length > 0
    const rows = map(mediaList, media => {
      const selected = includes(attachedMediaIds, media._id)
      const size = media.frameNum
      const sizeText = `${size} ${size > 1 ? 'frames' : 'frame'}`

      return (
        <TableRow key={media._id} selected={selected}>
          <TableRowColumn>{media.name}</TableRowColumn>
          <TableRowColumn>{sizeText}</TableRowColumn>
        </TableRow>
      )
    })

    return (
      <MediaListSelectorContainer>
        {showSelector && <p>Plase select one or more media</p>}
        {showSelector && (
          <Table multiSelectable={true} onRowSelection={this.handleMediaListSelect}>
            <TableBody deselectOnClickaway={false}>{rows}</TableBody>
          </Table>
        )}
      </MediaListSelectorContainer>
    )
  }

  renderTypeSelector() {
    const { selectedType } = this.state

    const options = map(SUPPORTED_LABEL_TYPES, (type, idx) => {
      return <RadioButton key={type.code} label={type.name} value={type.code} />
    })

    return (
      <div>
        <p>Please select a label type</p>
        <RadioButtonGroup
          name="label type"
          valueSelcted={selectedType}
          defaultSelected={SUPPORTED_LABEL_TYPES[0].code}
          onChange={this.handleSelectedTypeChange}
        >
          {options}
        </RadioButtonGroup>
      </div>
    )
  }

  renderLabelInserter() {
    const { isAdding } = this.props
    const { insertedLabel, insertedLabelList } = this.state

    const inputDisabled = isAdding
    const insertBtnDisabled = !insertedLabel || includes(insertedLabelList, insertedLabel) || isAdding

    return (
      <LabelInserterWrapper>
        <AutoComplete
          disabled={inputDisabled}
          floatingLabelText="Type a new label name"
          fullWidth={true}
          searchText={insertedLabel}
          onUpdateInput={this.handleInsertedLabelUpdate}
          filter={AutoComplete.fuzzyFilter}
          dataSource={PREDEFINED_LABELS}
        />
        <RaisedButton label="Insert" secondary={true} disabled={insertBtnDisabled} onClick={this.handleLabelInsert} />
      </LabelInserterWrapper>
    )
  }

  renderInsertedLabelList() {
    const { isAdding } = this.props

    const deleteIconStyle = !isAdding
      ? {}
      : {
          cursor: 'not-allowed',
        }
    const labels = map(this.state.insertedLabelList, (insertedLabel, idx) => (
      <Label
        key={insertedLabel}
        labelColor="#FFF"
        backgroundColor={labelColor(idx)}
        deleteIconStyle={deleteIconStyle}
        onRequestDelete={this.handleLabelRemove.bind(this, insertedLabel)}
      >
        {insertedLabel}
      </Label>
    ))

    return <InsertedLabelListWrapper>{labels}</InsertedLabelListWrapper>
  }

  renderLabelsAdder() {
    return (
      <LabelsAdderContainer>
        {this.renderLabelInserter()}
        <br />
        {this.renderInsertedLabelList()}
      </LabelsAdderContainer>
    )
  }

  render() {
    const { isLoading, mediaList } = this.props
    return (
      <div>
        {isLoading && <PageLoading />}
        {!isLoading && mediaList.length === 0 && this.renderNoMediaTip()}
        {!isLoading &&
          mediaList.length > 0 && (
            <Stepper activeStep={this.state.stepIndex} orientation="vertical">
              <Step>
                <StepLabel>Project Description</StepLabel>
                <StepContent>
                  {this.renderDescInputs()}
                  {this.renderStepActions()}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Attach Media from List</StepLabel>
                <StepContent>
                  {this.renderMediaListSelector()}
                  {this.renderStepActions()}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Select Label Type</StepLabel>
                <StepContent>
                  {this.renderTypeSelector()}
                  {this.renderStepActions()}
                </StepContent>
              </Step>
              <Step>
                <StepLabel>Insert Labels</StepLabel>
                <StepContent>
                  {this.renderLabelsAdder()}
                  {this.renderStepActions()}
                </StepContent>
              </Step>
            </Stepper>
          )}
      </div>
    )
  }
}

export default ProjectAdder
