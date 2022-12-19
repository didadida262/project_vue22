<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="dashboard">
    <div class="dashboard-container pd10 flex-cc">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
    <!-- name="sqlite_file" -->
    <el-upload
      ref="uploadFile"
      class="upload-demo"
      action="http://localhost:3000/uploadFile"
      :before-upload="beforeAvatarUpload"
      :on-change="handleFileChange"
      multiple
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paper from 'paper'
import bus from '@/api/eventBus'
// import { getRandomColor, getCirclePoint } from '@/utils/weapons'

export default {
  name: 'Dashboard',

  computed: {
    ...mapGetters([
      'name'
    ]),
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  data() {
    return {
      respBlob: [],
      fileList: [],
      hitResult: null,
      title: 'dashBoard',
      scale: 0,
      zoom: 1,
      //
      ratio: 1.05,
      p: null,
      image: {
        raster: null
      },
      url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
      url2: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      tool: null,
      // 存储画布容器宽高
      WIDTH: null,
      HEIGHT: null,
      SIZE: 100,
      snake: {
        x: null,
        y: null,
        direction: 1,
        respo: []
      }

    }
  },
  created() {
    console.log('---Dashboard---加载完成--->')
    console.log(window.performance)
    this.paper = null
    bus.$on('click', (data) => {
      console.log('dashboard---->', data)
    })
  },
  mounted() {
    this.initWorld()
    console.time('test')
    this.test()
    console.timeEnd('test')
    this.$nextTick(() => {
      this.$refs.uploadFile.$children[0].$refs.input.webkitdirectory = true
      // console.log(this.$refs.uploadFile.$children[0].$refs.input.webkitdirectory)
    })
  },
  beforeDestroy() {
    this.currentProject.remove()
  },

  methods: {
    test() {
      const raster = new paper.Raster({
        position: 0,
        source: require('@/assets/Sam.webp')
      })
      const bound = new paper.Path.Rectangle({
        center: raster.bounds.center,
        size: [raster.bounds.width, raster.bounds.height],
        strokeColor: 'green',
        strokeWidth: 10
      })
      console.log('bounds>>>', bound)
      // bound.strokeColor = 'green'
      // bound.strokeWidth = 10
      raster.onLoad = () => {
        raster.fitBounds(this.currentProject.view.bounds, false)
        // 方案一
        // raster.selected = true
        // raster.selectedColor = 'red'

        // raster.fillColor = 'red'
        // raster.visible = false
        // const bound = new paper.Path.Rectangle({
        //   center: raster.bounds.center,
        //   size: [raster.bounds.width, raster.bounds.height],
        //   strokeColor: 'green',
        //   strokeWidth: 1
        // })
      }
      // console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', raster.getImageData(raster.bounds))
      console.log('raster>>>', raster)
    },
    handleFileChange(file, fileList) {
      console.log('handleFileChange>>', fileList)
      const bin = []
      bin.push(fileList[0].raw)
      const t = URL.createObjectURL(new Blob(bin))
      this.respBlob.push(t)
      console.log('respBlob>>>', this.respBlob)
      if (this.raster) {
        this.raster.set({
          source: t
        })
        return
      }
      this.raster = new paper.Raster({
        position: 0,
        source: t
      })
      // this.raster.onLoad = () => {
      //   this.raster.fitBounds(this.currentProject.view.bounds, false)
      // }
    },
    beforeAvatarUpload(file) {
      // console.log('beforeAvatarUpload>>', file)
      // const bin = []
      // bin.push(file)
      // const t = URL.createObjectURL(new Blob(bin))
      // this.respBlob.push(t)
      // const r = new paper.Raster({
      //   position: this.paper.projects[0].layers[0].children[this.i].position,
      //   source: t
      // })
      // r.kk = this.i
      // r.onLoad = () => {
      //   r.fitBounds(this.paper.projects[0].layers[0].children[r.kk].bounds, false)
      // }

      // console.log('t>>', t)
      // console.log('t>>', this.paper)
      // this.i++

      return false
    },
    t(e) {
      console.log('eeee', e)
    },

    initWorld() {
      this.i = 0
      // 获取
      const canvas = this.$refs.main_canvas

      // canvas.getContext('2d' [, { [ alpha: true ] [, desynchronized: false ] [, colorSpace: 'srgb'] [, willReadFrequently: false ]} ])
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      // this.snake.x = -Math.floor(canvas.clientWidth / 2)
      // this.snake.y = -Math.floor(canvas.clientHeight / 2)
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.title
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      // this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
      // this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
      this.paper.view.setCenter(0, 0)
      console.log('this.paper', this.paper)
      const ctx = canvas.getContext('2d')
      console.log('ctx>>>', ctx)
      // console.log('ctx.gggg', ctx.getImageData(this.currentProject.view.bounds))
    },

    onFrame(e) {
      // this.currentProject.layers[0].children.forEach((_p) => {
      //   _p.rotate(3, new paper.Point(0))
      // })
    },
    onMouseDrag(e) {
      if (this.hitResult) {
        this.hitResult.set({
          position: e.point
        })
      }
    },
    onMouseDown(e) {
      this.hitResult = this.currentProject.hitTest(e.point).item
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  border: 1px solid gray;
  width: 100%;
  // background: black;
  height: calc(100vh - 250px);
  padding: 10px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  &-text {
    width: 100%;
    height: 100px;
    border: 1px solid ghostwhite;
  }
  &-container {
    height: calc(100% - 100px);
    width: 100%;
    .main_canvas {
      width: 90%;
      height: 90%;
      background: gray;
    }
  }
}
</style>
