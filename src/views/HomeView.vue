<template>
  <div>
    <!-- <img alt="Vue logo" src="../assets/logo.png" /> -->
    <HelloWorld msg="Welcome to Your Vue.js App" />
    home
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { pullData } from '@/api/allApi'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  },
  mounted() {
    this.pullData() // 测试使用，待删除
  },
  methods: {
    // 测试使用，待删除
    async pullData() {
      const { data } = await pullData('/table/check_ahead_behind', {
        project: '550',
        ref: 'batch-resolve-conflict-11-2',
        access_token:
          'd449e2a23fa00a0c2dc0538631df44579348aa179ca0ea7f1c423c8a17538f59'
      })
      console.log(data)
    }
  }
}
</script>
