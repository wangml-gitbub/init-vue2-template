
// 免登录的白名单
export const whiteListPath = ['/login', '/registry', '/passwordQuestion', '/resetPassword']

// 免 token api
export const whiteListApi = [process.env.VUE_APP_AUTH_URL + '/v1/authentication/anonymous']




export const ERROR_CODE = {
  '0': 'The returned value could not be parsed, such as an error code was not included in the response',
  '10000': 'A client error that is returned when the user is not in the right state',
  '10001': 'A client error that is returned when trying to sign-in with the session token while there is no cached',
  '10002': 'The error returned when the parameter is missing or not in the right format',
  '10003': 'The error returned when a player tries to link a social account that is already linked with another player',
  '10004': 'The error returned when a player tries to link a social account but this player has already reached the limit of links for that account type',
  '10005': 'The error returned when a player tries to unlink a social account but no external id for that provider is found for the account',
  '10006': 'The error returned when a player tries to switch profile but the profile name is invalid',
  '10007': 'The error returned when a session token is invalid',
  '10008': 'The password is error',
  '10009': 'The username is existed',
}