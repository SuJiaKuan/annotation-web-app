import { combineReducers } from 'redux'

import media from './media'
import projects from './projects'
import projectAdder from './projectAdder'
import label from './label'

const rootReducer = combineReducers({
  media,
  projects,
  projectAdder,
  label,
})

export default rootReducer
