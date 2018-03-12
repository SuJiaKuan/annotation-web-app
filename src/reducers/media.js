import { GET_MEDIA_LIST_REQUEST, GET_MEDIA_LIST_SUCCESS, GET_MEDIA_LIST_FAIL } from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  mediaList: [],
}

export default function media(state = initialState, action) {
  switch (action.type) {
    case GET_MEDIA_LIST_REQUEST: {
      return {
        ...state,
        isFetch: true,
      }
    }

    case GET_MEDIA_LIST_SUCCESS: {
      return {
        ...state,
        isFetch: true,
        mediaList: action.mediaList,
      }
    }

    case GET_MEDIA_LIST_FAIL: {
      return {
        ...state,
        isFetch: true,
      }
    }

    default:
      return state
  }
}
