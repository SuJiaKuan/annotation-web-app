import Base from './Base'

export default class MediaAPI extends Base {
  addProject(payload) {
    return this.apiClient.post({
      url: '/projects',
      payload,
    })
  }
}
