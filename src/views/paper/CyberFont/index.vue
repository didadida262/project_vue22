<!--
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:06:23
 * @LastEditors: Hhvcg
 * @Description: cyber-font---salute-shell
-->

<template>
  <div class="cyberFont-container pd10">
    <commonTemplate title="CyberFont" />

    <div class="cyberFont-container-content">
      <div class="cyberFont-container-content-video flex-cb">
        <video
          class="video-st"
          ref="videoContainer"
          controls
          autoplay="autoplay"
          loop>
          <source :src="videoUrl" type="video/mp4">
        </video>
        <!-- <video
         id="myVideo" controls>
          <source src="http://localhost:3000/testVideo" type="video/mp4">
        </video> -->
    </div>
      <canvas ref="canvas" resize class="canvas" />
    </div>

  <!-- <div class="cyberFont-container-audio flex-cb">
    <audio
      ref="audio"
      class="audio"
      style="display: none"
      muted="“muted”"
      loop
      :src="musicUrl"
    />
  </div> -->
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'
import { CyberFont } from './cyberfont'
import words from './words.json'

export default {
  name: 'cyberFont',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'cyberFont',
      resp: [],
      WIDTH: null,
      HEIGHT: null,
      musicUrl: null,
      videoUrl: null
      // source: new Blob([require('./test.mkv')], { type: 'video/mp4' })
    }
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  watch: {},
  mounted() {
    this.init()
    // this.getVideoData()
    // this.drawFont()
    this.addAudio()
    this.addVideo()
    this.getVideoFetch()
    const video = this.$refs['videoContainer']
    // video.addEventListener('canplay', function() {
    //   console.log('>>>>>>>>>>>>')
    //   video.play()
    // })
  },
  beforeDestroy() {
    if (this.currentProject) {
      this.currentProject.remove()
    }
  },
  methods: {
    async getVideoData(info) {
      console.log('info', info)
      const res = await this.$axios.getVideoCyberFont(info)
      console.log('res>>>>', res)
      const blob = new Blob([res], { type: 'mp4' })
      const url = URL.createObjectURL(blob)
      this.videoUrl = url
      const videoContainer = this.$refs['videoContainer']
      videoContainer.src = url
      console.log('当前url--->', this.videoUrl)
    },
    getVideoFetch(info) {
      console.log('fetch',fetch)
      // fetch("http://localhost:3000/testVideo")
      // fetch("https://fetch.spec.whatwg.org/")
      //   .then((response) => 
      //   console.log(response))
        // .then((data) => console.log('testVideo',data));
    },
    // 创建背景音乐
    addAudio() {

    },
    addVideo() {
      // // const buff = new ArrayBuffer(this.source)
      // const url = URL.createObjectURL(this.source)

      // console.log('url>>', url)
    },
    // 根据当前paperscope宽高，返回一个范围内的随机坐标
    random() {
      // return paper.Point.random() * this.WIDTH
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    drawFont() {
      for (let i = 0; i < words.length; i++) {
        this.resp.push(new CyberFont(Math.random() * 100, getRandomColor(), new paper.Point(this.random(), this.random()), words[i], Math.random() * 20))
      }
    },
    onFrame() {
      this.resp.forEach((f) => {
        f.run()
      })
    },
    onMouseDown(e) {
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.project.name = this.title
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = this.onMouseDown
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
      }
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.cyberFont-container {
  width: 100%;
  height: 100%;
  &-content {
    position: relative;
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      // background: white;
    }
    &-video {
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      .video-st {
        width: 100%;
        height: 100%;
        z-index: -1
        // display: none
      }
    }

  }

}
</style>
