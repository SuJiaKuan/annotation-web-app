import React from 'react'
import PropTypes from 'prop-types'
import { ProjectsPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as ProjectsActions from 'actions/projects'
import connectDataFetchers from 'utils/connectDataFetchers'

class ProjectsPageContainer extends React.Component {
  static propTypes = {
    projects: PropTypes.object.isRequired,
  }

  render() {
    return <ProjectsPage {...this.props.projects} />
  }
}

const mapStateToProps = createStructuredSelector({
  projects: createSelector(state => state.projects, projectsState => projectsState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectDataFetchers(ProjectsPageContainer, ['getProjectList'])
)
