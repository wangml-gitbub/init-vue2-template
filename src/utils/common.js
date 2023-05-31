import { escape } from 'core-js/fn/regexp'
import _ from 'lodash'

// 日期格式化
export function formateTime(time) {
  if (!time) return ''

  const year = new Date(time).getFullYear()
  const mouth = new Date(time).getMonth() + 1 >= 10 ? new Date(time).getMonth() + 1 : '0' + (new Date(time).getMonth() + 1)
  const date = new Date(time).getDate() >= 10 ? new Date(time).getDate() : '0' + new Date(time).getDate()
  const hours = new Date(time).getHours() >= 10 ? new Date(time).getHours() : '0' + new Date(time).getHours()
  const minutes = new Date(time).getMinutes() >= 10 ? new Date(time).getMinutes() : '0' + new Date(time).getMinutes()
  const seconds = new Date(time).getSeconds() >= 10 ? new Date(time).getSeconds() : '0' + new Date(time).getSeconds()

  return year + '-' + mouth + '-' + date + ' ' + hours + ':' + minutes + ':' + seconds
}

// 等列宽 waterfall
export class Waterfall {
  constructor(options) {
    this.$el = null // 父容器
    this.count = 4 // 列数
    this.gap = 10 // 间距
    Object.assign(this, options)
    this.width = 0 // 列的宽度
    this.items = [] // 子元素集合
    this.H = [] // 存储每列的高度方便计算
    this.flag = null // 虚拟节点集合
    this.init()
  }
  init() {
    this.items = Array.from(this.$el.children)
    this.reset()
    this.render()
  }
  reset() {
    this.flag = document.createDocumentFragment()
    this.width = this.$el.clientWidth / this.count
    this.H = new Array(this.count).fill(0)
    this.$el.innerHTML = ''
  }

  render() {
    const { width, items, flag, H, gap } = this
    items.forEach((item) => {
      item.style.width = width + 'px'
      item.style.position = 'absolute'
      let img = item.querySelector('img')
      if (img.complete) {
        let tag = H.indexOf(Math.min(...H))
        item.style.left = tag * (width + gap) + 'px'
        item.style.top = H[tag] + 'px'
        H[tag] += (img.height * width) / img.width + gap
        flag.appendChild(item)
      } else {
        img.addEventListener('load', () => {
          let tag = H.indexOf(Math.min(...H))
          item.style.left = tag * (width + gap) + 'px'
          item.style.top = H[tag] + 'px'
          H[tag] += (img.height * width) / img.width + gap
          flag.appendChild(item)
          this.$el.append(flag)
        })
      }
    })
    this.$el.append(flag)
  }
}

// 根据不同设备（PC or 手机）来设置根节点 fontsize
export function setDomFontSizeByDevice() {
  const isMobileDev = isMobile()
  let fontsize = ''
  let width = document.documentElement.clientWidth || document.body.clientWidth
  if (isMobileDev) {
    fontsize = width / 375 + 'px'
  } else {
    fontsize = width / width + 'px'
  }
  document.getElementsByTagName('html')[0].style['font-size'] = fontsize
}

export function windowResize() {
  let setDomFontSizeDebounce = _.debounce(setDomFontSizeByDevice, 400)
  window.addEventListener('resize', setDomFontSizeDebounce)
}

// 是否手机打开
export function isMobile() {
  let flag = navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i) // 判断是电脑打开还是手机打开的
  return flag
}

// 是否微信打开
export function isMobileWeChat() {
  let ua = navigator.userAgent.toLowerCase()
  return ua.match(/MicroMessenger/i) == 'micromessenger' // 判断是微信打开还是浏览器打开
}

// 是否竖屏
export function isVerticalOrientation() {
  if (window.orientation === 180 || window.orientation === 0) {
    return true
  }

  if (window.orientation === 90 || window.orientation === -90) {
    return false
  }
}

// url querystring 参数获取
export function getUrlQueryString(url){
  if(!url) return {}

  let queryString = url.slice(url.indexOf('?'))

  let qsObject = {}
  queryString.split('&').forEach(item => {
    let valueKey = item.split('=')
    qsObject[valueKey[0]] = valueKey[1]
  })

  return qsObject
}

// 防抖
export function debounce(func, delay) {

  // let timer
  // return function () {
  //   if(timer) {
  //     clearTimeout(timer)
  //   }
  //   timer =  setTimeout(() => {
  //     func()
  //   }, delay)
  // }



  let timer = null
  return function() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null
    }, delay)
  }


}

// 节流
export function throttle(func, delay){

  // let timer
  // return function() {
  //   if(timer) return
  //   timer = setTimeout(() => {
  //     func()
  //     timer = null
  //   }, delay)
  // }


  let timer = null
  return function() {
    if(timer) return
    timer = setTimeout(() => {
      func.apply(this, arguments)
      timer = null
    }, delay)
  }


}

// 获取字符长度
export function getBt(str){
  let char = str.replace(/[^\x00-\xff]/g, '***');
  return char.length;
}

// utf8 转 base64
export function utf8ToBase64(str) {
  return window.btoa(unescape(encodeURIComponent(str)))
  // return btoa(encodeURIComponent(str))
}

// base64 转 utf8
export function base64ToUtf8(str) {
  return decodeURIComponent(escape(window.atob(str)))
  // return decodeURIComponent(escape(str))
}
