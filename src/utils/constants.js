import { authUrl } from '@/utils/config'

// 免登录的白名单
export const whiteListPath = ['/login', '/register']

// 免 token api
export const whiteListApi = [authUrl + '/v1/authentication/anonymous']
