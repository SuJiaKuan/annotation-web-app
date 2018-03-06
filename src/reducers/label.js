import { ADD_TAG_LIST_REQUEST, ADD_TAG_LIST_SUCCESS, ADD_TAG_LIST_FAIL } from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  id: '',
  name: '',
  type: '',
  tagList: [],
}

export default function label(state = initialState, action) {
  switch (action.type) {
    case ADD_TAG_LIST_REQUEST: {
      return {
        ...state,
        isFetch: true,
      }
    }

    case ADD_TAG_LIST_SUCCESS: {
      return {
        ...state,
        isFetch: false,
        tagList: action.tagList,
      }
    }

    case ADD_TAG_LIST_FAIL: {
      return {
        ...state,
        isFetch: false,
      }
    }

    default:
      return state
  }
}
