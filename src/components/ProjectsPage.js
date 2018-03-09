import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListNavigation, ProjectList, ProjectAdder, ProjectViewer } from 'components'

function ProjectsPage({ mediaList, projectList, addProject }) {
  const Content = () => (
    <Switch>
      <Route exact path="/projects">
        <ProjectList projectList={projectList} />
      </Route>
      <Route exact path="/projects/new">
        <ProjectAdder mediaList={mediaList} addProject={addProject} />
      </Route>
      <Route path="/projects/:id">
        <ProjectViewer projectList={projectList} mediaList={mediaList} />
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
  mediaList: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
  addProject: PropTypes.func.isRequired,
}

export default ProjectsPage
