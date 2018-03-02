import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListNavigation, ProjectList } from 'components'

function ProjectsPage({ datasetList, projectList }) {
  const Content = () => (
    <Switch>
      <Route exact path="/projects">
        <ProjectList projectList={projectList} />
      </Route>
      <Route exact path="/projects/new">
        <div>New</div>
      </Route>
      <Route path="/projects/:id">
        <div>ID</div>
      </Route>
    </Switch>
  )

  return (
    <div>
      <ListNavigation list={projectList} rootName="projects" />
      <Content />
    </div>
  )
}

ProjectsPage.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProjectsPage
