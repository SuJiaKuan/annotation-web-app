import React from 'react'
import PropTypes from 'prop-types'
import { ProjectViewerPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ProjectsActions from 'actions/projects'
import connectDataFetchers from 'utils/connectDataFetchers'

class ProjectViewerPageContainer extends React.Component {
  static propTypes = {
    projectViewer: PropTypes.object.isRequired,
  }

  render() {
    return <ProjectViewerPage {...this.props.projectViewer} />
  }
}

const mapStateToProps = createStructuredSelector({
  projectViewer: createSelector(state => state.projectViewer, projectViewerState => projectViewerState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectDataFetchers(ProjectViewerPageContainer, ['getProject'])
)
