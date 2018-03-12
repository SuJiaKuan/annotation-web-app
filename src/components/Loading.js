import React from 'react'

import CircularProgress from 'material-ui/CircularProgress'

function Loading({ size = 100, thickness = 3, style = {} }) {
  return <CircularProgress size={size} thickness={thickness} style={style} />
}

export default Loading
