import Cookies from 'js-cookie' // npm install js-cookie 'js-cookie' --save

export function setToken(value, expires = 1000000000) {
  Cookies.set('accessToken', value, { expires })
}

export function getToken() {
  return Cookies.get('accessToken') || ''
}

export function removeToken() {
  Cookies.remove('accessToken')
}

export function hasToken() {
  if (!getToken()) return false

  return true
}

export function setSessionToken(value, expires = 1000000000) {
  Cookies.set('sessionToken', value, { expires })
}

export function getSessionToken() {
  return Cookies.get('sessionToken') || ''
}

export function removeSessionToken() {
  Cookies.remove('sessionToken')
}

export function hasSessionToken() {
  if (!getToken()) return false

  return true
}
