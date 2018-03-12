import {
  GET_MEDIA_LIST_REQUEST,
  GET_MEDIA_LIST_SUCCESS,
  GET_MEDIA_LIST_FAIL,
  REFRESH_MEDIA_LIST_REQUEST,
  REFRESH_MEDIA_LIST_SUCCESS,
  REFRESH_MEDIA_LIST_FAIL,
} from 'constants/ActionTypes'

const initialState = {
  isLoading: false,
  mediaList: [],
}

export default function media(state = initialState, action) {
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
        isLoading: true,
      }
    }

    case REFRESH_MEDIA_LIST_REQUEST: {
      return {
        ...state,
      }
    }

    case REFRESH_MEDIA_LIST_SUCCESS: {
      return {
        ...state,
        mediaList: action.mediaList,
      }
    }

    case REFRESH_MEDIA_LIST_FAIL: {
      return {
        ...state,
      }
    }

    default:
      return state
  }
}
