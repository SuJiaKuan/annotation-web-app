import React from 'react'
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom'
import styled from 'styled-components'

import { ProjectsPageContainer, DataPageContainer, LabelPageContainer } from 'containers'
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
    <Router>
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
                      <Route path="/projects" component={ProjectsPageContainer} />
                      <Route path="/data" component={DataPageContainer} />
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
