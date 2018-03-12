import React from 'react'
import PropTypes from 'prop-types'
import { MediaAdderPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import * as MediaActions from 'actions/media'

class MediaAdderPageContainer extends React.Component {
  static propTypes = {
    mediaAdder: PropTypes.object.isRequired,
    addMedia: PropTypes.func.isRequired,
  }

  render() {
    return <MediaAdderPage {...this.props} {...this.props.mediaAdder} />
  }
}

const mapStateToProps = createStructuredSelector({
  mediaAdder: createSelector(state => state.mediaAdder, mediaAdderState => mediaAdderState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(MediaActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MediaAdderPageContainer)
