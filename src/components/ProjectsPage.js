import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListNavigation, ProjectList, ProjectViewer } from 'components'

function ProjectsPage({ mediaList, projectList }) {
  const Content = () => (
    <Switch>
      <Route exact path="/projects">
        <ProjectList projectList={projectList} />
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
}

export default ProjectsPage
