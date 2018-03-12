import React from 'react'
import { Router, Route, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components'

import history from './history'
import {
  ProjectsPageContainer,
  ProjectAdderPageContainer,
  MediaPageContainer,
  MediaAdderPageContainer,
  MediaViewerPageContainer,
  LabelPageContainer,
} from 'containers'
import { Header, MainTabs } from 'components'

const Container = styled.div`
  display: flex;
  justify-content: center;
`
const AppContent = styled.div`
  width: 980px;
`

function Routes() {
  return (
    <Router history={history}>
      <div>
        <Route exact path="/label/:id" component={LabelPageContainer} />
        <Route
          path="/"
          render={({ location }) => {
            if (location.pathname.startsWith('/label/')) {
              return null
            }

            return (
              <div>
                <Header />
                <MainTabs />
                <Container>
                  <AppContent>
                    <Switch>
                      <Route exact path="/" render={() => <Redirect to="/projects" />} />
                      <Route path="/projects/new" component={ProjectAdderPageContainer} />
                      <Route path="/projects" component={ProjectsPageContainer} />
                      <Route path="/media/new" component={MediaAdderPageContainer} />
                      <Route path="/media/:id" component={MediaViewerPageContainer} />
                      <Route path="/media" component={MediaPageContainer} />
                    </Switch>
                  </AppContent>
                </Container>
              </div>
            )
          }}
        />
      </div>
    </Router>
  )
}

export default Routes
