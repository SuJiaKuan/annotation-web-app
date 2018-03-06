import concat from 'lodash/concat'

import { ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAIL } from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  projectList: [],
}

export default function data(state = initialState, action) {
  switch (action.type) {
    case ADD_PROJECT_REQUEST: {
      return {
        ...state,
        isFetch: true,
      }
    }

    case ADD_PROJECT_SUCCESS: {
      const newProjectList = concat(state.projectList, action.project)

      return {
        ...state,
        isFetch: false,
        projectList: newProjectList,
      }
    }

    case ADD_PROJECT_FAIL: {
      return {
        ...state,
        isFetch: false,
      }
    }

    default:
      return state
  }
}
