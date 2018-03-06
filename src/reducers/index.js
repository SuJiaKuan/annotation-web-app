import { combineReducers } from 'redux'

import data from './data'
import projects from './projects'
import label from './label'

const rootReducer = combineReducers({
  data,
  projects,
  label,
})

export default rootReducer
