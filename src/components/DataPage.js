import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch, withRouter } from 'react-router-dom'

import find from 'lodash/find'
import split from 'lodash/split'

import Subheader from 'material-ui/Subheader'

import { DatasetAdder, DatasetList, Link } from 'components'

function DataPage({ datasetList, addDataset }) {
  const DataPath = withRouter(({ location }) => {
    let subPath = null
    const pathnames = split(location.pathname, '/')

    if (pathnames.length > 2) {
      if (pathnames[2] === 'new') {
        subPath = <Link to="/data/new">New</Link>
      } else {
        const dataset = find(datasetList, { id: pathnames[2] })

        subPath = <Link to={`/data/${dataset.id}`}>{dataset.name}</Link>
      }
    }

    return (
      <Subheader>
        <Link to="/data">Data</Link>
        {subPath && <a>{'  >  '}</a>}
        {subPath}
      </Subheader>
    )
  })
  const Content = () => (
    <Switch>
      <Route exact path="/data">
        <DatasetList datasetList={datasetList} />
      </Route>
      <Route exact path="/data/new">
        <DatasetAdder addDataset={addDataset} />
      </Route>
      <Route path="/data/:id">
        <div>ID</div>
      </Route>
    </Switch>
  )

  return (
    <div>
      <DataPath />
      <Content />
    </div>
  )
}

DataPage.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DataPage
