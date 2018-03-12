import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { ListNavigation, ProjectList } from 'components'

function ProjectsPage({ projectList }) {
  const Content = () => (
    <Switch>
      <Route exact path="/projects">
        <ProjectList projectList={projectList} />
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
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProjectsPage
