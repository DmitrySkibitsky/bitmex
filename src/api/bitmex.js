import axios from 'axios'
import { apiUrl, getHeaders } from '@/helpers/apiHelpers'

export default {
  instrument() {
    return axios.get(apiUrl('/instrument/active'))
  },
  tradeBucketed(symbol) {
    return axios.get(apiUrl('/trade/bucketed'), {
      params: {
        binSize: '1m',
        partial: false,
        count: 100,
        reverse: true,
        symbol
      }
    })
  },
  getOrders() {
    const url = apiUrl('/order?open=true')

    return axios.get(url, {
      headers: getHeaders(url, null, 'GET')
    })
  },
  createOrder(symbol, orderQty = 1, side = 'Buy') {
    const url = apiUrl('/order')

    const data = {
      ordType: 'Market',
      symbol: symbol,
      orderQty: orderQty,
      side: side,
    }

    return axios.post(url, data, {
      headers: getHeaders(url, data)
    })
  }
}
