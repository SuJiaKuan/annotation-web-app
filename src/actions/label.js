import {
  ADD_TAG_LIST_REQUEST,
  ADD_TAG_LIST_SUCCESS,
  // ADD_TAG_LIST_FAIL,
} from 'constants/ActionTypes'

export function addTagList(tagList) {
  return dispatch => {
    dispatch({
      type: ADD_TAG_LIST_REQUEST,
    })

    // TODO(Su JiaKuan): Integrate with API.
    dispatch({
      type: ADD_TAG_LIST_SUCCESS,
      tagList,
    })
  }
}
