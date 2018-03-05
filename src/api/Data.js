import Base from './Base'

export default class DataAPI extends Base {
  addDataset(payload) {
    return this.apiClient.post({
      url: '/media',
      payload,
      contentType: 'multipart/form-data',
    })
  }
}
