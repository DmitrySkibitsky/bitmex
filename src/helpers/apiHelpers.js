const crypto = require('crypto')

const apiVersion = process.env.VUE_APP_API_VERSION
const apiSecret = process.env.VUE_APP_API_SECRET
const apiKey = process.env.VUE_APP_API_KEY

export function apiUrl(path) {
  return apiVersion + path
}

export function getHeaders(url, data) {
  const expires = Math.round(new Date().getTime() / 1000) + 60
  const postBody = JSON.stringify(data)

  const signature = crypto.createHmac('sha256', apiSecret)
    .update(url + expires + postBody)
    .digest('hex')

  return {
    'content-type' : 'application/json',
    'Accept': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature
  }
}
