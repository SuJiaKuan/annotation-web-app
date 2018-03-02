import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'

import map from 'lodash/map'

import Avatar from 'material-ui/Avatar'
import Divider from 'material-ui/Divider'
import { List, ListItem } from 'material-ui/List'

import { Link } from 'components'

const ObviousAvatar = styled(Avatar)`
  background-color: ${props => `${props.theme.color.primary} !important`};
`

function ListSummary({ summary }) {
  const listItems = map(summary, (item, idx) => {
    const avatar = item.obvious ? <ObviousAvatar icon={item.icon} /> : <Avatar icon={item.icon} />

    // FIXME(Su JiaKuan): Use index as key is not recommended. Fix me please.
    return (
      <Link key={idx} to={item.to}>
        <ListItem leftAvatar={avatar} primaryText={item.primaryText} secondaryText={item.secondaryText} />
        <Divider />
      </Link>
    )
  })

  return <List>{listItems}</List>
}

ListSummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default pure(ListSummary)
