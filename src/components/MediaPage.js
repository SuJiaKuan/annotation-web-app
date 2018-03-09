import React from 'react'
import PropTypes from 'prop-types'
import { Route, Switch } from 'react-router-dom'

import { MediaAdder, MediaList, MediaViewer, ListNavigation } from 'components'

function MediaPage({ mediaList, addMedia }) {
  const Content = () => (
    <Switch>
      <Route exact path="/media">
        <MediaList mediaList={mediaList} />
      </Route>
      <Route exact path="/media/new">
        <MediaAdder addMedia={addMedia} />
      </Route>
      <Route path="/media/:id">
        <MediaViewer mediaList={mediaList} />
      </Route>
    </Switch>
  )

  return (
    <div>
      <ListNavigation list={mediaList} rootName="media" />
      <Content />
    </div>
  )
}

MediaPage.propTypes = {
  mediaList: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default MediaPage
