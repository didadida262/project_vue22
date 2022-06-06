<!--
 * @Author: Hhvcg
 * @Date: 2022-06-02 10:49:57
 * @LastEditors: -_-
 * @Description: 前端音视频资源传输研究
-->

<template>
  <div class="VideoPractice pd10">
    <span>
      <h2>VideoPractice</h2>
    </span>
    <div class="Content flex-sc">
      <div class="video-container flex-cc">
        <video ref="videoContainer" controls>
          <source src="/media/cc0-videos/flower.webm"
                  type="video/webm">
          <source src="/media/cc0-videos/flower.mp4"
                  type="video/mp4">
          Sorry, your browser doesn't support embedded videos.        
        </video>
      </div>      
      <div class="canvas-container flex-cc">
        <canvas ref="canvas" resize class="canvas" />
      </div>
    </div>
    <div class="operation mgt10">
      <el-button type="primary" size="mini" @click="queryImg">截图</el-button>
      <el-button size="mini">下载</el-button>
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
//下载图片
    download (){
      // // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
      const imgBase64 = canvasRef.value.toDataURL('image/jpeg', 0.7)
      console.log(imgBase64)
      // 由字节转换为KB 判断大小
      const str = imgBase64.replace('data:image/jpeg;base64,', '')
      // let strLength = str.length;
      // let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
      // let size = (fileLength / 1024).toFixed(2);
      // console.log(size); // 上传拍照信息  调用接口上传图片 .........
      // 保存到本地
      const ADOM = document.createElement('a')
      ADOM.href = str
      ADOM.download = new Date().getTime() + '.jpeg'
      console.log('adom:', ADOM)
      ADOM.click()
    },    
    queryImg() {
      log('截图！')
    },
    async initWorld() {
      console.info('初始化世界！！1')
      const constraints = { audio: true, video: { width: 300, height: 200 } }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        /* 使用这个stream视频流... */
        const video = this.$refs['videoContainer']
        const canvas = this.$refs['canvasContainer']
        video.srcObject = stream
        const ctx = canvas.getContext('2d')
        // 截图功能
        ctx.drawImage(stream, 0,0,300,200)
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
  .Content {
    width: 100%;
    height: 80%;
    .canvas-container {
      width: 47%;
      height: 100%;
      border: 1px solid gray;
    }
    .video-container {
      width: 47%;
      border: 1px solid gray;
      height: 100%;
    }
  }
}
</style>
