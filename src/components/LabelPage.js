import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'

import { ObjectDetectionLabeler } from 'components'
import { SUPPORTED_LABEL_TYPES } from 'constants/Projects'

const Container = styled.div`
  height: calc(100vh - 56px);
  width: 100vw;
  padding: 15px;
  box-sizing: border-box;

  * {
    box-sizing: border-box;
  }
`

function LabelPage({ id, name, type, tagList, labelList, currentLabelIdx, setTagVisibility, updateLabelContent }) {
  const Content = () => {
    if (type !== SUPPORTED_LABEL_TYPES[0].code) {
      return null
    }

    return (
      <ObjectDetectionLabeler
        tagList={tagList}
        labelList={labelList}
        currentLabelIdx={currentLabelIdx}
        setTagVisibility={setTagVisibility}
        updateLabelContent={updateLabelContent}
      />
    )
  }

  return (
    <div>
      <Toolbar>
        <ToolbarGroup firstChild={true}>
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
  tagList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  labelList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  currentLabelIdx: PropTypes.number.isRequired,
  setTagVisibility: PropTypes.func.isRequired,
  updateLabelContent: PropTypes.func.isRequired,
}

export default LabelPage
