<template>
  <div class="Channel-container pd10">
    <commonTemplate :title="info.title" />
    <!-- <span class="label">{{ 'Channel：' + this.info.title  }}</span> -->
    <div
     class="Channel-container-content pd10">
      <el-card
        v-for="(item, index) in infoList"
        :key="index"
        class="mgb10">
        <div
          class="Channel-container-content-item"
        >
          <span style="font-weight: bold;font-size: 20px;">{{ item.user + ':' }}</span>
          <span style="font-size: 16px;">{{ item.content }}</span>
        </div>
      </el-card>
    </div>
    <div class="Channel-container-operation flex-col">
      <el-input v-model="message"></el-input>
      <el-button
        type="primary"
       @click="sendMessage"
       style="width: 100%">Send</el-button>
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
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      infoList: [
        // {
        //   user: this.info.title,
        //   content: '我们的征途，是星辰大海...'
        // }
      ],
      message: ''
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
      this.websocketsend({
        user: this.info.title,
        content: this.message
      })
    },
    connectWebSocket() {
      const wsuri = 'ws://127.0.0.1:3002'
      this.websock = new WebSocket(wsuri)
      this.websock.onopen = this.websocketonopen
      this.websock.onmessage = this.websocketonmessage
      this.websock.onerror = this.websocketonerror
      this.websock.onclose = this.websocketclose
    },
    websocketonopen() { // 连接建立之后执行send方法发送数据
      // const actions = { user: this.info.title, content: '我们的征途，是星辰大海...' }
      // this.websocketsend(JSON.stringify(actions))
    },
    websocketonerror() { // 连接建立失败重连
      console.log('web---err')
    },
    websocketonmessage(e) { // 数据接收
      const data = JSON.parse(e.data)
      if (data.user !== this.info.title) {
        console.log('data>>>', data)
        this.$set(this.infoList, this.infoList.length, data)
      }
    },
    websocketsend(Data) { // 数据发送
      this.websock.send(JSON.stringify(Data))
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
  border: 1px solid rgba(118, 118, 122, 0.2);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  &-content {
    width: 100%;
    height: 70%;
    border: 1px solid ghostwhite;
    overflow: scroll;
    &-item {
      display: flex;
      justify-content: space-between;
      align-items: start;
      flex-direction: column;
    }

  }
  &-operation {
    width: 100%;
    height: 25%;
  }
}
</style>
