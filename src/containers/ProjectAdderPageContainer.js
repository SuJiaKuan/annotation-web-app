import React from 'react'
import PropTypes from 'prop-types'
import { ProjectAdderPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import merge from 'lodash/merge'

import connectDataFetchers from 'utils/connectDataFetchers'
import * as ProjectsActions from 'actions/projects'
import * as MediaActions from 'actions/media'

class ProjectAdderPageContainer extends React.Component {
  static propTypes = {
    projectAdder: PropTypes.object.isRequired,
    addProject: PropTypes.func.isRequired,
  }

  addProject = params => {
    this.props.addProject(params)
  }

  render() {
    return <ProjectAdderPage {...this.props.projectAdder} addProject={this.addProject} />
  }
}

const mapStateToProps = createStructuredSelector({
  projectAdder: createSelector(state => state.projectAdder, projectAdderState => projectAdderState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(merge(ProjectsActions, MediaActions), dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(
  connectDataFetchers(ProjectAdderPageContainer, ['getMediaList'])
)
