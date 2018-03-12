import uuid from 'uuid/v4'

import api from 'api'
import history from 'routes/history'

import {
  ADD_MEDIA_REQUEST,
  ADD_MEDIA_SUCCESS,
  ADD_MEDIA_FAIL,
  GET_MEDIA_LIST_REQUEST,
  GET_MEDIA_LIST_SUCCESS,
  GET_MEDIA_LIST_FAIL,
  GET_MEDIA_REQUEST,
  GET_MEDIA_SUCCESS,
  // GET_MEDIA_FAIL,
} from 'constants/ActionTypes'

export function addMedia({ name, description, media, redirect }) {
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

        if (redirect) {
          history.push(redirect)
        }
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: ADD_MEDIA_FAIL,
        })
      })
  }
}

export function getMedia({ match }) {
  return dispatch => {
    const { id } = match.params

    dispatch({
      type: GET_MEDIA_REQUEST,
    })

    // TODO(Su JiaKuan): Use id to query API.

    dispatch({
      type: GET_MEDIA_SUCCESS,
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
