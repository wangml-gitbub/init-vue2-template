import { request } from '@/utils/axios.js'
import { lobbyUrl } from '@/utils/config'

export const createLobbyApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/create',
    data: params
  })
}
export const queryPublicLobbiesApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/query',
    data: params
  })
}

export const joinByCodeApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/joinbycode',
    data: params
  })
}

export const joinByIdApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/join',
    data: params
  })
}

export const createOrJoinByIdApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/createorjoin',
    data: params
  })
}

export const reconnectApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/reconnect'
  })
}

export const quickJoinApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/quickjoin',
    data: params
  })
}

export const getLobbyDetailApi = (params) => {
  return request({
    method: 'get',
    url: lobbyUrl + '/v1/' + params.lobbyId
  })
}

export const deleteLobbyApi = (params) => {
  return request({
    method: 'delete',
    url: lobbyUrl + '/v1/' + params.lobbyId
  })
}

export const updateLobbyDataApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId,
    data: params
  })
}

export const deleteLobbyPlayerApi = (params) => {
  return request({
    method: 'delete',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/players/' + params.playerId
  })
}

export const updateLobbyPlayerDataApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/players/' + params.playerId,
    data: params
  })
}

export const bulkUpdateApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/bulkupdate',
    data: params
  })
}

export const heartbeatLobbyApi = (params) => {
  return request({
    method: 'post',
    url: lobbyUrl + '/v1/' + params.lobbyId + '/heartbeat'
  })
}

export const getPlayerJoinedLobbiesApi = (params) => {
  return request({
    method: 'get',
    url: lobbyUrl + '/v1/joined',
    params
  })
}

export const getPlayerHostedLobbiesApi = (params) => {
  return request({
    method: 'get',
    url: lobbyUrl + '/v1/hosted',
    params
  })
}
