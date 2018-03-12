import React from 'react'
import PropTypes from 'prop-types'

import concat from 'lodash/concat'
import map from 'lodash/map'

import MediaIcon from 'material-ui/svg-icons/image/collections'
import NewMediaIcon from 'material-ui/svg-icons/image/add-to-photos'

import { ListNavigation, ListSummary, PageLoading } from 'components'
import { MEDIA_STATUS } from 'constants/Media'

function MediaPage({ isLoading, mediaList }) {
  const MediaList = ({ mediaList }) => {
    const adderInfo = {
      key: 'new',
      obvious: true,
      to: '/media/new',
      icon: <NewMediaIcon />,
      primaryText: 'Add new media',
    }
    const listInfo = map(mediaList, media => {
      const disabled = media.status === MEDIA_STATUS.PROCESSING
      const secondaryText = disabled ? 'Processing...' : `${media.frameNum} ${media.frameNum > 1 ? 'frames' : 'frame'}`

      return {
        key: media._id,
        to: `/media/${media._id}`,
        icon: <MediaIcon />,
        disabled,
        primaryText: media.name,
        secondaryText,
      }
    })
    const summary = concat([adderInfo], listInfo)

    return <ListSummary summary={summary} />
  }

  return (
    <div>
      <ListNavigation list={mediaList} rootName="media" />
      <MediaList mediaList={mediaList} />
      {isLoading && <PageLoading />}
    </div>
  )
}

MediaPage.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  mediaList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MediaPage
