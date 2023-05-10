import { request } from '@/utils/axios.js'
import { serviceUrl } from '@/utils/config'

export const pullDataApi = (params) => {
  return request({
    method: 'get',
    url: serviceUrl + '/table/check_ahead_behind',
    params
  })
}
