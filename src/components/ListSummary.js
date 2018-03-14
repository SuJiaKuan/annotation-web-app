import React from 'react'
import PropTypes from 'prop-types'
import pure from 'recompose/pure'
import styled from 'styled-components'

import map from 'lodash/map'
import merge from 'lodash/merge'

import Avatar from 'material-ui/Avatar'
import { List, ListItem } from 'material-ui/List'

import { Link } from 'components'

const ObviousAvatar = styled(Avatar)`
  background-color: ${props => `${props.theme.color.primary} !important`};
`

function ListSummary({ summary }) {
  const listItems = map(summary, item => {
    const { key, obvious, icon, to, disabled, primaryText, secondaryText } = item
    const avatar = obvious ? <ObviousAvatar icon={icon} /> : <Avatar icon={icon} />
    const baseItemStyle = {
      borderBottom: '1px solid rgb(224, 224, 224)',
    }
    const style = !disabled ? baseItemStyle : merge(baseItemStyle, { opacity: '0.5' })
    const listItemInner = (
      <ListItem
        leftAvatar={avatar}
        disabled={disabled}
        primaryText={primaryText}
        secondaryText={secondaryText}
        style={style}
      />
    )
    const listItemOutter = !disabled ? <Link to={to}>{listItemInner}</Link> : <div>{listItemInner}</div>

    return <div key={key}>{listItemOutter}</div>
  })

  return <List>{listItems}</List>
}

ListSummary.propTypes = {
  summary: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default pure(ListSummary)
