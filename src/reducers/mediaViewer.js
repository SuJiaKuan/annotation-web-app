import { GET_MEDIA_REQUEST, GET_MEDIA_SUCCESS, GET_MEDIA_FAIL } from 'constants/ActionTypes'

const initialState = {
  isLoading: false,
  mediaView: null,
}

export default function mediaViewer(state = initialState, action) {
  switch (action.type) {
    case GET_MEDIA_REQUEST: {
      return {
        ...state,
        isLoading: true,
      }
    }

    case GET_MEDIA_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        mediaView: action.mediaView,
      }
    }

    case GET_MEDIA_FAIL: {
      return {
        ...state,
        isLoading: false,
      }
    }

    default:
      return state
  }
}
