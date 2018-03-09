import config from 'config/client-config'

import ApiClient from './ApiClient'
import MediaApi from './Media'

function apiFactory({ apiPrefix } = { apiPrefix: config.apiRoot }) {
  if (!apiPrefix) {
    throw new Error('[apiPrefix] required')
  }

  const api = new ApiClient({ prefix: apiPrefix })

  return {
    apiClient: api,
    media: new MediaApi({ apiClient: api }),
  }
}

export default apiFactory()
