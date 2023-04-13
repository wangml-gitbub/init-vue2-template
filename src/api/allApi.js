import { request } from '../utils/axios.js'

export const getList = (url, params) => {
  return request({
    method: 'get',
    url,
    params,
  })
}

export const saveJson = (url, data) => {
  return request({
    method: 'post',
    url,
    data,
  })
}

export const saveFormData = (url, formData) => {
  return request({
    method: 'post',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const importFile = (url, formData) => {
  return request({
    method: 'post',
    url,
    data: formData,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export const downloadFile = (url, params) => {
  return request({
    method: 'get',
    url,
    params,
    headers: {
      'Content-Type': 'multipart/form-data',
      Accept: 'application/octet-stream',
    },
    responseType: 'arraybuffer',
  })
}

//  拉取操作 - 用于测试使用，待删除
export const pullData = (url, params) => {
  return request({
    method: 'get',
    url: url,
    params,
  })
}
