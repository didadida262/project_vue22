<template>
  <div class="Channel-container pd10">
    <span class="label">{{  this.info.title  }}</span>
    <div class="Channel-container-content">
      <div
       v-for="(item, index) in infoList"
       :key="index">
       <span>{{ item }}</span>
      </div>
    </div>
    <div class="Channel-container-operation">
      <el-input v-model="message"></el-input>
      <el-button @click="sendMessage">Send</el-button>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Channel',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      infoList: [],
      message: '默认内容'
    }
  },
  computed: {
  },
  watch: {},
  created() {
    this.connectWebSocket()
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    sendMessage() {
      this.websocketsend(this.message)
    },
    connectWebSocket() {
      // console.log('http://localhost:3000')
      const wsuri = 'ws://127.0.0.1:3001'
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      const actions = { client: this.info.title }
      this.$set(this.infoList, this.infoList.length, '我们的征途，是星辰大海...')
      this.websocketsend('我们的征途，是星辰大海...')
    },
    websocketonerror() { // 连接建立失败重连
      console.log('web---err')
    },
    websocketonmessage(e) { // 数据接收
      this.$set(this.infoList, this.infoList.length, e.data)
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(Data)
    },
    websocketclose(e) { // 关闭
      console.log('c1断开连接', e)
    }
  }
}
</script>
<style scoped lang="scss">
.Channel-container {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(118, 118, 122, 0.5);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  &-content {
    width: 100%;
    height: 70%;
  }
  &-operation {
    width: 100%;
    height: 25%;
  }
}
</style>
