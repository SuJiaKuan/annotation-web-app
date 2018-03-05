import config from 'config/client-config'

import ApiClient from './ApiClient'
import DataApi from './Data'

function apiFactory({ apiPrefix } = { apiPrefix: config.apiRoot }) {
  if (!apiPrefix) {
    throw new Error('[apiPrefix] required')
  }

  const api = new ApiClient({ prefix: apiPrefix })

  return {
    apiClient: api,
    data: new DataApi({ apiClient: api }),
  }
}

export default apiFactory()
