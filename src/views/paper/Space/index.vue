<!--
 * @Author: Hhvcg
 * @Date: 2022-12-15 17:57:29
 * @LastEditors: -_-
 * @Description: space空间特效
-->

<template>
  <div class="Space-container pd10">
    <commonTemplate title="Space" />
    <div class="Space-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import { Dot } from './DotClass.js'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'Space',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Space',
      WIDTH: null,
      HEIGHT: null,
      resp: [],
      colors: []
    }
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  watch: {},
  mounted() {
    this.createColors()
    this.init()
    this.draw()
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    currentProject.remove()
  },
  methods: {
    createColors() {
      for (let i = 0; i < 6; i++) {
        const brightness = 1 - (i / 60) * 1.5
        const hue = i / 6 * this.cycles * 360
        const color = {
          // 色调
          hue: hue,
          // 饱和
          saturation: 1,
          brightness: brightness
        }
        this.colors.push(color)
      }
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
      // this.rec = new paper.Path.Rectangle({
      //   center: new paper.Point(this.WIDTH / 2, this.HEIGHT / 2),
      //   size: [300, 300],
      //   strokeColor: 'red'
      // })
      // console.log('rec>>>', this.rec)
      // this.rec.set({
      //   fillColor: {
      //     gradient: {
      //       stops: [['yellow', 0.1], ['red', 0.3], ['black', 1]],
      //       radial: true
      //     },
      //     origin: this.rec.bounds.center,
      //     destination: this.rec.view.bounds.rightCenter,
      //     highlight: this.rec.view.bounds.center

      //   }
      // })
      for (let i = 0; i < 500; i++) {
      // this.gradient = new paper.Gradient(this.colors, true)
      // this.radius = Math.max(paper.view.size.width, paper.view.size.height)
        const dot = new Dot(this.getRandomPoint(), 8, getRandomColor(), this.rec)
        // const dot = new Dot(this.getRandomPoint(), 20, 'green')

        // dot.path.fillColor = new paper.Color(this.gradient, dot.path.bounds.leftCenter, dot.path.bounds.rightCenter)
        this.resp.push(dot)
      // this.vector = this.rec.position.subtract(dot.path.position)
      }
    },
    onFrame() {
      this.resp.forEach((dot) => {
        dot.run()
      })
      // const dot = this.resp[0]
      // const newCenter = dot.path.position.add(this.vector.normalize())
      // contains
      // if (this.rec.contains(newCenter)) {
      //   console.log('contains>>>>>>>')
      // }
      // isInside
      // dot.path.set({
      //   position: newCenter
      // })
      // if (dot.path.isInside(this.rec)) {
      //   console.log('isInside>>>')
      // }
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
.Space-container {
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
