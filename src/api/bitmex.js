import axios from 'axios'
import { apiUrl, getHeaders } from '@/helpers/apiHelpers'

export default {
  instrument() {
    return axios.get(apiUrl('/instrument/active'))
  },
  tradeBucketed(symbol) {
    const path = `?binSize=1m&partial=false&count=100&reverse=true&symbol=${symbol}`

    return axios.get(apiUrl(`/trade/bucketed${path}`))
  },
  order(symbol, orderQty = 1, side = 'Buy') {
    const url = apiUrl('/order')

    const data = {
      ordType: 'Market',
      side,
      orderQty,
      symbol
    }

    return axios.post(url, data, {
      headers: getHeaders(url, data)
    })
  }
}
