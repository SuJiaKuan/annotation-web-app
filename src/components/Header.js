import React from 'react'
import { withState } from 'recompose'

import map from 'lodash/map'

import AppBar from 'material-ui/AppBar'
import { Tabs, Tab } from 'material-ui/Tabs'

import history from 'routes/history'

const LABELS = ['projects', 'media']

const enhance = withState('selectedTab', 'setSelectedTab', LABELS[0])

function Header({ selectedTab, setSelectedTab }) {
  const tabStyle = {
    width: '140px',
    height: '64px',
  }

  const switchTab = newTab => {
    setSelectedTab(() => newTab)
    history.push(`/${newTab}`)
  }

  const TabList = () => {
    const tabs = map(LABELS, (label, idx) => {
      return <Tab key={label} label={label} value={label} style={tabStyle} />
    })

    return (
      <Tabs value={selectedTab} onChange={newTab => switchTab(newTab)}>
        {tabs}
      </Tabs>
    )
  }

  return (
    <AppBar title="Annotation" showMenuIconButton={false}>
      <TabList />
    </AppBar>
  )
}

export default enhance(Header)
