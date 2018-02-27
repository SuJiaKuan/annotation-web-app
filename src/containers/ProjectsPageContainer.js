import React from 'react'
import { ProjectsPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as ProjectsActions from 'actions/projects'

class ProjectsPageContainer extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <ProjectsPage
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  counter: createSelector(
    (state) => state.counter,
    (counterState) => counterState
  ),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ProjectsActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ProjectsPageContainer)
