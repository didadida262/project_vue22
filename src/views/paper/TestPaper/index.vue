
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

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor, removeLayer } from '@/utils/weapons'
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
  },
  watch: {},
  mounted() {
    this.init()
    this.draw()
    this.drawXY()
  },
  beforeDestroy() {
    if (this.project) {
      this.project.remove()
    }
  },
  methods: {
    drawXY() {
      this.project.activate()
      removeLayer(this.project, 'layerXY')
      const layerXY = new paper.Layer()
      layerXY.name = 'layerXY'
      const currentCenter = this.project.view.center
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
      const coordinateData = new paper.PointText({
        point: currentCenter.add(2, -5),
        content: `(${currentCenter.x} , ${currentCenter.y})`,
        fillColor: 'red',
        justification: 'left',
        fontWeight:'bold'
      })
    },
    changeZoom(delta, p) {
      const view = this.project.view
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
      const view = this.project.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.offsetX, e.offsetY)
      )
      const transform = this.changeZoom(e.deltaY, viewPosition)
      this.project.view.zoom = transform.zoom
      this.project.view.center = this.project.view.center.add(transform.offset)
    },
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    draw() {
      console.time('timer')
      for (let i = 0; i < 10; i++) {
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
      removeLayer(this.project,'layerXY')
      this.initPoint = e.point
    },
    onMouseDrag(e) {
      if (this.initPoint) {
        const v = this.initPoint.subtract(e.point)
        const newC = this.project.view.center.add(v)
        this.project.view.setCenter(newC)
      }
    },
    onMouseMove(e) {
    },
    onMouseUp(e) {
      this.initPoint = null
      this.drawXY()
    },
    onKeyDown(e) {
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.project = paper.project
      this.project.name = this.title
      this.project.view.onFrame = this.onFrame
      this.project.view.setCenter(0)
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
