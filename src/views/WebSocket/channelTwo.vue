<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 11:15:36
 * @LastEditors: -_-
 * @Description: 测试websockt-频道1
-->

<template>
  <div class="Channel-container pd10">
    <commonTemplate title="Channel2" />
    <div class="Channel-container-content">
      频道2
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'Channel',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Channel'
    }
  },
  computed: {
  },
  created() {
    this.connectWebSocket()
  },
  watch: {},
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    connectWebSocket() {
      // console.log('http://localhost:3000')
      const wsuri = 'ws://127.0.0.1:3001'
      this.websock = new WebSocket(wsuri)
      this.websock.onmessage = this.websocketonmessage
      this.websock.onopen = this.websocketonopen
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      const actions = { 'c2': '12345' }
      this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() { // 连接建立失败重连
      console.log('errr>>>>>>>>>>')
      // this.initWebSocket()
    },
    websocketonmessage(e) { // 数据接收
      console.log('c2接收返回数据1>>>', e.data)
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) { // 关闭
      console.log('c2断开连接', e)
    }

  }
}
</script>
<style scoped lang="scss">
.Channel-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
  }
}
</style>
