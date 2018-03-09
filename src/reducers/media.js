import concat from 'lodash/concat'

import { ADD_MEDIA_REQUEST, ADD_MEDIA_SUCCESS, ADD_MEDIA_FAIL } from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  mediaList: [],
}

export default function media(state = initialState, action) {
  switch (action.type) {
    case ADD_MEDIA_REQUEST: {
      return {
        ...state,
        isFetch: true,
      }
    }

    case ADD_MEDIA_SUCCESS: {
      const newMediaList = concat(state.mediaList, action.media)

      return {
        ...state,
        isFetch: false,
        mediaList: newMediaList,
      }
    }

    case ADD_MEDIA_FAIL: {
      return {
        ...state,
        isFetch: false,
      }
    }

    default:
      return state
  }
}
