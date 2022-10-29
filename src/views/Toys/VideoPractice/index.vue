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
        <video ref="videoContainer" controls style="width: 100%;height: 100%" autoplay="autoplay" loop>
          <source :src="url" type="video/mp4">
        </video>
      </div>
      <div class="option-container pd10">
        <div style="height: 30px;width: 100%;" class="mgb10">
          <el-button
            v-for="(cate, index) in categories"
            :key="index"
            type="primary"
            :plain="currentCate !== cate"
            @click="handleChangeModel(cate)"
          >
            {{ cate }}
          </el-button>
        </div>
        <div style="width: 100%;height: calc(100% - 60px);overflow: scroll;">
          <div v-for="(video, index) in videosList" :key="index" class="flex-ca video-itemContainer mgb5">
            <video-item :data="video" @handleSelect="handleSelect" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CommonTemplate from '@/components/titleTemplate.vue'
import videoItem from './components/videoItem.vue'

export default {
  name: 'VideoPractice',
  components: {
    CommonTemplate,
    videoItem
  },
  data() {
    return {
      categories: [],
      currentCate: null,
      videosList: [],
      url: null,
      page: {
        page_index: 1,
        page_num: 10
      }

    }
  },
  async created() {
    await this.getCates()
    this.getVideosList(this.page)
  },
  beforeDestroy() {
  },
  methods: {
    handleChangeModel(cate) {
      this.currentCate = cate
      this.getVideosList(this.page)
    },
    async handleSelect(info) {
      console.log('播放>>', info)
      if (info.type === 'click') {
        await this.getVideoData(info.data)
        this.videosList.forEach(item => {
          if (item.name === info.data.name) {
            item.active = true
            console.log('item>>', item)
          } else {
            item.active = false
          }
        })
      } else if (info.type === 'refreshData') {
        this.getVideosList()
      }
    },
    download() {
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
      const constraints = { audio: true }
      navigator.mediaDevices.getUserMedia(constraints).then((stream) => {
        /* 使用这个stream视频流... */
        const video = this.$refs['videoContainer']
        const canvas = this.$refs['canvasContainer']
        video.srcObject = stream
        const ctx = canvas.getContext('2d')
        // 截图功能
        ctx.drawImage(stream, 0, 0, 300, 200)
        video.onloadedmetadata = (e) => {
          video.play()
        }
      }).catch((err) => {
        console.log('err:', err)
      })
    },

    // 获取视频列表
    async getVideoData(info) {
      const params = {
        currentCate: this.currentCate,
        name: info.name
      }
      const res = await this.$axios.getVideo(params)
      const blob = new Blob([res], { type: 'mp4' })
      const url = URL.createObjectURL(blob)
      this.url = url
      const videoContainer = this.$refs['videoContainer']
      videoContainer.src = url
      console.log('当前url--->', this.url)
    },
    async getVideosList(info) {
      const params = {
        ...info,
        currentCate: this.currentCate
      }
      const res = await this.$axios.getVideosList(params)
      this.videosList = res.map((item) => {
        return {
          ...item,
          active: false,
          currentCate: this.currentCate
        }
      })
      console.log('this.videosList>>>', this.videosList)
    },
    async getCates() {
      this.categories = await this.$axios.getCates()
      this.currentCate = this.categories[0]
    }

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
      width: calc(100% - 510px);
      border: 1px solid gray;
      height: 100%;
      background: 'black';
    }
    .option-container {
      width: 500px;
      height: 100%;
      border: 1px solid gray;
      .video-itemContainer {
        border: 1px solid rgb(142, 68, 68);
      }
    }

  }
}
</style>
