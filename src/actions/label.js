import api from 'api'

import {
  GET_FRAME_REQUEST,
  GET_FRAME_NO_CONTENT,
  GET_FRAME_SUCCESS,
  GET_FRAME_FAIL,
  SAVE_FRAME_REQUEST,
  SAVE_FRAME_SUCCESS,
  SAVE_FRAME_FAIL,
  SET_LABEL_VISIBILITY,
  UPDATE_FRAME,
} from 'constants/ActionTypes'

function getFrameInner(dispatch, id) {
  dispatch({
    type: GET_FRAME_REQUEST,
  })

  api.label
    .getFrame(id)
    .then(({ status, data }) => {
      if (status === 204) {
        // Handle the case for "No Content"
        dispatch({
          type: GET_FRAME_NO_CONTENT,
        })
      } else {
        dispatch({
          type: GET_FRAME_SUCCESS,
          frame: data,
        })
      }
    })
    .catch(() => {
      dispatch({
        type: GET_FRAME_FAIL,
      })
    })
}

export function getFrame({ match: { params: { id } } }) {
  return dispatch => {
    getFrameInner(dispatch, id)
  }
}

export function saveFrame({ projectId, frameId, labels, getNext = true }) {
  return dispatch => {
    dispatch({
      type: SAVE_FRAME_REQUEST,
    })

    api.label
      .saveFrame(projectId, frameId, {
        labels,
      })
      .then(() => {
        dispatch({
          type: SAVE_FRAME_SUCCESS,
        })

        if (getNext) {
          getFrameInner(dispatch, projectId)
        }
      })
      .catch(() => {
        dispatch({
          type: SAVE_FRAME_FAIL,
        })
      })
  }
}

export function updateFrame({ labels }) {
  return dispatch => {
    dispatch({
      type: UPDATE_FRAME,
      labels,
    })
  }
}

export function setLabelVisibility({ labelName, visible }) {
  return dispatch => {
    dispatch({
      type: SET_LABEL_VISIBILITY,
      labelName,
      visible,
    })
  }
}
