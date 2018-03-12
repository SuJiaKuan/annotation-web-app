import { combineReducers } from 'redux'

import media from './media'
import mediaAdder from './mediaAdder'
import projects from './projects'
import projectAdder from './projectAdder'
import label from './label'

const rootReducer = combineReducers({
  media,
  mediaAdder,
  projects,
  projectAdder,
  label,
})

export default rootReducer
