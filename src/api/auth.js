import { request } from '@/utils/axios.js'
import { authUrl } from '@/utils/config'

export const getTokenApi = (params) => {
  return request({
    method: 'post',
    url: authUrl + '/v1/authentication/anonymous',
    data: params
  })
}

export const getSessionTokenApi = (params) => {
  return request({
    method: 'post',
    url: authUrl + '/v1/authentication/session-token',
    data: params
  })
}

export const getUserApi = (params) => {
  return request({
    method: 'get',
    url: authUrl + '/v1/users/' + params.id
  })
}

export const deleteUserApi = (params) => {
  return request({
    method: 'delete',
    url: authUrl + '/v1/users/' + params.id
  })
}
