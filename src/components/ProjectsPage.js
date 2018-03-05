import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListNavigation, ProjectList, ProjectAdder } from 'components'

function ProjectsPage({ datasetList, projectList, addProject }) {
  const Content = () => (
    <Switch>
      <Route exact path="/projects">
        <ProjectList projectList={projectList} />
      </Route>
      <Route exact path="/projects/new">
        <ProjectAdder datasetList={datasetList} addProject={addProject} />
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
  addProject: PropTypes.func.isRequired,
}

export default ProjectsPage
