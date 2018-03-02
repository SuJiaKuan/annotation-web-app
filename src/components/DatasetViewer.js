import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { withState } from 'recompose'
import styled from 'styled-components'

import find from 'lodash/find'
import map from 'lodash/map'
import slice from 'lodash/slice'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import MoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import { IMAGES_VIEW_UNIT } from 'constants/Data'

const MoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const enhance = withState('imagesViewLimit', 'increaseImagesViewLimit', IMAGES_VIEW_UNIT)

function DatasetViewer({ datasetList, imagesViewLimit, increaseImagesViewLimit }) {
  const ImagesGallery = ({ dataset }) => {
    const size = 48
    const iconStyle = {
      width: size,
      height: size,
    }
    const btnStyle = {
      width: size * 2,
      height: size * 2,
      padding: size / 2,
    }
    const images = map(slice(dataset.images, 0, imagesViewLimit), image => (
      <GridTile key={image}>
        <img src={image} alt={image} />
      </GridTile>
    ))

    return (
      <div>
        <h3>{dataset.name}</h3>
        <p>{dataset.description}</p>
        <GridList cellHeight={180} cols={4}>
          {images}
        </GridList>
        {dataset.images.length >= imagesViewLimit && (
          <MoreBtnWrapper>
            <IconButton
              iconStyle={iconStyle}
              style={btnStyle}
              onClick={() => increaseImagesViewLimit(n => n + IMAGES_VIEW_UNIT)}
            >
              <MoreIcon />
            </IconButton>
          </MoreBtnWrapper>
        )}
      </div>
    )
  }

  const Viewer = withRouter(({ match }) => {
    const dataset = find(datasetList, { id: match.params.id })

    if (!dataset) {
      return <h3>Dataset Not Found</h3>
    } else {
      return <ImagesGallery dataset={dataset} />
    }
  })

  return <Viewer />
}

DatasetViewer.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default enhance(DatasetViewer)
