import api from 'api'
import history from 'routes/history'

import { ADD_PROJECT_REQUEST, ADD_PROJECT_SUCCESS, ADD_PROJECT_FAIL } from 'constants/ActionTypes'

export function addProject({ name, description, mediaIds, type, labels, redirect }) {
  return dispatch => {
    dispatch({
      type: ADD_PROJECT_REQUEST,
    })

    api.projects
      .addProject({
        name,
        description,
        type,
        labels,
      })
      .then(() => {
        // TODO(Su JiaKuan): Also add media IDs.
        dispatch({
          type: ADD_PROJECT_SUCCESS,
        })

        if (redirect) {
          history.push(redirect)
        }
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: ADD_PROJECT_FAIL,
        })
      })
  }
}
