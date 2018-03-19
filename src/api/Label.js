import Base from './Base'

export default class LabelAPI extends Base {
  getFrame(projectId) {
    return this.apiClient.get({
      url: `/projects/${projectId}/frame`,
    })
  }

  saveFrame(projectId, frameId, payload) {
    return this.apiClient.post({
      url: `/projects/${projectId}/frames/${frameId}/labels`,
      payload,
    })
  }

  getFrameList(projectId, payload) {
    return this.apiClient.post({
      url: `/projects/${projectId}/frames/query`,
      payload,
    })
  }
}
