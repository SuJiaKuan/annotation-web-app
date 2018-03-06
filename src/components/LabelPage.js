import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'

import { LabelTagsAdder } from 'components'
import { SUPPORTED_LABEL_TYPES } from 'constants/Projects'

const Container = styled.div`
  height: calc(100vh - 56px);
  width: 100vw;
  padding: 15px;
  box-sizing: border-box;
`

function LabelPage({ id, name, type, tagList, addTagList }) {
  const Content = () => {
    if (type !== SUPPORTED_LABEL_TYPES[0].code) {
      return null
    }

    return tagList.length === 0 ? <LabelTagsAdder addTagList={addTagList} /> : <div>labeling</div>
  }

  return (
    <div>
      <Toolbar>
        <ToolbarGroup fristChild={true}>
          <ToolbarTitle text={name} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Exit" href={`/projects/${id}`} />
        </ToolbarGroup>
      </Toolbar>
      <Container>
        <Content />
      </Container>
    </div>
  )
}

LabelPage.propTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  tagList: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  addTagList: PropTypes.func.isRequired,
}

export default LabelPage
