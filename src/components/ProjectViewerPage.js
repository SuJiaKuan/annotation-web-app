import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import find from 'lodash/find'
import map from 'lodash/map'

import { Card, CardTitle, CardText } from 'material-ui/Card'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'

import { PageLoading } from 'components'
import { SUPPORTED_LABEL_TYPES } from 'constants/Projects'

function ProjectViewerPage({ isLoading, projectView, mediaList }) {
  const NameWrapper = styled.h3`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  `

  const OverviewItemContent = styled.div`
    padding-left: 30px;
  `

  const Overview = ({ project }) => {
    const description = project.description ? project.description : 'No description yet'
    const type = find(SUPPORTED_LABEL_TYPES, { code: project.type })
    const typeName = type ? type.name : 'Unkown'

    return (
      <div>
        <Card>
          <CardTitle title="Overview" />
          <CardText>
            <Subheader>Description</Subheader>
            <OverviewItemContent>{description}</OverviewItemContent>
            <Subheader>Type</Subheader>
            <OverviewItemContent>{typeName}</OverviewItemContent>
          </CardText>
        </Card>
        <br />
      </div>
    )
  }

  const AttachedMediaList = ({ mediaList }) => {
    const rows = map(mediaList, media => {
      const size = media.frameNum
      const sizeText = `${size} ${size > 1 ? 'frames' : 'frame'}`

      return (
        <TableRow key={media._id}>
          <TableRowColumn>{media.name}</TableRowColumn>
          <TableRowColumn>{sizeText}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="view" secondary={true} href={`/media/${media._id}`} />
          </TableRowColumn>
        </TableRow>
      )
    })

    return (
      <Card>
        <CardTitle title="Attached Media list" />
        <CardText>
          <Table selectable={false}>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>Name</TableHeaderColumn>
                <TableHeaderColumn>Content</TableHeaderColumn>
                <TableHeaderColumn>View</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>{rows}</TableBody>
          </Table>
        </CardText>
      </Card>
    )
  }

  const Viewer = ({ project }) => {
    return (
      <div>
        <NameWrapper>
          {project.name}
          <RaisedButton label="Start Labeling" primary={true} href={`/label/${project._id}`} />
        </NameWrapper>
        <Overview project={project} />
        <AttachedMediaList mediaList={project.mediaList} />
        <br />
      </div>
    )
  }

  const Content = () => {
    if (isLoading) {
      return <PageLoading />
    } else if (!projectView) {
      return <h3>Fail to Load Project</h3>
    } else {
      return <Viewer project={projectView} />
    }
  }

  return <Content />
}

ProjectViewerPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  projectView: PropTypes.object,
}

export default ProjectViewerPage
