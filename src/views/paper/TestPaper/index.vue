<!--
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:06:23
 * @LastEditors: -_-
 * @Description: cyber-font---salute-shell
-->

<template>
  <div class="cyberFont-container pd10">
    <commonTemplate title="TestPaper" />
    <div class="cyberFont-container-content">
      <canvas
       ref="canvas" 
       @wheel="onwheel"
       resize 
       class="canvas" />
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
      HEIGHT: null,
      zoom: 1
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
    if (currentProject) {
      currentProject.remove()
    }
    if (this.paper) {
      this.paper = null
    }
  },
  methods: {
    changeZoom(delta, p) {
      const view = this.currentProject.view
      const oldZoom = view.zoom
      const c = view.center
      const factor = 0.05 + this.zoom

      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      const beta = oldZoom / zoom
      // 计算当前点到当前视图中心点向量指向
      const pc = p.subtract(c)
      // a点目测是换算后的新p点
      const a = p.subtract(pc.multiply(beta)).subtract(c)

      return { zoom: zoom, offset: a }
    },
    onwheel(e) {
      const view = this.currentProject.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.offsetX, e.offsetY)
      )
      const transform = this.changeZoom(e.deltaY, viewPosition)
        this.currentProject.view.zoom = transform.zoom
        this.currentProject.view.center = this.currentProject.view.center.add(transform.offset)
    },
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
      console.time('timer')
      for (let i = 0; i <10000; i++) {
        const c = new paper.Path.Circle({
          center: this.random(),
          radius: 10,
          fillColor: getRandomColor()
        })
      }
      console.timeEnd('timer')
    },
    onFrame() {
    },
    onMouseDown(e) {
      this.initPoint = e.point
    },
    onMouseDrag(e) {
      if (this.initPoint) {
        const v = this.initPoint.subtract(e.point)
        const newC = this.currentProject.view.center.add(v) 
        this.currentProject.view.setCenter(newC)
        
      }
    },
    onMouseMove(e) {
    },
    onMouseUp(e) {
      this.initPoint = null
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
