import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { ProjectsPageContainer, DataPageContainer } from 'containers'
import { Header, MainTabs } from 'components'

const Container = styled.div``

function Routes() {
  return (
    <Router>
      <Container>
        <Header />
        <MainTabs />
        <Switch>
          <Route exact path='/' render={() => (<Redirect to='/projects' />)} />
          <Route path='/projects' component={ProjectsPageContainer} />
          <Route path='/data' component={DataPageContainer} />
        </Switch>
      </Container>
    </Router>
  )
}

export default Routes
