<!--
 * @Author: Hhvcg
 * @Date: 2022-06-02 10:49:57
 * @LastEditors: -_-
 * @Description: 前端音视频资源传输研究
-->

<template>
  <div class="VideoPractice">
    <span>
      VideoPractice
    </span>
    <div class="video-container">
      <video ref="videoContainer"></video>
    </div>
    <!-- <el-alert :closable="false" title="menu 2" /> -->
  </div>
</template>

<script>

export default {
  name: "videoPractice",
  data() {
    return {

    }
  },
  methods: {
    initWorld() {
      console.info('初始化世界！！1')
      const constraints = { audio: true, video: { width: 300, height: 200 } }
      const test = navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        /* 使用这个stream stream */
        const video = this.$refs['videoContainer']
        video.srcObject = stream
        video.onloadedmetadata = (e) => {
          video.play()
        }
      }).catch((err) => {
        console.log('err:', err)
      })      
    }
  },
  mounted() {
    this.initWorld()
  }
}
</script>


<style scoped lang="scss">
.VideoPractice {
  width: 100%;
  height:100%;
  border: 1px solid red;
}
</style>
