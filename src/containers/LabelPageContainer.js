import React from 'react'
import PropTypes from 'prop-types'
import { LabelPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'
import Promise from 'bluebird'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import map from 'lodash/map'
import merge from 'lodash/merge'

import * as LabelActions from 'actions/label'
import * as ProjectsActions from 'actions/projects'
import { LABEL_MODE } from 'constants/Label'

class LabelPageContainer extends React.Component {
  static propTypes = {
    label: PropTypes.object.isRequired,
    getFrame: PropTypes.func.isRequired,
    updateFrame: PropTypes.func.isRequired,
    saveFrame: PropTypes.func.isRequired,
    setLabelVisibility: PropTypes.func.isRequired,
  }

  componentDidMount() {
    if (this.getMode() === LABEL_MODE.NEW) {
      // Label new Frame.
      this.fetchData(['getProject', 'getFrame'])
    } else {
      // View labeled frames.
      this.fetchData(['getProject', 'getLabeledFrameList'])
    }
  }

  getId() {
    return this.props.match.params.id
  }

  getMode() {
    return this.props.location.pathname.startsWith('/label/') ? LABEL_MODE.NEW : LABEL_MODE.LABELED
  }

  fetchData = actionCreators => {
    const { history, location, match } = this.props

    return Promise.all(map(actionCreators, actionCreator => this.props[actionCreator]({ history, location, match })))
  }

  saveFrame = ({ frameId, labels }) => {
    this.props.saveFrame({
      projectId: this.props.match.params.id,
      frameId,
      labels,
      getNext: true,
    })
  }

  render() {
    return (
      <LabelPage
        {...this.props.label}
        id={this.getId()}
        mode={this.getMode()}
        updateFrame={this.props.updateFrame}
        saveFrame={this.saveFrame}
        goPrevLabeledFrame={this.props.goPrevLabeledFrame}
        goNextLabeledFrame={this.props.goNextLabeledFrame}
        setLabelVisibility={this.props.setLabelVisibility}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  label: createSelector(state => state.label, labelState => labelState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(merge(ProjectsActions, LabelActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelPageContainer)
