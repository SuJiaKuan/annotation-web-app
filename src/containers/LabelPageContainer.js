import React from 'react'
import PropTypes from 'prop-types'
import { LabelPage } from 'components'
import { createStructuredSelector, createSelector } from 'reselect'

import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as LabelActions from 'actions/label'

class LabelPageContainer extends React.Component {
  static propTypes = {
    label: PropTypes.object.isRequired,
    addTagList: PropTypes.func.isRequired,
  }

  addTagList = params => {
    this.props.addTagList(params)
  }

  render() {
    return <LabelPage {...this.props.label} addTagList={this.addTagList} />
  }
}

const mapStateToProps = createStructuredSelector({
  label: createSelector(state => state.label, labelState => labelState),
})

function mapDispatchToProps(dispatch) {
  return bindActionCreators(LabelActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LabelPageContainer)
