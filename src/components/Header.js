import React from 'react'
import { withRouter } from 'react-router-dom'

import findIndex from 'lodash/findIndex'
import map from 'lodash/map'

import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'

import history from 'routes/history'

const LABELS = ['projects', 'media']

function Header() {
  const tabStyle = {
    width: '140px',
    height: '64px',
  }

  const switchTab = newTab => {
    history.push(`/${newTab}`)
  }

  const TabList = withRouter(({ location }) => {
    const selectedIndex = findIndex(LABELS, label => location.pathname.startsWith(`/${label}`))
    const selectedTab = selectedIndex >= 0 ? LABELS[selectedIndex] : ''
    const tabs = map(LABELS, (label, idx) => {
      return <Tab key={label} label={label} value={label} style={tabStyle} />
    })

    return (
      <Tabs value={selectedTab} onChange={newTab => switchTab(newTab)}>
        {tabs}
      </Tabs>
    )
  })

  return (
    <AppBar
      title="Annotation"
      titleStyle={{ cursor: 'pointer' }}
      showMenuIconButton={false}
      onTitleClick={() => history.push('/')}
    >
      <TabList />
    </AppBar>
  )
}

export default Header
