<!--
 * @Author: Hhvcg
 * @Date: 2022-12-20 10:49:07
 * @LastEditors: Hhvcg
 * @Description: rainfallen--试图模仿雨滴
-->

<template>
  <div class="rainfallen-container pd10">
    <commonTemplate title="rainfallen" />
    <div class="rainfallen-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'rainfallen',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'rainfallen',
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
    this.draw()
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    currentProject.remove()
  },
  methods: {
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
      const cirOne = new paper.Path.Circle({
        center: 0,
        radius: 100,
        fillColor: 'green'
      })
    },
    onFrame() {
    },
    onMouseMove(e) {
      if (this.selection) {
        this.selection.set({
          position: e.point
        })
        return
      }
      this.selection = new paper.Path.Circle({
        center: e.point,
        radius: 50,
        fillColor: 'green'
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
      this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = this.onMouseDown
      this.paper.view.onMouseMove = this.onMouseMove
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
      }
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.rainfallen-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
