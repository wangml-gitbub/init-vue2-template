import { request } from '@/utils/axios.js'
import { spaceUrl } from '@/utils/config'

export const getSpacesApi = (params) => {
  return request({
    method: 'get',
    url: spaceUrl + '/v1/spaces',
    params
  })
}

export const createSpaceApi = (params) => {
  return request({
    method: 'post',
    url: spaceUrl + '/v1/spaces',
    data: params
  })
}

export const queryUserSpaceApi = (params) => {
  return request({
    method: 'get',
    url: spaceUrl + '/v1/spaces/' + params.code
  })
}

export const deleteUserSpaceApi = (params) => {
  return request({
    method: 'delete',
    url: spaceUrl + '/v1/spaces/' + params.code
  })
}

export const updateUserSpaceApi = (params) => {
  return request({
    method: 'put',
    url: spaceUrl + '/v1/spaces/' + params.code,
    data: params
  })
}
