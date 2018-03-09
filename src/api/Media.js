import Base from './Base'

export default class MediaAPI extends Base {
  addMedia(payload) {
    return this.apiClient.post({
      url: '/media',
      payload,
      contentType: 'multipart/form-data',
    })
  }

  getMediaList() {
    return this.apiClient.post({
      url: '/media/query',
      payload: {},
    })
  }
}
