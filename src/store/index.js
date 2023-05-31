import Vue from 'vue'
import Vuex from 'vuex'

import * as types from './mutation-types'
import { getSessionToken, getToken, setToken, setSessionToken } from '@/utils/auth'
import { getSessionTokenApi } from '@/api/auth'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userName: '',
    nickName: ''
  },
  getters: {},
  mutations: {
    [types.SET_USER_NAME](state, userName) {
      Object.assign(state, {
        userName
      })
    },
    [types.SET_NICK_NAME](state, nickName) {
      Object.assign(state, {
        nickName
      })
    }
  },
  actions: {
    setUserName({ commit }, userName) {
      commit(types.SET_USER_NAME, userName || localStorage.getItem('userName'))
    },
    setNickName({ commit }, nickName) {
      commit(types.SET_NICK_NAME, nickName || localStorage.getItem('nickName'))
    },
    async refreshToken() {
      let data = await getSessionTokenApi({
        nonce: getToken(),
        sessionToken: getSessionToken()
      })
      setToken(data.idToken)
      setSessionToken(data.sessionToken)
    }
  },
  modules: {}
})
