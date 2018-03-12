import Base from './Base'

export default class ProjectAPI extends Base {
  addProject(payload) {
    return this.apiClient.post({
      url: '/projects',
      payload,
    })
  }

  attachMediaList(id, payload) {
    return this.apiClient.patch({
      url: `/projects/${id}/media`,
      payload,
    })
  }
}
