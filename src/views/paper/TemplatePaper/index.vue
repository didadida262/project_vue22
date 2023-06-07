<!--
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:06:23
 * @LastEditors: Hhvcg
 * @Description: cyber-font---salute-shell
-->

<template>
  <div class="cyberFont-container pd10">
    <commonTemplate title="CyberFont" />
    <div class="cyberFont-container-content">
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
  name: 'cyberFont',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'cyberFont',
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
    if (this.paper) {
      this.paper = null
    }
  },
  methods: {
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
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
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.cyberFont-container {
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
