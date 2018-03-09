import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import isArray from 'lodash/isArray'
import reduce from 'lodash/reduce'

import Dropzone from 'react-dropzone'
import FlatButton from 'material-ui/FlatButton'
import RaisedButton from 'material-ui/RaisedButton'
import { Step, StepLabel, Stepper } from 'material-ui/Stepper'
import TextField from 'material-ui/TextField'

import { ACCEPT_VIDEO_TYPES } from 'constants/AcceptDataTypes'

const VerticalContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const HorizontalContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;

  > * {
    margin-left: 10px;
    margin-right: 10px;
  }
`

const StyledTextField = styled(TextField)`
  margin-left: 10px;
  margin-right: 10px;
`

const StyledDropzone = styled(Dropzone)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: 420px;
  border-width: 3px;
  border-color: ${props => props.theme.color.primary};
  border-style: dashed;
  border-radius: 5px;
  opacity: ${props => (props.dragged ? 0.3 : 1)};
  transition: opacity 0.3s linear;
`

class MediaAdder extends React.Component {
  static propTypes = {
    addMedia: PropTypes.func.isRequired,
  }

  state = {
    mediaDesc: '',
    mediaName: '',
    dragged: false,
    file: null,
    stepIndex: 0,
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

  handleUploadBtnClick = history => {
    this.props.addMedia({
      name: this.state.mediaName,
      description: this.state.mediaDesc,
      media: this.state.file,
    })

    history.push('/media')
  }

  handleFileBtnClick = () => {
    this.dropzone.open()
  }

  handleMediaNameChange = (e, mediaName) => {
    this.setState({
      mediaName,
    })
  }

  handleMediaDescChange = (e, mediaDesc) => {
    this.setState({
      mediaDesc,
    })
  }

  handleFilesDrop = files => {
    this.setState({
      dragged: false,
    })

    if (isArray(files) && files[0]) {
      const file = files[0]

      this.setState({
        file,
      })
    }
  }

  handleDragEnter = () => {
    this.setState({
      dragged: true,
    })
  }

  handleDragLeave = () => {
    this.setState({
      dragged: false,
    })
  }

  render() {
    const { mediaDesc, mediaName, file, stepIndex } = this.state

    const acceptTypes = reduce(ACCEPT_VIDEO_TYPES, (pre, cur) => pre + `video/${cur},`, '')
    const UploadButton = withRouter(({ history }) => (
      <RaisedButton label="Upload" primary={true} onClick={this.handleUploadBtnClick.bind(this, history)} />
    ))

    let nextDisabled

    if (stepIndex === 0) {
      nextDisabled = !mediaName
    } else if (stepIndex === 1) {
      nextDisabled = !file
    }

    return (
      <VerticalContainer>
        <Stepper activeStep={stepIndex}>
          <Step>
            <StepLabel>Media Description</StepLabel>
          </Step>
          <Step>
            <StepLabel>Select File</StepLabel>
          </Step>
          <Step>
            <StepLabel>Upload</StepLabel>
          </Step>
        </Stepper>

        {stepIndex === 0 && (
          <VerticalContainer>
            <StyledTextField floatingLabelText="Media Name" value={mediaName} onChange={this.handleMediaNameChange} />
            <StyledTextField
              floatingLabelText="Description"
              multiLine={true}
              rows={3}
              value={mediaDesc}
              onChange={this.handleMediaDescChange}
            />
          </VerticalContainer>
        )}
        {stepIndex === 1 && (
          <VerticalContainer>
            <StyledDropzone
              innerRef={dropzone => (this.dropzone = dropzone)}
              accept={acceptTypes}
              disableClick={true}
              multiple={false}
              dragged={this.state.dragged}
              onDrop={this.handleFilesDrop}
              onDragEnter={this.handleDragEnter}
              onDragLeave={this.handleDragLeave}
            >
              <RaisedButton label="Select File" primary={true} onClick={this.handleFileBtnClick} />
              <p>{'Or drag & drop your video anywhere'}</p>
            </StyledDropzone>
            <p>{`Selected file: ${file ? file.name : 'none'}`}</p>
          </VerticalContainer>
        )}
        {stepIndex === 2 && (
          <VerticalContainer>
            <p>{`Media Name: ${mediaName}`}</p>
            <p>{`Selected File: ${file.name}`}</p>
          </VerticalContainer>
        )}

        <br />
        <HorizontalContainer>
          <FlatButton label="Back" disabled={stepIndex === 0} onClick={this.handlePrevBtnClick} />
          {stepIndex < 2 && (
            <RaisedButton label="Next" primary={true} disabled={nextDisabled} onClick={this.handleNextBtnClick} />
          )}
          {stepIndex === 2 && <UploadButton />}
        </HorizontalContainer>
      </VerticalContainer>
    )
  }
}

export default MediaAdder