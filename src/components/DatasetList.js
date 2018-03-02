import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'

import map from 'lodash/map'

import Avatar from 'material-ui/Avatar'
import DatasetIcon from 'material-ui/svg-icons/image/collections'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'
import NewDatasetIcon from 'material-ui/svg-icons/image/add-to-photos'

import { Link } from 'components'

const AdderAvatar = styled(Avatar)`
  background-color: rgb(0, 188, 212) !important;
`

function DatasetList({ datasetList }) {
  const itemList = map(datasetList, dataset => {
    const size = dataset.images.length
    const sizeText = `${size} ${size > 1 ? 'images' : 'image'}`

    return (
      <Link key={dataset.id} to={`/data/${dataset.id}`}>
        <ListItem leftAvatar={<Avatar icon={<DatasetIcon />} />} primaryText={dataset.name} secondaryText={sizeText} />
        <Divider />
      </Link>
    )
  })

  return (
    <List>
      <Link to="/data/new">
        <ListItem leftAvatar={<AdderAvatar icon={<NewDatasetIcon />} />} primaryText="Add new dataset" />
      </Link>
      <Divider />
      {itemList}
    </List>
  )
}

DatasetList.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default pure(DatasetList)
