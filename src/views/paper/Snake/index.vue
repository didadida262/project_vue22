
<template>
  <div class="container pd10">
    <commonTemplate title="Snake--Moving!!" />
    <div class="snake-container-content">
      <canvas ref="canvas" resize class="canvas" hidpi="off" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons.js'
export default {
  name: 'snake',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'snake',
      snake: null
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
    this.createSnake()
  },
  beforeDestroy() {
    console.log('beforeDestroyed>>>snake')
    this.currentProject.remove()
  },
  methods: {

    onFrame() {
    },

    onKeyDown(e) {

    },
    init() {
      this.grow = false
      this.vector = new paper.Point(150, 0)
      console.log('初始化世界!!!')
      console.log('黑色死光启动------=====-_-')
      const canvas = this.$refs.canvas
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.project.name = this.title
      this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = this.onMouseDown
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => { this.onMouseDown(e) }
      this.tool.onMouseMove = (e) => { this.onMouseMove(e) }
      this.tool.onMouseUp = (e) => { this.onMouseUp(e) }
      console.log(`${this.title}的paperScope---`, this.paper)
    },
    createSnake() {
      this.snake = new paper.Path({
        strokeColor: '#E4141B',
        strokeWidth: 20,
        strokeCap: 'round'
      })
      for (let i = 0; i < 25; i++) {
        this.snake.add(this.paper.view.center.add(new paper.Point(i * 35, 0)))
      }
    },
    onMouseMove(e) {
      this.snake.firstSegment.point = e.point
      for (let i = 0; i < 25 - 1; i++) {
        const segment = this.snake.segments[i]
        const nextSegment = segment.next
        const vector = segment.point.subtract(nextSegment.point)
        vector.length = 35
        nextSegment.point = segment.point.subtract(vector)
      }
      this.snake.smooth({ type: 'continuous' })
    },
    onMouseDown(e) {
      this.snake.fullySelected = true
      this.snake.strokeColor = '#e08285'
    },
    onMouseUp(e) {
      this.snake.fullySelected = false
      this.snake.strokeColor = '#e4141b'
    }
  }

}
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;

  .snake-container-content {
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
