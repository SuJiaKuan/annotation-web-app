import React from 'react'
import PropTypes from 'prop-types'
import { LabelPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import merge from 'lodash/merge'

import * as LabelActions from 'actions/label'
import * as ProjectsActions from 'actions/projects'
import connectDataFetchers from 'utils/connectDataFetchers'

class LabelPageContainer extends React.Component {
  static propTypes = {
    label: PropTypes.object.isRequired,
    getFrame: PropTypes.func.isRequired,
    updateFrame: PropTypes.func.isRequired,
    saveFrame: PropTypes.func.isRequired,
    setLabelVisibility: PropTypes.func.isRequired,
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
        getFrame={this.props.getFrame}
        updateFrame={this.props.updateFrame}
        saveFrame={this.saveFrame}
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

export default connect(mapStateToProps, mapDispatchToProps)(
  connectDataFetchers(LabelPageContainer, ['getProject', 'getFrame'])
)
