import map from 'lodash/map'

import {
  ADD_TAG_LIST_REQUEST,
  ADD_TAG_LIST_SUCCESS,
  // ADD_TAG_LIST_FAIL,
  SET_TAG_VISIBILITY,
  UPDATE_LABEL_CONTENT,
} from 'constants/ActionTypes'

export function addTagList(tagList) {
  return dispatch => {
    dispatch({
      type: ADD_TAG_LIST_REQUEST,
    })

    // TODO(Su JiaKuan): Integrate with API.
    dispatch({
      type: ADD_TAG_LIST_SUCCESS,
      tagList: map(tagList, tag => ({
        visible: true,
        name: tag,
      })),
    })
  }
}

export function setTagVisibility({ tagName, visible }) {
  return dispatch => {
    dispatch({
      type: SET_TAG_VISIBILITY,
      tagName,
      visible,
    })
  }
}

export function updateLabelContent({ content }) {
  return dispatch => {
    dispatch({
      type: UPDATE_LABEL_CONTENT,
      content,
    })
  }
}
