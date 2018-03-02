import { combineReducers } from 'redux'

import data from './data'
import projects from './projects'

const rootReducer = combineReducers({
  data,
  projects,
})

export default rootReducer
