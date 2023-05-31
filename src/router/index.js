import Vue from 'vue'
import VueRouter from 'vue-router'
import { whiteListPath } from '@/utils/constants'
import { hasToken } from '@/utils/auth'
import { isMobile, isVerticalOrientation, isMobileWeChat } from '@/utils/common'
import store from '@/store'
import { message } from 'ant-design-vue'
// import { getUserApi } from '@/api/auth'

console.log(isMobile(), isVerticalOrientation(), isMobileWeChat())
Vue.use(VueRouter)

let routes
if (isMobile()) {
  routes = [
    {
      path: '/',
      name: 'm1',
      component: () => import(/* webpackChunkName: 'm1' */ '../views/mobile/m1.vue')
    },
    {
      path: '/page2',
      name: 'm2',
      component: () => import(/* webpackChunkName: 'm2' */ '../views/mobile/m2.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
} else {
  routes = [
    {
      path: '/',
      name: 'pc1',
      component: () => import(/* webpackChunkName: 'pc1' */ '../views/pc/pc1.vue')
    },
    {
      path: '/page2',
      name: 'pc2',
      component: () => import(/* webpackChunkName: 'pc2' */ '../views/pc/pc2.vue')
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
}

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  if (!hasToken() && !whiteListPath.includes(to.path)) {
    message.error('token 过期，请重新登录')
    next('/login')
  } else {
    if (!store.state.userName) {
      // 获取用户信息
      // let data = await getUserApi()
      // this.$store.dispatch('setUserName', data.id)
      // this.$store.dispatch('setNickName', data.nick_name)
      // localStorage.setItem('userName', data.id)
      // localStorage.setItem('nickName', data.nick_name)

      store.dispatch('setUserName', localStorage.getItem('userName'))
      store.dispatch('setNickName', localStorage.getItem('nickName'))
      console.log(323)
    }
  }

  next()
})

export default router
