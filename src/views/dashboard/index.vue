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
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paper from 'paper'
import { getRandomColor, getCirclePoint } from '@/utils/weapons'

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
      paper: null,
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
    t(e) {
      console.log('eeee', e)
    },
    testEvent() {
      // 初始化世界
      // const p = new paper.Path.Circle({
      //   center: new paper.Point(0, 0),
      //   radius: 150,
      //   fillColor: 'red'
      // })
      // p.onClick = (e) => {
      //   console.log('>>>>>>>>>>>>>')
      // }
      new paper.Path.Circle({
        center: new paper.Point(0),
        radius: 100,
        fillColor: 'black',
        onClick: (e) => {
          console.log('p1>>>>>>>>>>>>>')
        }
      })
      new paper.Layer({
        name: 'dddd'
      })
      new paper.Path.Circle({
        center: new paper.Point(100),
        radius: 100,
        strokeColor: 'red',
        opacity: 0.5,
        onClick: (e) => {
          console.log('p2>>>>>>>>>>>>>')
        }
      })
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
      this.paper.view.setCenter(0, 0)
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  border: 1px solid gray;
  width: 100%;
  height: calc(100vh - 50px);
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
