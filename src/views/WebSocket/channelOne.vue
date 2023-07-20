<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 11:15:36
 * @LastEditors: Hhvcg
 * @Description: 测试websockt-频道1
-->

<template>
  <div class="Channel-container pd10">
    <commonTemplate title="Channel1" />
    <div class="Channel-container-content flex-cb">
      <div
        class="Channel-container-content-item"
        v-for="(channel, index) in channels"
        :key="index"
      >
        <ChatChannel
          :info="channel"
        />
      </div>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import ChatChannel from './components/ChatChannel.vue'

export default {
  name: 'Channel',
  components: {
    commonTemplate,
    ChatChannel
  },
  data() {
    return {
      title: 'WebSocket',
      channels: [
        {
          title: 'HHvcg'
        },
        {
          title: '旅途图'
        }
      ]
    }
  },
  computed: {
  },
  watch: {},
  created() {
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
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
    &-item {
      width: 49%;
      height: 100%;
    }
  }
}
</style>
