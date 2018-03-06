import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import AutoComplete from 'material-ui/AutoComplete'
import { Card, CardActions, CardText, CardTitle } from 'material-ui/Card'
import Chip from 'material-ui/Chip'
import RaisedButton from 'material-ui/RaisedButton'

import concat from 'lodash/concat'
import includes from 'lodash/includes'
import map from 'lodash/map'
import remove from 'lodash/remove'

import tagColor from 'utils/tagColor'
import { PREDEFINED_TAGS } from 'constants/Label'

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`

const StyledCard = styled(Card)`
  width: 760px;
  height: 600px;
`

const InserterWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  > * {
    margin: 0 10px;
  }
`

const InsertedTagListWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  height: 330px;
  overflow: auto;
`

const Tag = styled(Chip)`
  margin-right: 10px !important;
  margin-bottom: 10px !important;
`

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: flex-end;
`

class LabelTagsAdder extends React.Component {
  static propTypes = {
    addTagList: PropTypes.func.isRequired,
  }

  state = {
    insertedTag: '',
    insertedTagList: [],
  }

  handleInsertedTagUpdate = insertedTag => {
    this.setState({
      insertedTag,
    })
  }

  handleTagInsert = () => {
    const { insertedTag, insertedTagList } = this.state

    this.setState({
      insertedTag: '',
      insertedTagList: concat(insertedTagList, insertedTag),
    })
  }

  handleTagRemove = removedTag => {
    this.setState({
      insertedTagList: remove(this.state.insertedTagList, insertedTag => insertedTag !== removedTag),
    })
  }

  handleCompleteBtnClick = () => {
    this.props.addTagList(this.state.insertedTagList)
  }

  renderInserter() {
    const { insertedTag, insertedTagList } = this.state
    const insertBtnDisabled = !insertedTag || includes(insertedTagList, insertedTag)

    return (
      <InserterWrapper>
        <AutoComplete
          floatingLabelText="Type a new tag name"
          fullWidth={true}
          searchText={insertedTag}
          onUpdateInput={this.handleInsertedTagUpdate}
          filter={AutoComplete.fuzzyFilter}
          dataSource={PREDEFINED_TAGS}
        />
        <RaisedButton label="Insert" secondary={true} disabled={insertBtnDisabled} onClick={this.handleTagInsert} />
      </InserterWrapper>
    )
  }

  renderInsertedTagList() {
    const tags = map(this.state.insertedTagList, (insertedTag, idx) => (
      <Tag
        key={insertedTag}
        labelColor="#FFF"
        backgroundColor={tagColor(idx)}
        onRequestDelete={this.handleTagRemove.bind(this, insertedTag)}
      >
        {insertedTag}
      </Tag>
    ))

    return <InsertedTagListWrapper>{tags}</InsertedTagListWrapper>
  }

  renderActions() {
    const completeBtnDisabled = this.state.insertedTagList.length === 0

    return (
      <StyledCardActions>
        <RaisedButton
          label="Complete"
          primary={true}
          disabled={completeBtnDisabled}
          onClick={this.handleCompleteBtnClick}
        />
      </StyledCardActions>
    )
  }

  render() {
    return (
      <Container>
        <StyledCard>
          <CardTitle title="Add Tags" subtitle="Please add tags for labeling" />
          <CardText>
            {this.renderInserter()}
            <br />
            {this.renderInsertedTagList()}
          </CardText>
          {this.renderActions()}
        </StyledCard>
      </Container>
    )
  }
}

export default LabelTagsAdder
