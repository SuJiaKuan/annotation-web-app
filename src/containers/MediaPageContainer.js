import React from 'react'
import PropTypes from 'prop-types'
import { MediaPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as MediaActions from 'actions/media'
import connectDataFetchers from 'utils/connectDataFetchers'

class MediaPageContainer extends React.Component {
  static propTypes = {
    media: PropTypes.object.isRequired,
    addMedia: PropTypes.func.isRequired,
  }

  addMedia = params => {
    this.props.addMedia(params)
  }

  render() {
    return <MediaPage mediaList={this.props.media.mediaList} addMedia={this.addMedia} />
  }
}

const mapStateToProps = createStructuredSelector({
  media: createSelector(state => state.media, mediaState => mediaState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MediaActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(connectDataFetchers(MediaPageContainer, ['getMediaList']))
