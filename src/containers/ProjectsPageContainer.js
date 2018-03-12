import React from 'react'
import PropTypes from 'prop-types'
import { ProjectsPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectsActions from 'actions/projects'

class ProjectsPageContainer extends React.Component {
  static propTypes = {
    media: PropTypes.object.isRequired,
    projects: PropTypes.object.isRequired,
  }

  render() {
    return <ProjectsPage mediaList={this.props.media.mediaList} projectList={this.props.projects.projectList} />
  }
}

const mapStateToProps = createStructuredSelector({
  media: createSelector(state => state.media, mediaState => mediaState),
  projects: createSelector(state => state.projects, projectsState => projectsState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageContainer)
