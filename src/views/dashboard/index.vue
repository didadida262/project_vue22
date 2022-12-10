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
    <el-upload
      name="sqlite_file"
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :before-upload="beforeAvatarUpload"
      multiple
      :limit="3"
      :file-list="fileList">
      <el-button size="small" type="primary">点击上传</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <!-- <div class="sq"></div> -->
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paper from 'paper'
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
  },
  mounted() {
    console.time('1')
    this.initWorld()
    this.testEvent()
    console.timeEnd('1')
    console.log('paperScope--->', this.paper)
  },
  beforeDestroy() {
    this.currentProject.remove()
  },

  methods: {
    beforeAvatarUpload(file) {
      console.log('file>>', file)
    },
    t(e) {
      console.log('eeee', e)
    },
    testEvent() {
      const layerLine = new paper.Layer()
      layerLine.name = 'layerLine'
      layerLine.opacity = 0
      const t = new paper.Path.Line(new paper.Point(0, 0), new paper.Point(100, 100))
      t.set({
        strokeColor: 'red',
        strokeWidth: 10,
        opacity: 1
      })
      t.opacity = 1
    },
    initWorld() {
      // 获取
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      // this.snake.x = -Math.floor(canvas.clientWidth / 2)
      // this.snake.y = -Math.floor(canvas.clientHeight / 2)
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.title
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
      this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
      this.paper.view.setCenter(0, 0)
      console.log('this.paper', this.paper)
    },

    onFrame(e) {
      this.currentProject.layers[0].children.forEach((_p) => {
        _p.rotate(3, new paper.Point(0))
      })
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
  background: black;
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
.sq {
  width: 100px;
  height: 50px;
  background: grey;
}
.sq:hover {
  cursor: pointer;

}
</style>
