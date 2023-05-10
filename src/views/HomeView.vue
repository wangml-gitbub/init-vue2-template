<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    home

    <div class="img-boxs">
      <img src="item.src" v-for="item in imgList" :key="item.id" />
    </div>

    <div class="flex-waterfall">
      <div
        v-for="n in 100"
        :key="n"
        :style="{
          width: Math.random() * 10 + 15 + 'px',
          height: Math.random() * 10 + 20 + 'px',
          textAlign: 'left',
          border: '1px solid #000'
        }"
      >
        {{ n }}
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { pullData } from '@/api/allApi'
import { Waterfall } from '@/utils/common'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  data() {
    return {
      imgList: [],
      Math,
      ws: null
    }
  },
  mounted() {
    // this.pullData() // 测试使用，待删除
    // this.waterfallInit() // 测试使用，待删除
    // this.initWebSocket() // 测试使用，待删除
  },
  destroyed() {
    this.ws.onclose() // 测试使用，待删除
  },
  methods: {
    // 测试使用，待删除
    async pullData() {
      const { data } = await pullData('/table/check_ahead_behind', {
        project: '550',
        ref: 'batch-resolve-conflict-11-2',
        access_token: 'd449e2a23fa00a0c2dc0538631df44579348aa179ca0ea7f1c423c8a17538f59'
      })
      console.log(data)
    },

    // waterfall
    waterfallInit() {
      window.onload = new Waterfall({
        $el: document.querySelector('.img-boxs'),
        count: 4,
        gap: 10
      })
    },

    // 调用 WebSocket send()发送信息的方法
    sendText() {
      let _this = this
      _this.ws.send(JSON.stringify(1111))
    },

    // 进入页面创建 websocket 连接
    initWebSocket() {
      let _this = this
      let url = `ws://localhost:8081/chat/${_this.userId}`
      let ws = new WebSocket(url)
      _this.ws = ws
      ws.onopen = function (e) {
        console.log('服务器连接成功: ' + url, e)
      }
      ws.onclose = function (e) {
        console.log('服务器连接关闭: ' + url, e)
      }
      ws.onerror = function () {
        console.log('服务器连接出错: ' + url)
      }
      ws.onmessage = function (e) {
        let resData = JSON.parse(e.data) //接收服务器返回的数据
        console.log(resData)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.flex-waterfall {
  display: flex;
  flex-wrap: wrap;
  width: 200px;
  margin: 0 auto;
  gap: 5px;
}
</style>
