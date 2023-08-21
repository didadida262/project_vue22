<template>
  <div class="Arc-container pd10">
    <commonTemplate title="Arc" />
    <div class="Arc-container-content">
      <canvas
       ref="canvas"
       @wheel="onwheel"
       resize
       class="canvas" />
    </div>
  </div>
</template>

<script lang="ts">
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { removeLayer } from '@/utils/weapons'
// import { getRandomPoint } from '@/utils/paper.ts'
import tools from './tools'

export default {
  mixins: [tools],
  name: 'Arc',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Arc',
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
    // this.drawXY()
    this.draw()
    console.log('this.currentProject>>>',this.currentProject)

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
    drawXY() {
      this.currentProject.activate()
      removeLayer(this.currentProject, 'layerXY')
      const layerXY = new paper.Layer()
      layerXY.name = 'layerXY'
      const currentCenter = this.currentProject.view.center
      const X = new paper.Path.Line({
        from: new paper.Point(currentCenter.x - this.WIDTH / 2, currentCenter.y),
        to: new paper.Point(currentCenter.x + this.WIDTH / 2, currentCenter.y),
        strokeColor: 'red',
        strokeWidth: 1,
      })
      const Y = new paper.Path.Line({
        from: new paper.Point(currentCenter.x, currentCenter.y - this.HEIGHT / 2),
        to: new paper.Point(currentCenter.x, currentCenter.y  + this.HEIGHT / 2),
        strokeColor: 'red',
        strokeWidth: 1,
      })
    },
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
    draw() {
      removeLayer(this.currentProject, 'layerData')
      const layerData = new paper.Layer()
      layerData.name = 'layerData'
      const circle = new paper.Path.Circle({
        center: 0,
        radius: 5,
        fillColor: 'green'
      })
      // const circle = new paper.Path.Arc({
      //   form: new paper.Point(-100, 0),
      //   to: new paper.Point(100, 0),
      //   through: new paper.Point(0, 200),
      //   strokeColor: 'red',
      //   closed: true
      // })
    },
    onFrame() {
    },
    onMouseDown(e) {
      removeLayer(this.currentProject, 'layerXY')
      this.initPoint = e.point
    },
    onMouseUp(e) {
      // this.drawXY()
      this.initPoint = null
    },
    onMouseDrag(e) {
      if (this.initPoint) {
        const delta = this.initPoint.subtract(e.point)
        const newCenter = this.currentProject.view.center.add(delta)
        this.currentProject.view.setCenter(newCenter)
      }

    },
    onMouseMove() {
    },
    onKeyDown() {
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
      this.paper.view.onMouseUp = this.onMouseUp
      this.paper.view.setCenter(0)
      this.paper.view.onMouseDrag = this.onMouseDrag
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.Arc-container {
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
