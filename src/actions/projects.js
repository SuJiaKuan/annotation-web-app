import uuid from 'uuid/v4'

import {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  // ADD_PROJECT_FAIL,
} from 'constants/ActionTypes'

export function addProject({ name, description, datasets, type }) {
  return dispatch => {
    const id = uuid()
    const project = {
      id,
      name,
      description,
      datasets,
      type,
    }

    dispatch({
      type: ADD_PROJECT_REQUEST,
    })
    // TODO(Su JiaKuan): Integrate with API.
    dispatch({
      type: ADD_PROJECT_SUCCESS,
      project,
    })
  }
}
