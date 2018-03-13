import { GET_PROJECT_LIST_REQUEST, GET_PROJECT_LIST_SUCCESS, GET_PROJECT_LIST_FAIL } from 'constants/ActionTypes'

const initialState = {
  isLoading: false,
  projectList: [],
}

export default function projects(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GET_PROJECT_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectList: action.projectList,
      }
    }

    case GET_PROJECT_LIST_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default:
      return state
  }
}
