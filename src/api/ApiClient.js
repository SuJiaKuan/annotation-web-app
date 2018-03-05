import axios from 'axios'

export default class ApiClient {
  constructor({ prefix } = {}) {
    this.prefix = prefix
  }

  get({ url, payload = {}, params = {} }) {
    return this.request({
      url,
      method: 'get',
      body: payload,
      params,
    })
  }

  post({ url, payload = {}, contentType = 'application/json' }) {
    return this.request({
      url,
      method: 'post',
      body: payload,
      contentType,
    })
  }

  put({ url, payload = {}, contentType = 'application/json' }) {
    return this.request({
      url,
      method: 'put',
      body: payload,
      contentType,
    })
  }

  patch({ url, payload = {}, contentType = 'application/json' }) {
    return this.request({
      url,
      method: 'put',
      body: payload,
      contentType,
    })
  }

  delete({ url }) {
    return this.request({
      url,
      method: 'delete',
    })
  }

  request({ url, method, body, params = {}, contentType = 'application/json' }) {
    if (this.authToken) {
      params.token = this.authToken
    }

    const config = {
      url,
      method,
      baseURL: this.prefix,
      params,
      headers: {},
      responseType: 'json',
    }

    if (contentType === 'application/json') {
      config.data = JSON.stringify(body)
      config.headers['Content-Type'] = contentType
    } else {
      config.data = body
    }

    return axios.request(config)
  }

  setAuthToken(authToken) {
    this.authToken = authToken
  }

  setXRealIP(XRealIP) {
    this.XRealIP = XRealIP
  }
}
