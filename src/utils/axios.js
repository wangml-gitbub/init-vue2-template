import axios from 'axios'
import router from '@/router/index.js'
import { hasToken, getToken, setToken, setSessionToken } from '@/utils/auth.js'
// import { message } from 'ant-design-vue'
import { getTokenApi } from '@/api/auth'
import { whiteListApi } from '@/utils/constants'

let axiosInstance = axios.create({
  // baseURL: process.env.NODE_ENV === 'development' ? process.env.VUE_APP_BASE_URL : process.env.VUE_APP_REQUEST_URL,
  timeout: 60000,
  headers: { 'Content-Type': 'application/json;charset=utf-8' } // 默认 json 格式,如果是文件上传或者其他，可以修改 headers: { 'Content-Type': 'multipart/form-data' }
})

axiosInstance.interceptors.request.use(
  async (config) => {
    // 接口本身不需要 token 验证
    if (whiteListApi.includes(config.url)) {
      console.log(config, 1)
      return config
    }

    console.log(getToken(), !whiteListApi.includes(config.url))
    if (!whiteListApi.includes(config.url) && hasToken()) {
      config.headers.Authorization = 'Bearer ' + getToken()
      console.log(config, 2)
      return config
    }

    if (!whiteListApi.includes(config.url) && !hasToken()) {
      const data = await getTokenApi()
      setToken(data.idToken)
      setSessionToken(data.sessionToken)
      config.headers.Authorization = 'Bearer ' + data.idToken
      return config
    }
    return config
  },
  (error) => {
    console.error(error)
  }
)

axiosInstance.interceptors.response.use(
  (response) => {
    // if (response.data.code === 200) {
    //   return response.data
    // }
    return Promise.resolve(response.data)
  },
  (error) => {
    // ERR_NETWORK
    if (error.code === 'ERR_NETWORK') {
      console.log(error, '22')
      return Promise.reject(error)
    }

    if (error.code === 301) {
      // clearToken()
      // message.error('登录过期，请重新登录')

      router.push({
        path: '/login',
        query: {
          redirect: router.currentRoute.fullPath
        }
      })
    }
    return Promise.reject(error)
  }
)

export function request(options) {
  return new Promise((resolve, reject) => {
    axiosInstance({
      ...options
    })
      .then((response) => {
        resolve(response)
      })
      .catch((error) => {
        reject(error)
      })
  })
}
