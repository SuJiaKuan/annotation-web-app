import api from 'api'
import history from 'routes/history'

import {
  ADD_PROJECT_REQUEST,
  ADD_PROJECT_SUCCESS,
  ADD_PROJECT_FAIL,
  GET_PROJECT_REQUEST,
  GET_PROJECT_SUCCESS,
  GET_PROJECT_FAIL,
  GET_PROJECT_LIST_REQUEST,
  GET_PROJECT_LIST_SUCCESS,
  GET_PROJECT_LIST_FAIL,
} from 'constants/ActionTypes'

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
      .then(({ data: { projectId } }) => {
        return api.projects.attachMediaList(projectId, {
          mediaIds,
        })
      })
      .then(({ data }) => {
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

export function getProject({ match: { params: { id } } }) {
  return dispatch => {
    dispatch({
      type: GET_PROJECT_REQUEST,
    })

    let projectView

    api.projects
      .getProject(id)
      .then(({ data }) => {
        projectView = data

        return api.media.getMediaList({
          mediaIds: data.mediaIds,
        })
      })
      .then(({ data }) => {
        projectView.mediaList = data

        dispatch({
          type: GET_PROJECT_SUCCESS,
          projectView,
        })
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: GET_PROJECT_FAIL,
        })
      })
  }
}

export function getProjectList() {
  return dispatch => {
    dispatch({
      type: GET_PROJECT_LIST_REQUEST,
    })

    api.projects
      .getProjectList()
      .then(({ data }) => {
        dispatch({
          type: GET_PROJECT_LIST_SUCCESS,
          projectList: data,
        })
      })
      .catch(() => {
        // TODO(Su JiaKuan): More elegant error handling.
        dispatch({
          type: GET_PROJECT_LIST_FAIL,
        })
      })
  }
}
