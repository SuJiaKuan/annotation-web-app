import uuid from 'uuid/v4'

import api from 'api'

import { ADD_DATASET_REQUEST, ADD_DATASET_SUCCESS, ADD_DATASET_FAIL } from 'constants/ActionTypes'

export function addDataset({ name, description, media }) {
  return dispatch => {
    const id = uuid()
    const dataset = {
      id,
      name,
      description,
      images: [],
    }
    const formData = new FormData()

    formData.append('name', name)
    formData.append('description', description)
    formData.append('media', media)

    dispatch({
      type: ADD_DATASET_REQUEST,
    })

    api.data
      .addDataset(formData)
      .then(res => {
        dispatch({
          type: ADD_DATASET_SUCCESS,
          dataset,
        })
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: ADD_DATASET_FAIL,
        })
      })
  }
}
