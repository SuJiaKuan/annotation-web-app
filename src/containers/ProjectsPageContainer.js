import React from 'react'
import PropTypes from 'prop-types'
import { ProjectsPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectsActions from 'actions/projects'

class ProjectsPageContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
    addProject: PropTypes.func.isRequired,
  }

  addProject = params => {
    this.props.addProject(params)
  }

  render() {
    return (
      <ProjectsPage
        datasetList={this.props.data.datasetList}
        projectList={this.props.projects.projectList}
        addProject={this.addProject}
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  data: createSelector(state => state.data, dataState => dataState),
  projects: createSelector(state => state.projects, projectsState => projectsState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageContainer)
