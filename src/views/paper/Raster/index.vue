<!--
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:06:23
 * @LastEditors: Hhvcg
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
    if (this.currentProject) {
      this.currentProject.remove()
    }
  },
  methods: {
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
      const gridNum = 10000
      const widthNum = Math.sqrt(gridNum)
      const heightNum = Math.sqrt(gridNum)
      const gridWidth = this.WIDTH / Math.sqrt(gridNum)
      const gridHeight = this.HEIGHT / Math.sqrt(gridNum)
      for (let i = 0; i < 20; i++) {
        for (let j = 0; j < 20; j++) {
          const raster = new paper.Raster({
            position: new paper.Point(25 + i * 100, 25 + j * 25),
            source: require('@/assets/Sam.webp'),
            size: [50, 50]
          })
          const bounds = new paper.Path.Rectangle({
            center: raster.position,
            width: 50,
            height: 50,
            selected: true
          })
          raster.onLoad = () => {
            raster.fitBounds(bounds, false)
          }
        }
      }
      console.log(this.paper)
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
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = this.onMouseDown
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
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
