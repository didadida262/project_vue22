<!--
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:06:23
 * @LastEditors: -_-
 * @Description: cyber-font---salute-shell
-->

<template>
  <div class="star-container pd10">
    <commonTemplate title="star" />
    <div class="star-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'star',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'star',
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
    console.log('this.currentProject>>>', this.currentProject.layers[0])
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
      // const path = new paper.Path.Star({
      //   center: new paper.Point(0, 0),
      //   points: 6,
      //   radius1: 5,
      //   radius2: 13,
      //   fillColor: 'white',
      //   strokeColor: 'black'
      // })
      const path = new paper.Path.Circle({
        center: 0,
        radius: 10,
        strokeColor: 'grey',
        fillColor: 'red'
      })

      // Create a symbol definition from the path:
      const definition = new paper.SymbolDefinition(path)

      // Place 100 instances of the symbol:
      for (let i = 0; i < 100; i++) {
        // Place an instance of the symbol in the project:
        const instance = new paper.SymbolItem(definition)

        // Move the instance to a random position within the view:
        // instance.position = paper.Point.random() * this.currentProject.view.size
        instance.position = paper.Point.random() * 100

        // Rotate the instance by a random amount between
        // 0 and 360 degrees:
        // instance.rotate(Math.random() * 360)

        // // Scale the instance between 0.25 and 1:
        // instance.scale(0.25 + Math.random() * 0.75)
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
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
      }
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.star-container {
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
