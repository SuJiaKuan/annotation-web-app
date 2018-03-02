import uuid from 'uuid/v4'

import {
  ADD_DATASET_REQUEST,
  ADD_DATASET_SUCCESS,
  // ADD_DATASET_FAIL,
} from 'constants/ActionTypes'

export function addDataset({ name, description }) {
  return dispatch => {
    const id = uuid()
    const dataset = {
      id,
      name,
      description,
      images: [],
    }

    dispatch({
      type: ADD_DATASET_REQUEST,
    })
    // TODO(Su JiaKuan): Integrate with API.
    dispatch({
      type: ADD_DATASET_SUCCESS,
      dataset,
    })
  }
}
