import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import FlatButton from 'material-ui/FlatButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'

import { ObjectDetectionLabeler, PageLoading } from 'components'
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

function LabelPage({
  mode,
  isLoadingProject,
  isLoadingFrame,
  isSavingFrame,
  isLoadingLabeledFrameList,
  name,
  type,
  frame,
  hasNextFrame,
  labeledFrameList,
  currentLabeledFrameIdx,
  labelList,
  updateFrame,
  saveFrame,
  goPrevLabeledFrame,
  goNextLabeledFrame,
  setLabelVisibility,
}) {
  const Content = () => {
    if (isLoadingProject) {
      return <PageLoading />
    } else {
      if (type !== SUPPORTED_LABEL_TYPES[0].code) {
        return null
      }

      return (
        <ObjectDetectionLabeler
          mode={mode}
          isLoadingFrame={isLoadingFrame}
          isSavingFrame={isSavingFrame}
          isLoadingLabeledFrameList={isLoadingLabeledFrameList}
          labelList={labelList}
          frame={frame}
          hasNextFrame={hasNextFrame}
          labeledFrameList={labeledFrameList}
          currentLabeledFrameIdx={currentLabeledFrameIdx}
          saveFrame={saveFrame}
          updateFrame={updateFrame}
          goPrevLabeledFrame={goPrevLabeledFrame}
          goNextLabeledFrame={goNextLabeledFrame}
          setLabelVisibility={setLabelVisibility}
        />
      )
    }
  }

  return (
    <div>
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text={name} />
        </ToolbarGroup>
        <ToolbarGroup lastChild={true}>
          <FlatButton label="Exit" href={'/projects'} />
        </ToolbarGroup>
      </Toolbar>
      <Container>
        <Content />
      </Container>
    </div>
  )
}

LabelPage.propTypes = {
  mode: PropTypes.string.isRequired,
  isLoadingProject: PropTypes.bool.isRequired,
  isLoadingFrame: PropTypes.bool.isRequired,
  isSavingFrame: PropTypes.bool.isRequired,
  isLoadingLabeledFrameList: PropTypes.bool.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  frame: PropTypes.object.isRequired,
  hasNextFrame: PropTypes.bool.isRequired,
  labeledFrameList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  currentLabeledFrameIdx: PropTypes.number.isRequired,
  labelList: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  updateFrame: PropTypes.func.isRequired,
  saveFrame: PropTypes.func.isRequired,
  goPrevLabeledFrame: PropTypes.func.isRequired,
  goNextLabeledFrame: PropTypes.func.isRequired,
  setLabelVisibility: PropTypes.func.isRequired,
}

export default LabelPage
