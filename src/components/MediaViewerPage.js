import React from 'react'
import PropTypes from 'prop-types'
import { withState } from 'recompose'
import styled from 'styled-components'

import map from 'lodash/map'
import slice from 'lodash/slice'

import { GridList, GridTile } from 'material-ui/GridList'
import IconButton from 'material-ui/IconButton'
import MoreIcon from 'material-ui/svg-icons/hardware/keyboard-arrow-down'

import { PageLoading } from 'components'
import { IMAGES_VIEW_UNIT } from 'constants/Media'
import config from 'config/client-config'

const MoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const enhance = withState('imagesViewLimit', 'increaseImagesViewLimit', IMAGES_VIEW_UNIT)

function MediaViewerPage({ isLoading, mediaView, imagesViewLimit, increaseImagesViewLimit }) {
  const ImagesGallery = ({ mediaView }) => {
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
    const images = map(slice(mediaView.frames, 0, imagesViewLimit), image => {
      const src = `${config.storeRoot}/${image.frameUri}`

      return (
        <GridTile key={image._id}>
          <img src={src} alt={src} />
        </GridTile>
      )
    })

    return (
      <div>
        <h3>{mediaView.name}</h3>
        <p>{mediaView.description}</p>
        <GridList cellHeight={180} cols={4}>
          {images}
        </GridList>
        {mediaView.frames.length >= imagesViewLimit && (
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

  const Viewer = () => {
    if (isLoading) {
      return <PageLoading />
    } else if (!mediaView) {
      return <h3>Fail to Load Media</h3>
    } else {
      return <ImagesGallery mediaView={mediaView} />
    }
  }

  return <Viewer />
}

MediaViewerPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  mediaView: PropTypes.object,
}

export default enhance(MediaViewerPage)
