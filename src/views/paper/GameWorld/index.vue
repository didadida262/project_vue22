
<template>
  <div class="gameWorld-container pd10">
    <commonTemplate title="gameWorld" />
    <div class="gameWorld-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'
import tools from './tools'

export default {
  mixins: [tools],
  name: 'gameWorld',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'gameWorld',
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
    this.drawGround()
    console.log('this.currentProject>>>>', this.currentProject)
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    if (currentProject) {
      currentProject.remove()
    }
    if (this.paper) {
      this.paper = null
    }
  },
  methods: {
    // 初版简单粗暴，就一条直线，视图下方处
    drawGround() {

    },
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    onFrame() {
    },
    onMouseDown(e) {
    },
    onMouseDrag(e) {
    },
    onMouseMove(e) {
    },
    onMouseUp(e) {
    },
    onKeyDown(e) {
      // 方向键控制role，何时触发视图的变幻？
      // if (e.key === 'a') {
      //   const currentCenter = this.currentProject.view.center
      //   const newCenter = currentCenter.add(new paper.Point(-50, 0))
      //   this.currentProject.view.setCenter(newCenter)
      //   console.log('left>>>')
      // }
      // if (e.key === 'd') {
      //   console.log('right>>>')
      //   const currentCenter = this.currentProject.view.center
      //   const newCenter = currentCenter.add(new paper.Point(50, 0))
      //   this.currentProject.view.setCenter(newCenter)
      // }
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
      const center = new paper.Path.Circle({
        center: this.paper.view.center,
        radius: 50,
        strokeColor: 'orange'
      })
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.gameWorld-container {
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
