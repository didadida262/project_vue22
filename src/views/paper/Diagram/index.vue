<!--
 * @Author: Hhvcg
 * @Date: 2022-11-16 09:53:20
 * @LastEditors: -_-
 * @Description: 八卦阵列
-->

<template>
  <div class="diagram">
    <div class="diagram-text">
      <commonTemplate title="Diagram" />
    </div>
    <div class="diagram-container flex-cc">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'diagram',
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
      title: 'diagram',
      // 存储画布容器宽高
      WIDTH: null,
      HEIGHT: null
    }
  },
  created() {
    console.log('---diagram---加载完成--->')
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
        center: new paper.Point(-200, 0),
        radius: 50,
        dashArray: [2],
        fillColor: 'black',
        shadowColor: 'white',
        shadowOffset: new paper.Point(1),
        // 模糊距离
        shadowBlur: new paper.Point(50),
        opacity: 0.8

      })
      t1.name = 't1'
      const t2 = new paper.Path.Circle({
        center: new paper.Point(200, 0),
        radius: 50,
        dashArray: [2],
        opacity: 0.8,
        fillColor: 'white',
        shadowColor: 'black',
        shadowOffset: new paper.Point(1),
        // 模糊距离
        shadowBlur: new paper.Point(50),
        onMouseEnter: (e) => {
        },
        onMouseLeave: (e) => {
        }
      })
      t2.name = 't2'
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

    },

    onFrame(e) {
      this.currentProject.layers[0].children.forEach((_p) => {
        _p.rotate(3, new paper.Point(0))
      })
    }

  }
}
</script>

<style lang="scss" scoped>
.diagram {
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
