import clone from 'lodash/clone'
import findIndex from 'lodash/findIndex'
import map from 'lodash/map'

import {
  GET_PROJECT_REQUEST,
  GET_FRAME_NO_CONTENT,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  GET_FRAME_REQUEST,
  GET_FRAME_SUCCESS,
  GET_FRAME_FAIL,
  SAVE_FRAME_REQUEST,
  SAVE_FRAME_SUCCESS,
  SAVE_FRAME_FAIL,
  SET_LABEL_VISIBILITY,
  UPDATE_FRAME,
} from 'constants/ActionTypes'

const initialState = {
  isLoadingProject: false,
  isLoadingFrame: false,
  isSavingFrame: false,
  name: '',
  type: '',
  frame: {
    id: '',
    uri: '',
    labels: [],
  },
  hasNextFrame: true,
  labelList: [],
}

export default function label(state = initialState, action) {
  switch (action.type) {
    case GET_PROJECT_REQUEST: {
      return {
        ...state,
        isLoadingProject: true,
      }
    }

    case GET_PROJECT_SUCCESS: {
      const { name, labels, type } = action.projectView
      const labelList = map(labels, label => ({
        name: label,
        visible: true,
      }))

      return {
        ...state,
        isLoadingProject: false,
        name,
        type,
        labelList,
      }
    }

    case GET_PROJECT_FAIL: {
      return {
        ...state,
        isLoadingProject: false,
      }
    }

    case GET_FRAME_REQUEST: {
      return {
        ...state,
        isLoadingFrame: true,
        frame: initialState.frame,
      }
    }

    case GET_FRAME_NO_CONTENT: {
      return {
        ...state,
        isLoadingFrame: false,
        hasNextFrame: false,
      }
    }

    case GET_FRAME_SUCCESS: {
      const { _id, frameUri, labels } = action.frame

      return {
        ...state,
        isLoadingFrame: false,
        frame: {
          id: _id,
          uri: frameUri,
          labels,
        },
      }
    }

    case GET_FRAME_FAIL: {
      return {
        ...state,
        isLoadingFrame: false,
      }
    }

    case UPDATE_FRAME: {
      const frame = clone(state.frame)

      frame.labels = action.labels

      return {
        ...state,
        frame,
      }
    }

    case SAVE_FRAME_REQUEST: {
      return {
        ...state,
        isSavingFrame: true,
      }
    }

    case SAVE_FRAME_SUCCESS: {
      return {
        ...state,
        isSavingFrame: false,
      }
    }

    case SAVE_FRAME_FAIL: {
      return {
        ...state,
        isSavingFrame: false,
      }
    }

    case SET_LABEL_VISIBILITY: {
      const newLabelList = clone(state.labelList)
      const labelIdx = findIndex(newLabelList, { name: action.labelName })

      if (labelIdx >= 0) {
        newLabelList[labelIdx].visible = action.visible
      }

      return {
        ...state,
        labelList: newLabelList,
      }
    }

    default:
      return state
  }
}
