import React from 'react'
import PropTypes from 'prop-types'
import Promise from 'bluebird'

import map from 'lodash/map'

export default function connectDataFetchers(Component, actionCreators) {
  return class DataFetchersWrapper extends React.Component {
    static propTypes = {
      history: PropTypes.object.isRequired,
      location: PropTypes.object.isRequired,
      match: PropTypes.object.isRequired,
    }

    fetchData = () => {
      const { history, location, match } = this.props

      return Promise.all(map(actionCreators, actionCreator => this.props[actionCreator]({ history, location, match })))
    }

    componentDidUpdate(prevProps) {
      const { location } = this.props
      const { location: prevLocation } = prevProps

      const isUrlChanged = location.pathname !== prevLocation.pathname || location.search !== prevLocation.search

      if (isUrlChanged) {
        this.fetchData()
      }
    }

    componentDidMount() {
      this.fetchData()
    }

    render() {
      return <Component {...this.props} />
    }
  }
}
