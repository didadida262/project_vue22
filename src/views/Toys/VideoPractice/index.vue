<!--
 * @Author: Hhvcg
 * @Date: 2022-06-02 10:49:57
 * @LastEditors: -_-
 * @Description: 音乐点歌台
-->

<template>
  <div class="VideoPractice pd10 flex-col">
    <commonTemplate title="Some ge tais" />
    <div class="Content flex-cb">
      <div class="video-container flex-cb">
        <video ref="videoContainer" controls style="width: 100%;height: 100%">
          <!-- <source src="/media/cc0-videos/flower.webm"
                  type="video/webm">
          <source src="/media/cc0-videos/flower.mp4"
                  type="video/mp4">
          Sorry, your browser doesn't support embedded videos.         -->
            <source :src="url" type="video/mp4">
        </video>
      </div>      
      <div class="canvas-container pd10">
        <h2 style="height: 30px">歌单....</h2>
        <div style="width: 100%;height: calc(100% - 60px);overflow: scroll;">
          <div v-for="(video, index) in videosList" :key="index"  class="flex-ca">
            <song-item :data="video.name" @handleSelect="handleSelect"/>
            <!-- <span>{{ video.id }}</span>
            <span>{{ video.name }}</span> -->
          </div>
        </div>
        <!-- <canvas ref="canvas" resize class="canvas" /> -->
      </div>
    </div>
    <!-- <div class="operation mgt10">
      <el-button type="primary" size="mini" @click="queryImg">截图</el-button>
      <el-button size="mini">下载</el-button>
      <el-button size="mini" @click="test">test</el-button>
    </div> -->
  </div>
</template>

<script>
import CommonTemplate from '@/components/titleTemplate.vue'
import songItem from '../../paper/Music/components/songItem.vue'

export default {
  name: "videoPractice",
  components: {
    CommonTemplate,
    songItem
  },
  data() {
    return {
      videosList: [],
      url: null,
      page: {
        page_index: 1,
        page_num: 10
      }

    }
  },
  methods: {
    handleSelect(info) {
      console.log('播放>>', info)
      this.getVideo(info)
    },
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
    // 打开摄像头获取视频流 
    async openVideo() {
      console.info('初始化世界！！1')
      const constraints = { audio: true}
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
    },

    // 获取视频列表
    async getVideo(info) {
      const params = {name: info}
      const res = await this.$axios.getVideo(params)
      let blob = new Blob([res], {type: 'mp4'})
      let url = URL.createObjectURL(blob)
      this.url = url
      let videoContainer = this.$refs['videoContainer']
      videoContainer.src = url
      
      console.log('当前url--->', this.url)
    },
    async getVideosList(params) {
      const res = await this.$axios.getVideosList(params)
      this.videosList = res
      console.log('mvlist>>>', res)
    }
  },
  created() {
    this.getVideosList(this.page)
    // this.getVideos()
  },
  beforeDestroy() {
  }
}
</script>


<style scoped lang="scss">
.VideoPractice {
  width: 100%;
  height:100%;
  .Content {
    width: 100%;
    height: calc(100% - 100px);
    // flex: 1;
    .video-container {
      width: 65%;
      border: 1px solid gray;
      height: 100%;
    }    
    .canvas-container {
      width: calc(35% - 10px);
      height: 100%;
      border: 1px solid gray;
    }

  }
}
</style>
