<!--
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:06:23
 * @LastEditors: -_-
 * @Description: cyber-font---salute-shell
-->

<template>
  <div class="raster-container pd10">
    <commonTemplate title="Raster-Test" />
    <div class="raster-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'
import { appendToMemberExpression } from '@babel/types'

export default {
  name: 'raster',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'raster',
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
      this.raster = new paper.Raster({
        position: 0,
        source: require('@/assets/Sam.webp')
      })
      this.raster.onLoad = () => {
        this.raster.fitBounds(this.currentProject.view.bounds, false)
      }
    },
    onFrame() {
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
      console.log('初始化世界!!!', this.paper)
    }
  }
}
</script>
<style scoped lang="scss">
.raster-container {
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
