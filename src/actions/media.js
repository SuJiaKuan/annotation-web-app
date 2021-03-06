import api from 'api'
import history from 'routes/history'

import orderBy from 'lodash/orderBy'

import {
  ADD_MEDIA_REQUEST,
  ADD_MEDIA_SUCCESS,
  ADD_MEDIA_FAIL,
  GET_MEDIA_LIST_REQUEST,
  GET_MEDIA_LIST_SUCCESS,
  GET_MEDIA_LIST_FAIL,
  REFRESH_MEDIA_LIST_REQUEST,
  REFRESH_MEDIA_LIST_SUCCESS,
  REFRESH_MEDIA_LIST_FAIL,
  GET_MEDIA_REQUEST,
  GET_MEDIA_SUCCESS,
  GET_MEDIA_FAIL,
} from 'constants/ActionTypes'

export function addMedia({ name, description, media, redirect }) {
  return dispatch => {
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

    let mediaView

    api.media
      .getMediaList({
        mediaIds: [id],
      })
      .then(({ data }) => {
        mediaView = {
          name: data[0].name,
          description: data[0].description,
        }

        return api.media.getMediaFrames(id)
      })
      .then(({ data }) => {
        mediaView.frames = data //map(data, ({ frameUri }) => frameUri)

        dispatch({
          type: GET_MEDIA_SUCCESS,
          mediaView,
        })
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: GET_MEDIA_FAIL,
        })
      })
  }
}

function getMediaListInner(dispatch, requestAction, successAction, failAction) {
  dispatch({
    type: requestAction,
  })

  api.media
    .getMediaList()
    .then(({ data }) => {
      dispatch({
        type: successAction,
        mediaList: orderBy(data, 'createdTime', 'desc'),
      })
    })
    .catch(() => {
      // TODO(Su JiaKuan): More elegant error handling.
      dispatch({
        type: failAction,
      })
    })
}

export function getMediaList() {
  return dispatch => {
    getMediaListInner(dispatch, GET_MEDIA_LIST_REQUEST, GET_MEDIA_LIST_SUCCESS, GET_MEDIA_LIST_FAIL)
  }
}

export function refreshMediaList() {
  return dispatch => {
    getMediaListInner(dispatch, REFRESH_MEDIA_LIST_REQUEST, REFRESH_MEDIA_LIST_SUCCESS, REFRESH_MEDIA_LIST_FAIL)
  }
}
