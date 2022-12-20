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
      // this.heartPath = new paper.Path('M514.69629,624.70313c-7.10205,-27.02441 -17.2373,-52.39453 -30.40576,-76.10059c-13.17383,-23.70703 -38.65137,-60.52246 -76.44434,-110.45801c-27.71631,-36.64355 -44.78174,-59.89355 -51.19189,-69.74414c-10.5376,-16.02979 -18.15527,-30.74951 -22.84717,-44.14893c-4.69727,-13.39893 -7.04297,-26.97021 -7.04297,-40.71289c0,-25.42432 8.47119,-46.72559 25.42383,-63.90381c16.94775,-17.17871 37.90527,-25.76758 62.87354,-25.76758c25.19287,0 47.06885,8.93262 65.62158,26.79834c13.96826,13.28662 25.30615,33.10059 34.01318,59.4375c7.55859,-25.88037 18.20898,-45.57666 31.95215,-59.09424c19.00879,-18.32178 40.99707,-27.48535 65.96484,-27.48535c24.7373,0 45.69531,8.53564 62.87305,25.5957c17.17871,17.06592 25.76855,37.39551 25.76855,60.98389c0,20.61377 -5.04102,42.08691 -15.11719,64.41895c-10.08203,22.33203 -29.54687,51.59521 -58.40723,87.78271c-37.56738,47.41211 -64.93457,86.35352 -82.11328,116.8125c-13.51758,24.0498 -23.82422,49.24902 -30.9209,75.58594z')
      // this.heartPath.selected = true
      this.orbitalPath = new paper.Path.Rectangle({
        center: new paper.Point(this.WIDTH / 2, this.HEIGHT / 2),
        size: [400, 300],
        selected: true
      })

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
      for (let i = 0; i < 50; i++) {
      // this.gradient = new paper.Gradient(this.colors, true)
      // this.radius = Math.max(paper.view.size.width, paper.view.size.height)
        const dot = new Dot(this.getRandomPoint(), 3 * Math.random() + 10, getRandomColor(), 2 * Math.random())
        // const dot = new Dot(this.getRandomPoint(), 20, 'green')

        // dot.path.fillColor = new paper.Color(this.gradient, dot.path.bounds.leftCenter, dot.path.bounds.rightCenter)
        this.resp.push(dot)
      // this.vector = this.rec.position.subtract(dot.path.position)
      }
    },
    onFrame() {
      this.resp.forEach((dot) => {
        dot.run()
        dot.arrive(new paper.Point(this.WIDTH / 2, this.HEIGHT / 2))
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
    onMouseMove(e) {
      // this.currentProject.view.setCenter(e.point)
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
      this.paper.view.onMouseMove = this.onMouseMove
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
      }
      console.log(`初始化---${this.title}--成功!!!`, this.paper)
      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      console.log('ctx>', ctx)
      // console.log('ctx>', ctx.getImageData(this.currentProject.view.bounds))
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
