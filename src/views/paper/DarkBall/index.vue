<!--
 * @Author: Hhvcg
 * @Date: 2022-11-15 15:50:22
 * @LastEditors: -_-
 * @Description: 仿照行星系统
-->

<template>
  <div class="darkball">
    <div class="darkball-text">
      <commonTemplate title="Dark-Ball" />
    </div>
    <div class="darkball-container flex-cc">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'darkball',
  components: {
    commonTemplate
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  data() {
    return {
      title: 'darkball',
      // 存储画布容器宽高
      WIDTH: null,
      HEIGHT: null
    }
  },
  created() {
    console.log('---darkball---加载完成--->')
    console.log(window.performance)
    this.paper = null
  },
  mounted() {
    this.initWorld()
    this.draw()
    console.log('paperScope--->', this.paper)
  },
  beforeDestroy() {
    this.currentProject.remove()
  },

  methods: {
    draw() {
      const t1 = new paper.Path.Circle({
        center: new paper.Point(0),
        radius: 100,
        dashArray: [2],
        fillColor: 'black',
        shadowColor: 'white',
        shadowOffset: new paper.Point(1),
        // 模糊距离
        shadowBlur: new paper.Point(50)
      })
      t1.name = 't1'
      for (let i = 0; i < 5; i++) {
        new paper.Path.Circle({
          center: new paper.Point(Math.random() * this.WIDTH / 2 - 80, Math.random() * this.HEIGHT / 2 - 80),
          radius: Math.random() * 80,
          fillColor: getRandomColor(),
          shadowColor: getRandomColor(),
          shadowOffset: new paper.Point(1),
          // 模糊距离
          shadowBlur: new paper.Point(50)
        })
      }
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
    },
    onMouseDrag(e) {
      console.log('onMouseDrag>>>', e)
    },
    onMouseDown(e) {

    },
    onFrame(e) {
      console.log('fram++')
      const paths = this.currentProject.layers[0].children
      const t1 = paths['t1']
      paths.forEach((t) => {
        if (t.name !== 't1') {
          t.rotate(3, t1.position)
        }
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.darkball {
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  &-text {
    width: 100%;
    height: 72px;
    margin-bottom: 10px;
  }
  &-container {
    height: calc(100% - 100px);
    width: 100%;
    background: black;
    .main_canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
