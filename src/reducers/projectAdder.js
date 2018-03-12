import {
  GET_MEDIA_LIST_REQUEST,
  GET_MEDIA_LIST_SUCCESS,
  GET_MEDIA_LIST_FAIL,
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
} from 'constants/ActionTypes'

const initialState = {
  isAdding: false,
  isLoading: true,
  mediaList: [],
}

export default function projectAdder(state = initialState, action) {
  switch (action.type) {
    case GET_MEDIA_LIST_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GET_MEDIA_LIST_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        mediaList: action.mediaList,
      }
    }

    case GET_MEDIA_LIST_FAIL: {
      return {
        ...state,
        isLoaded: false,
      }
    }

    case ADD_PROJECT_REQUEST: {
      return {
        ...state,
        isAdding: true,
      }
    }

    case ADD_PROJECT_SUCCESS: {
      return {
        ...state,
        isAdding: false,
      }
    }

    case ADD_PROJECT_FAIL: {
      return {
        ...state,
        isAdding: false,
      }
    }

    default:
      return state
  }
}
