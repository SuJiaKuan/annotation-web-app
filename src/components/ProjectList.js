import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

import concat from 'lodash/concat'
import map from 'lodash/map'

import ProjectIcon from 'material-ui/svg-icons/file/folder'
import NewProjectIcon from 'material-ui/svg-icons/file/create-new-folder'

import { ListSummary } from 'components'

const DESC_LENGTH_LIMIT = 30

function ProjectList({ projectList }) {
  const adderInfo = {
    obvious: true,
    to: '/projects/new',
    icon: <NewProjectIcon />,
    primaryText: 'Add new project',
  }
  const listInfo = map(projectList, project => {
    const { description } = project
    const desc =
      description.length > DESC_LENGTH_LIMIT ? `${description.substring(0, DESC_LENGTH_LIMIT)} ...` : description

    return {
      to: `/projects/${project.id}`,
      icon: <ProjectIcon />,
      primaryText: project.name,
      secondaryText: desc,
    }
  })
  const summary = concat([adderInfo], listInfo)

  return <ListSummary summary={summary} />
}

ProjectList.propTypes = {
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default pure(ProjectList)
