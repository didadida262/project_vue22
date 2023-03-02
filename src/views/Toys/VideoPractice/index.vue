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
      <div class="video-container flex-col">
        <video
         id="videoContainer" 
         ref="videoContainer" 
         controls 
         style="width: 100%;height: 90%" 
         controlslist="nodownload"
         autoplay="autoplay">
          <source :src="url" type="video/mp4">
        </video>
        <div>
          <el-button @click="changePlayWay">{{ playWayShowContent }}</el-button>
          <el-button @click="switchVideo('right')">下一个</el-button>
          <el-button @click="switchCurrentListState">{{  currentListState }}</el-button>
        </div>
      </div>
      <div v-if="currentListState === 'show'" class="option-container pd10">
        <div class="option-container-cate">
          <el-button
            v-for="(cate, index) in categories"
            :key="categories.key"
            type="primary"
            :plain="currentCate.key !== cate.key"
            @click="handleChangeModel(cate)"
          >
            {{ cate.key }}
          </el-button>
          <span class="mgl10">当前类别文件数目: <span style="color: red">{{ videosList.length }}</span></span>
        </div>
        <div class="option-container-list">
          <div
           v-for="(video, index) in videosList" 
           :key="index" 
           :id="'test' + video.id"
           class="flex-ca video-itemContainer mgb5">
            <video-item 
            :data="video" 
            @handleVideoOperate="handleVideoOperate" />
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
      currentListState: 'show',
      currentPlayWay: 'random',
      playWayCate: {
        random: '随机播放',
        sequence: '顺序播放'
      },
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
  computed: {
    playWayShowContent() {
      return this.playWayCate[this.currentPlayWay]
    }
  },
  async created() {
    await this.getCates()
    this.getVideosList(this.page)
  },
  mounted() {
    const elevideo = document.getElementById("videoContainer")
    console.log('elevideo', elevideo)
    elevideo.addEventListener('ended', () =>  { //结束
      this.handleVideoEnded()
    }, false);
  },
  beforeDestroy() {
  },
  methods: {
    switchCurrentListState() {
      this.currentListState = this.currentListState === 'show'? 'hide': 'show'
    },
    nextVideo() {
      this.handleVideoEnded()
    },
    switchVideo(flag) {
      switch (flag) {
        case 'right':
          this.nextVideo()
          break
      }
    },
    // 根据当前输入item，更新选中信息
    updateItemSelected(target) {
      console.log('target>',target)
      this.videosList.forEach(item => {
          item.editFlag = false
          if (item.id === target.id) {
            item.active = true
          } else {
            item.active = false
          }
        })
    },
    changePlayWay() {
      this.currentPlayWay = this.currentPlayWay === 'random'? 'sequence': 'random'
      this.$message.info(this.playWayCate[this.currentPlayWay])
    },
    async randomPlay() {
      const next = (Math.random() * (this.videosList.length - 1)).toFixed(0)
      await this.getVideoData(this.videosList[next])
      this.updateItemSelected(this.videosList[next])
      this.scrollToTarget(this.videosList[next])
    },
    async sequencePlay() {
      const index = this.videosList.findIndex((item) => item.id === this.currentVideoInfo.id)
      await this.getVideoData(this.videosList[index + 1])
      this.updateItemSelected(this.videosList[index + 1])
      this.scrollToTarget(this.videosList[index + 1])
    },
    handleVideoEnded() {
      switch (this.currentPlayWay) {
        case 'random':
          this.randomPlay()
          break
        case 'sequence':
          this.sequencePlay()
          break;
      }
    },
    handleChangeModel(cate) {
      this.currentCate = cate
      this.getVideosList(this.page)
    },
    // 定位到当前播放item
    scrollToTarget(target) {
      const targetDom = document.querySelector('#test' + target.id)
      if (targetDom) {
        targetDom.scrollIntoView(true);
      }
      
    },
    async handleVideoOperate(info) {
      console.log('当前>>', info)
      if (info.type === 'click') {
        await this.getVideoData(info.data)
        this.videosList.forEach(item => {
          item.editFlag = false
          if (item.name === info.data.name) {
            item.active = true
          } else {
            item.active = false
          }
        })
        // this.scrollToTarget(info.data)
      } else if (info.type === 'refreshData') {
        this.getVideosList()
      } else if (info.type === 'handleEdit') {
        const t = this.videosList.filter((item) => item.name === info.data.name)[0]
        t.editFlag = info.edit
      }
    },
    // download() {
    //   // // 转base64格式、图片格式转换、图片质量压缩---支持两种格式image/jpeg+image/png
    //   const imgBase64 = canvasRef.value.toDataURL('image/jpeg', 0.7)
    //   console.log(imgBase64)
    //   // 由字节转换为KB 判断大小
    //   const str = imgBase64.replace('data:image/jpeg;base64,', '')
    //   // let strLength = str.length;
    //   // let fileLength = parseInt(strLength - (strLength / 8) * 2); // 图片尺寸  用于判断
    //   // let size = (fileLength / 1024).toFixed(2);
    //   // console.log(size); // 上传拍照信息  调用接口上传图片 .........
    //   // 保存到本地
    //   const ADOM = document.createElement('a')
    //   ADOM.href = str
    //   ADOM.download = new Date().getTime() + '.jpeg'
    //   console.log('adom:', ADOM)
    //   ADOM.click()
    // },
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

    // 获取目标视频
    async getVideoData(info) {
      // 打点
      this.currentVideoInfo = {
        ...info
      }
      console.log('目标视频信息',info)
      const res = await this.$axios.getVideo(info)
      const blob = new Blob([res], { type: 'mp4' })
      const url = URL.createObjectURL(blob)
      this.url = url
      const videoContainer = this.$refs['videoContainer']
      videoContainer.src = url
      console.log('当前url--->', this.url)
    },
    // 获取目标目录下的所有文件
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
          currentCate: this.currentCate,
          editFlag: false
        }
      })
      console.log('this.videosList>>>', this.videosList)
    },
    // 获取所有目录
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
      border: 1px solid gray;
      height: 100%;
      background: 'black';
      flex: 1
    }
    .option-container {
      width: 500px;
      height: 100%;
      border: 1px solid gray;
      &-cate {
        height: 80px;
        width: 100%;
      }
      &-list {
        width: 100%;
        height: calc(100% - 90px);
        overflow: scroll;
      }      
      .video-itemContainer {
        border: 1px solid rgb(142, 68, 68);
      }
    }

  }
}
</style>
