const crypto = require('crypto')

const apiVersion = process.env.VUE_APP_API_VERSION
const apiSecret = process.env.VUE_APP_API_SECRET
const apiKey = process.env.VUE_APP_API_KEY

export function apiUrl(path) {
  return apiVersion + path
}

export function getHeaders(url, data = null, verb = 'POST') {
  const expires = Math.round(new Date().getTime() / 1000) + 60

  let updateData = verb + url + expires

  if (data !== null) {
    data = JSON.stringify(data)

    updateData += data
  }


  const signature = crypto.createHmac('sha256', apiSecret)
    .update(updateData)
    .digest('hex')

  return {
    'api-expires': expires,
    'api-key': apiKey,
    'api-signature': signature
  }
}
