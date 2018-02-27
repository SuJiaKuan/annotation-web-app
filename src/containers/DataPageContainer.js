import React from 'react'
import { DataPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from 'actions/data'

class DataPageContainer extends React.Component {
  static propTypes = {
  }

  render() {
    return (
      <DataPage
      />
    )
  }
}

const mapStateToProps = createStructuredSelector({
  counter: createSelector(
    (state) => state.counter,
    (counterState) => counterState
  ),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DataActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPageContainer)
