import { request } from '@/utils/axios.js'

const authServiceUrl = process.env.NODE_ENV === 'production' ? process.env.VUE_APP_AUTH_URL : process.env.VUE_APP_AUTH_API

export const getTokenApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/authentication/anonymous',
    data: params
  })
}

export const getSessionTokenApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/authentication/session-token',
    data: params
  })
}

export const getUserApi = (params) => {
  return request({
    method: 'get',
    url: authServiceUrl + '/v1/users/' + params.id
  })
}

export const deleteUserApi = (params) => {
  return request({
    method: 'delete',
    url: authServiceUrl + '/v1/users/' + params.id
  })
}

export const updateUserApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/users/' + params.user_name + '/update',
    data: params
  })
}

export const signinApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/authentication/signin',
    data: params
  })
}

export const signUpApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/authentication/signup',
    data: params
  })
}

export const getQuestionsApi = (params) => {
  return request({
    method: 'get',
    url: authServiceUrl + '/v1/authentication/questions',
    params
  })
}

export const verifyQuestionaApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/users/' + params.user_name + '/verify-question',
    data: params
  })
}

export const resetPasswordApi = (params) => {
  return request({
    method: 'post',
    url: authServiceUrl + '/v1/users/' + params.user_name + '/reset-password',
    data: params
  })
}
