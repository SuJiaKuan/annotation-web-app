import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import includes from 'lodash/includes'
import map from 'lodash/map'

import FlatButton from 'material-ui/FlatButton'
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, StepContent, StepLabel, Stepper } from 'material-ui/Stepper'
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'

import { Link } from 'components'
import { SUPPORTED_LABEL_TYPES } from 'constants/Projects'

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

const DatasetsSelectorContainer = styled.div`
  max-width: 400px;
`

class ProjectAdder extends React.Component {
  static propTypes = {
    datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
    addProject: PropTypes.func.isRequired,
  }

  state = {
    stepIndex: 0,
    name: '',
    description: '',
    attachedDatasets: '',
    selectedType: SUPPORTED_LABEL_TYPES[0].code,
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

  handleCompleteBtnClick = history => {
    this.props.addProject({
      name: this.state.name,
      description: this.state.description,
      datasets: this.state.attachedDatasets,
      type: this.state.selectedType,
    })

    history.push('/projects')
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

  handleDatasetsSelect = idxArr => {
    const { datasetList } = this.props

    this.setState({
      attachedDatasets: map(idxArr, idx => datasetList[idx].id),
    })
  }

  handleSelectedTypeChange = (e, value) => {
    this.setState({
      selectedType: value,
    })
  }

  renderStepActions() {
    const { datasetList } = this.props
    const { stepIndex, name, attachedDatasets } = this.state

    const prevBtnDisabled = stepIndex === 0
    const nextBtnDisabled = stepIndex === 0 ? !name : datasetList.length === 0 || attachedDatasets.length === 0

    const CompleteButton = withRouter(({ history }) => (
      <RaisedButton label="Complete" primary={true} onClick={this.handleCompleteBtnClick.bind(this, history)} />
    ))

    return (
      <ButtonsContainer>
        <FlatButton label="Back" disabled={prevBtnDisabled} onClick={this.handlePrevBtnClick} />
        {stepIndex < 2 && (
          <RaisedButton label="Next" primary={true} disabled={nextBtnDisabled} onClick={this.handleNextBtnClick} />
        )}
        {stepIndex === 2 && <CompleteButton />}
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

  renderDatasetsSelector() {
    const { datasetList } = this.props
    const { attachedDatasets } = this.state

    const ColorLink = Link.extend`
      color: ${props => `${props.theme.color.primary} !important`};
    `

    const showSelector = datasetList.length > 0
    const rows = map(datasetList, dataset => {
      const selected = includes(attachedDatasets, dataset.id)
      const size = dataset.images.length
      const sizeText = `${size} ${size > 1 ? 'images' : 'image'}`

      return (
        <TableRow key={dataset.id} selected={selected}>
          <TableRowColumn>{dataset.name}</TableRowColumn>
          <TableRowColumn>{sizeText}</TableRowColumn>
        </TableRow>
      )
    })

    return (
      <DatasetsSelectorContainer>
        {showSelector && <p>Plase select one or more datasets</p>}
        {!showSelector && <ColorLink to="/data/new">Please Add a new dataset first</ColorLink>}
        {showSelector && (
          <Table multiSelectable={true} onRowSelection={this.handleDatasetsSelect}>
            <TableBody deselectOnClickaway={false}>{rows}</TableBody>
          </Table>
        )}
      </DatasetsSelectorContainer>
    )
  }

  renderTypeSelector() {
    const { selectedType } = this.state

    const options = map(SUPPORTED_LABEL_TYPES, (type, idx) => {
      return <RadioButton key={type.code} label={type.name} value={type.code} />
    })

    return (
      <div>
        <p>Please select a more label type</p>
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

  render() {
    const { stepIndex } = this.state

    return (
      <Stepper activeStep={stepIndex} orientation="vertical">
        <Step>
          <StepLabel>Project Description</StepLabel>
          <StepContent>
            {this.renderDescInputs()}
            {this.renderStepActions()}
          </StepContent>
        </Step>
        <Step>
          <StepLabel>Attach Datasets</StepLabel>
          <StepContent>
            {this.renderDatasetsSelector()}
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
      </Stepper>
    )
  }
}

export default ProjectAdder
