import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { windowResize, setDomFontSizeByDevice } from './utils/common'
import './utils/ant-design.js'
import './styles/font.scss'

setDomFontSizeByDevice()
windowResize()
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')
