import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'

import concat from 'lodash/concat'
import map from 'lodash/map'

import MediaIcon from 'material-ui/svg-icons/image/collections'
import NewMediaIcon from 'material-ui/svg-icons/image/add-to-photos'

import { ListSummary } from 'components'

function MediaList({ mediaList }) {
  const adderInfo = {
    obvious: true,
    to: '/media/new',
    icon: <NewMediaIcon />,
    primaryText: 'Add new media',
  }
  const listInfo = map(mediaList, media => {
    const size = media.frameNum
    const sizeText = `${size} ${size > 1 ? 'frames' : 'frame'}`

    return {
      to: `/media/${media._id}`,
      icon: <MediaIcon />,
      primaryText: media.name,
      secondaryText: sizeText,
    }
  })
  const summary = concat([adderInfo], listInfo)

  return <ListSummary summary={summary} />
}

MediaList.propTypes = {
  mediaList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default pure(MediaList)
