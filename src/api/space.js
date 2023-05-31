import { request } from '@/utils/axios.js'

const spaceServiceUrl = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_SPACE_URL : process.env.VUE_APP_SPACE_API

export const getAllSpacesApi = (params) => {
  return request({
    method: 'get',
    url: spaceServiceUrl + '/v1/allspaces',
    params
  })
}

export const getUserSpaceApi = (params) => {
  return request({
    method: 'get',
    url: spaceServiceUrl + '/v1/spaces',
    params
  })
}

export const createSpaceApi = (params) => {
  return request({
    method: 'post',
    url: spaceServiceUrl + '/v1/spaces',
    data: params
  })
}

export const queryUserSpaceApi = (params) => {
  return request({
    method: 'get',
    url: spaceServiceUrl + '/v1/spaces/' + params.code
  })
}

export const deleteUserSpaceApi = (params) => {
  return request({
    method: 'delete',
    url: spaceServiceUrl + '/v1/spaces/' + params.code
  })
}

export const updateUserSpaceApi = (params) => {
  return request({
    method: 'put',
    url: spaceServiceUrl + '/v1/spaces/' + params.code,
    data: params
  })
}
