import findIndex from 'lodash/findIndex'
import clone from 'lodash/clone'

import {
  ADD_TAG_LIST_REQUEST,
  ADD_TAG_LIST_SUCCESS,
  ADD_TAG_LIST_FAIL,
  SET_TAG_VISIBILITY,
  UPDATE_LABEL_CONTENT,
} from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  id: '',
  name: '',
  type: '',
  tagList: [],
  labels: [],
  currentLabelIdx: 0,
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

    case SET_TAG_VISIBILITY: {
      const newTagList = clone(state.tagList)
      const tagIdx = findIndex(newTagList, { name: action.tagName })

      if (tagIdx >= 0) {
        newTagList[tagIdx].visible = action.visible
      }

      return {
        ...state,
        tagList: newTagList,
      }
    }

    case UPDATE_LABEL_CONTENT: {
      const newLabelList = clone(state.labelList)

      newLabelList[state.currentLabelIdx].content = action.content

      return {
        ...state,
        labelList: newLabelList,
      }
    }

    default:
      return state
  }
}
