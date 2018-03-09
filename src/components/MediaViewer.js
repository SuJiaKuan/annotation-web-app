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

import { IMAGES_VIEW_UNIT } from 'constants/Media'

const MoreBtnWrapper = styled.div`
  display: flex;
  justify-content: center;
`

const enhance = withState('imagesViewLimit', 'increaseImagesViewLimit', IMAGES_VIEW_UNIT)

function MediaViewer({ mediaList, imagesViewLimit, increaseImagesViewLimit }) {
  const ImagesGallery = ({ media }) => {
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
    const images = map(slice(media.images, 0, imagesViewLimit), image => (
      <GridTile key={image}>
        <img src={image} alt={image} />
      </GridTile>
    ))

    return (
      <div>
        <h3>{media.name}</h3>
        <p>{media.description}</p>
        <GridList cellHeight={180} cols={4}>
          {images}
        </GridList>
        {media.images.length >= imagesViewLimit && (
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
    const media = find(mediaList, { id: match.params.id })

    if (!media) {
      return <h3>Media Not Found</h3>
    } else {
      return <ImagesGallery media={media} />
    }
  })

  return <Viewer />
}

MediaViewer.propTypes = {
  mediaList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default enhance(MediaViewer)
