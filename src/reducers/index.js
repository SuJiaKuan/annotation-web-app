import { combineReducers } from 'redux'

import media from './media'
import mediaAdder from './mediaAdder'
import mediaViewer from './mediaViewer'
import projects from './projects'
import projectAdder from './projectAdder'
import label from './label'

const rootReducer = combineReducers({
  media,
  mediaAdder,
  mediaViewer,
  projects,
  projectAdder,
  label,
})

export default rootReducer
