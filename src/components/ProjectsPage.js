import React from 'react'
import PropTypes from 'prop-types'

import concat from 'lodash/concat'
import map from 'lodash/map'

import ProjectIcon from 'material-ui/svg-icons/file/folder'
import NewProjectIcon from 'material-ui/svg-icons/file/create-new-folder'

import { ListNavigation, ListSummary } from 'components'

const DESC_LENGTH_LIMIT = 30

function ProjectsPage({ projectList }) {
  const ProjectList = () => {
    const adderInfo = {
      key: 'new',
      obvious: true,
      to: '/projects/new',
      icon: <NewProjectIcon />,
      primaryText: 'Add new project',
    }
    const listInfo = map(projectList, project => {
      const { _id, name, description } = project
      const desc =
        description.length > DESC_LENGTH_LIMIT ? `${description.substring(0, DESC_LENGTH_LIMIT)} ...` : description

      return {
        key: _id,
        to: `/projects/${_id}`,
        icon: <ProjectIcon />,
        primaryText: name,
        secondaryText: desc,
      }
    })
    const summary = concat([adderInfo], listInfo)

    return <ListSummary summary={summary} />
  }

  return (
    <div>
      <ListNavigation list={projectList} rootName="projects" />
      <ProjectList />
    </div>
  )
}

ProjectsPage.propTypes = {
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProjectsPage
