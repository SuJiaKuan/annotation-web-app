import { GET_PROJECT_REQUEST, GET_PROJECT_SUCCESS, GET_PROJECT_FAIL } from 'constants/ActionTypes'

const initialState = {
  isLoading: false,
  projectView: null,
}

export default function projectAdder(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GET_PROJECT_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        projectView: action.projectView,
      }
    }

    case GET_PROJECT_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default:
      return state
  }
}
