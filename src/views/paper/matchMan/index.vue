<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 15:02:48
 * @LastEditors: -_-
 * @Description: 火柴人
-->

<template>
  <div class="matchMan-container pd10">
    <commonTemplate title="Match-Man" />
    <div class="matchMan-container-content">
      <canvas
       ref="canvas"
       resize
       class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'matchMan',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'matchMan',
      WIDTH: null,
      HEIGHT: null
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
    this.drawMap()
    this.draw()
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    currentProject.remove()
  },
  methods: {
    drawMap() {
      const line = new paper.Path.Line({
        form: new paper.Point(-this.WIDTH / 2, 0),
        to: new paper.Point(this.WIDTH / 2, 0),
        strokeColor: 'white',
        strokeWidth: 1
      })
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
    },
    onFrame() {
    },
    onMouseDown(e) {
      this.downPoint = e.point
    },
    onMouseDrag(e) {
      console.log('this.currentProject', this.currentProject)
      const delta = this.downPoint.subtract(e.point)
      const newCenter = this.currentProject.view.center.add(delta)
      this.currentProject.view.setCenter(newCenter)
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.project.name = this.title
      this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDrag = this.onMouseDrag
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
.matchMan-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
