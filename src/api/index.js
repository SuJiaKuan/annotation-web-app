import config from 'config/client-config'

import ApiClient from './ApiClient'
import MediaApi from './Media'
import ProjectsApi from './Projects'

function apiFactory({ apiPrefix } = { apiPrefix: config.apiRoot }) {
  if (!apiPrefix) {
    throw new Error('[apiPrefix] required')
  }

  const api = new ApiClient({ prefix: apiPrefix })

  return {
    apiClient: api,
    media: new MediaApi({ apiClient: api }),
    projects: new ProjectsApi({ apiClient: api }),
  }
}

export default apiFactory()
