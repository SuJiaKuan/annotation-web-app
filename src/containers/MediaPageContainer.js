import React from 'react'
import PropTypes from 'prop-types'
import { MediaPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import find from 'lodash/find'

import * as MediaActions from 'actions/media'
import connectDataFetchers from 'utils/connectDataFetchers'
import { MEDIA_STATUS } from 'constants/Media'

const REFRESH_INTERVAL = 3000

class MediaPageContainer extends React.Component {
  static propTypes = {
    media: PropTypes.object.isRequired,
  }

  componentDidMount() {
    this.refresher = setInterval(() => {
      if (find(this.props.media.mediaList, { status: MEDIA_STATUS.PROCESSING })) {
        this.props.refreshMediaList()
      }
    }, REFRESH_INTERVAL)
  }

  componentWillUnmount() {
    clearInterval(this.refresher)
  }

  render() {
    return <MediaPage {...this.props.media} />
  }
}

const mapStateToProps = createStructuredSelector({
  media: createSelector(state => state.media, mediaState => mediaState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MediaActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(connectDataFetchers(MediaPageContainer, ['getMediaList']))
