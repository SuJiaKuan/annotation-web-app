import concat from 'lodash/concat'

import { ADD_DATASET_REQUEST, ADD_DATASET_SUCCESS, ADD_DATASET_FAIL } from 'constants/ActionTypes'

const initialState = {
  isFetch: false,
  datasetList: [],
}

export default function data(state = initialState, action) {
  switch (action.type) {
    case ADD_DATASET_REQUEST: {
      return {
        ...state,
        isFetch: true,
      }
    }

    case ADD_DATASET_SUCCESS: {
      const newDatasetList = concat(state.datasetList, action.dataset)

      return {
        ...state,
        isFetch: false,
        datasetList: newDatasetList,
      }
    }

    case ADD_DATASET_FAIL: {
      return {
        ...state,
        isFetch: false,
      }
    }

    default:
      return state
  }
}
