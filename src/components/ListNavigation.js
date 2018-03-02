import React from 'react'
import { withRouter } from 'react-router-dom'

import find from 'lodash/find'
import split from 'lodash/split'
import upperFirst from 'lodash/upperFirst'

import Subheader from 'material-ui/Subheader'

import { Link } from 'components'

function ListNavigation({ list, rootName, location }) {
  let subPath = null
  const pathnames = split(location.pathname, '/')

  if (pathnames.length > 2 && pathnames[2]) {
    let label

    if (pathnames[2] === 'new') {
      label = 'New'
    } else {
      const item = find(list, { id: pathnames[2] })

      label = item ? item.name : 'Not Found'
    }

    subPath = <Link to={location.pathname}>{label}</Link>
  }

  return (
    <Subheader>
      <Link to={`/${rootName}`}>{upperFirst(rootName)}</Link>
      {subPath && <a>{'  >  '}</a>}
      {subPath}
    </Subheader>
  )
}

export default withRouter(ListNavigation)
