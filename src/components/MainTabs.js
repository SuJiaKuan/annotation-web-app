import React from 'react'
import { withRouter } from 'react-router-dom'

import findIndex from 'lodash/findIndex'
import map from 'lodash/map'

import { BottomNavigation, BottomNavigationItem } from 'material-ui/BottomNavigation'
import FontIcon from 'material-ui/FontIcon'

const LABELS = ['projects', 'media']
const ICONS = ['style', 'image']

class MainTabs extends React.Component {
  handleClick = (history, value) => {
    history.push(value)
  }

  render() {
    const TabsWithRouter = withRouter(({ location, history }) => {
      const selectedIndex = findIndex(LABELS, label => location.pathname.startsWith(`/${label}`))
      const bottomList = map(LABELS, (label, idx) => {
        const icon = <FontIcon className="material-icons">{ICONS[idx]}</FontIcon>

        return (
          <BottomNavigationItem
            key={label}
            label={label}
            icon={icon}
            onClick={this.handleClick.bind(this, history, `/${label}`)}
          />
        )
      })

      return <BottomNavigation selectedIndex={selectedIndex}>{bottomList}</BottomNavigation>
    })

    return <TabsWithRouter />
  }
}

export default MainTabs
