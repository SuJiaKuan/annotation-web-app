import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

import concat from 'lodash/concat'
import map from 'lodash/map'

import DatasetIcon from 'material-ui/svg-icons/image/collections'
import NewDatasetIcon from 'material-ui/svg-icons/image/add-to-photos'

import { ListSummary } from 'components'

function DatasetList({ datasetList }) {
  const adderInfo = {
    obvious: true,
    to: '/data/new',
    icon: <NewDatasetIcon />,
    primaryText: 'Add new dataset',
  }
  const listInfo = map(datasetList, dataset => {
    const size = dataset.images.length
    const sizeText = `${size} ${size > 1 ? 'images' : 'image'}`

    return {
      to: `/data/${dataset.id}`,
      icon: <DatasetIcon />,
      primaryText: dataset.name,
      secondaryText: sizeText,
    }
  })
  const summary = concat([adderInfo], listInfo)

  return <ListSummary summary={summary} />
}

DatasetList.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default pure(DatasetList)
