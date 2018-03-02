import React from 'react'
import { render } from 'react-dom'
import { Provider } from 'react-redux'
import configureStore from 'store'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import { ThemeProvider } from 'styled-components'
import Routes from 'routes'
import 'styles/global-styles'
import registerServiceWorker from 'utils/registerServiceWorker'
import theme from 'styles/theme'

render(
  <Provider store={configureStore()}>
    <MuiThemeProvider>
      <ThemeProvider theme={theme}>
        <Routes />
      </ThemeProvider>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
registerServiceWorker()
