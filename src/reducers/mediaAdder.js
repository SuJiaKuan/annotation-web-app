import { ADD_MEDIA_REQUEST, ADD_MEDIA_SUCCESS, ADD_MEDIA_FAIL } from 'constants/ActionTypes'

const initialState = {
  isAdding: false,
}

export default function media(state = initialState, action) {
  switch (action.type) {
    case ADD_MEDIA_REQUEST: {
      return {
        ...state,
        isAdding: true,
      }
    }

    case ADD_MEDIA_SUCCESS: {
      return {
        ...state,
        isAdding: false,
      }
    }

    case ADD_MEDIA_FAIL: {
      return {
        ...state,
        isAdding: false,
      }
    }

    default:
      return state
  }
}
