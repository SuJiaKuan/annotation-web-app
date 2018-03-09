import uuid from 'uuid/v4'

import api from 'api'

import {
  ADD_MEDIA_REQUEST,
  ADD_MEDIA_SUCCESS,
  ADD_MEDIA_FAIL,
  GET_MEDIA_LIST_REQUEST,
  GET_MEDIA_LIST_SUCCESS,
  GET_MEDIA_LIST_FAIL,
} from 'constants/ActionTypes'

export function addMedia({ name, description, media }) {
  return dispatch => {
    const id = uuid()
    const media = {
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
      type: ADD_MEDIA_REQUEST,
    })

    api.media
      .addMedia(formData)
      .then(res => {
        dispatch({
          type: ADD_MEDIA_SUCCESS,
          media,
        })
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: ADD_MEDIA_FAIL,
        })
      })
  }
}

export function getMediaList() {
  return dispatch => {
    dispatch({
      type: GET_MEDIA_LIST_REQUEST,
    })

    api.media
      .getMediaList()
      .then(({ data }) => {
        dispatch({
          type: GET_MEDIA_LIST_SUCCESS,
          mediaList: data,
        })
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: GET_MEDIA_LIST_FAIL,
        })
      })
  }
}
