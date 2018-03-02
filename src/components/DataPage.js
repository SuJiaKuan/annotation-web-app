import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { DatasetAdder, DatasetList, DatasetViewer, ListNavigation } from 'components'

function DataPage({ datasetList, addDataset }) {
  const Content = () => (
    <Switch>
      <Route exact path="/data">
        <DatasetList datasetList={datasetList} />
      </Route>
      <Route exact path="/data/new">
        <DatasetAdder addDataset={addDataset} />
      </Route>
      <Route path="/data/:id">
        <DatasetViewer datasetList={datasetList} />
      </Route>
    </Switch>
  )

  return (
    <div>
      <ListNavigation list={datasetList} rootName="data" />
      <Content />
    </div>
  )
}

DataPage.propTypes = {
  datasetList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default DataPage
