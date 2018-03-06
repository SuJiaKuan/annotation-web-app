import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import find from 'lodash/find'
import map from 'lodash/map'

import { Card, CardHeader, CardTitle, CardText } from 'material-ui/Card'
import FlatButton from 'material-ui/FlatButton'
import { GridList, GridTile } from 'material-ui/GridList'
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import ViewDatasetIcon from 'material-ui/svg-icons/navigation/arrow-forward'

import { SUPPORTED_LABEL_TYPES } from 'constants/Projects'

function ProjectViewer({ datasetList, projectList }) {
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

  const AttachedDatasets = ({ project }) => {
    const rows = map(project.datasetIds, id => {
      const dataset = find(datasetList, { id })
      const size = dataset.images.length
      const sizeText = `${size} ${size > 1 ? 'images' : 'image'}`

      return (
        <TableRow key={id}>
          <TableRowColumn>{dataset.name}</TableRowColumn>
          <TableRowColumn>{sizeText}</TableRowColumn>
          <TableRowColumn>
            <RaisedButton label="view" secondary={true} href={`/data/${id}`} />
          </TableRowColumn>
        </TableRow>
      )
    })

    return (
      <Card>
        <CardTitle title="Attached Datasets" />
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
          <RaisedButton label="Start Labeling" primary={true} href={`/label/${project.id}`} />
        </NameWrapper>
        <Overview project={project} />
        <AttachedDatasets project={project} />
        <br />
      </div>
    )
  }

  const Content = withRouter(({ match }) => {
    const project = find(projectList, { id: match.params.id })

    if (!project) {
      return <h3>Project Not Found</h3>
    } else {
      return <Viewer project={project} />
    }
  })

  return <Content />
}

ProjectViewer.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
  projectList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default ProjectViewer
