import React from 'react'
import PropTypes from 'prop-types'
import { DataPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as DataActions from 'actions/data'

class DataPageContainer extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    addDataset: PropTypes.func.isRequired,
  }

  addDataset = params => {
    this.props.addDataset(params)
  }

  render() {
    return <DataPage datasetList={this.props.data.datasetList} addDataset={this.addDataset} />
  }
}

const mapStateToProps = createStructuredSelector({
  data: createSelector(state => state.data, dataState => dataState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(DataActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(DataPageContainer)
