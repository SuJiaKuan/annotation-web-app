import { combineReducers } from 'redux'

import media from './media'
import projects from './projects'
import label from './label'

const rootReducer = combineReducers({
  media,
  projects,
  label,
})

export default rootReducer
