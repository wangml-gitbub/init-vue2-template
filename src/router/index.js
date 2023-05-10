import Vue from 'vue'
import VueRouter from 'vue-router'
// import { whiteList } from '@/utils/constants'
// import { hasToken } from '@/utils/auth'
import { isMobile, isVerticalOrientation, isMobileWeChat } from '@/utils/common'

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
  // if (!hasToken && !whiteList.includes(to.path)) {
  //   console.log('token 过期，请重新登录')
  //   next('/login')
  // }

  next()
})

export default router
