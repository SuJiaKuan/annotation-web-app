import React from 'react'
import PropTypes from 'prop-types'
import { MediaViewerPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as MediaActions from 'actions/media'
import connectDataFetchers from 'utils/connectDataFetchers'

class MediaViewerPageContainer extends React.Component {
  static propTypes = {
    mediaViewer: PropTypes.object.isRequired,
  }

  render() {
    return <MediaViewerPage {...this.props.mediaViewer} />
  }
}

const mapStateToProps = createStructuredSelector({
  mediaViewer: createSelector(state => state.mediaViewer, mediaViewerState => mediaViewerState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MediaActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(connectDataFetchers(MediaViewerPageContainer, ['getMedia']))
