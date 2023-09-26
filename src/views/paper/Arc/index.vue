
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
import { showRect, showImg, setProjectZoom, initPaperCanvae, showText, showPoint, removeLayer, drawXY, drawFlatHidden, drawNotch, drawNotchHidden, drawFlat, drawGrid } from '@/utils/paperWeaponTS'

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
    showImg(new paper.Point(-200, -200), '@/assets/Sam.webp')
    showText(new paper.Point(200, -200), '测试')
    showRect(new paper.Point(-200, 200))
    drawXY(this.project, 'layerXY')
    // this.drawWaferBorder()
  },
  beforeDestroy() {
    if (this.project) {
      this.project.remove()
    }
  },
  methods: {
    test() {
      new paper.Path.Line({
        form: new paper.Point(10, 10),
        to: new paper.Point(20, 20),
        strokeColor: 'orange'
      })
    },
    changeZoom(delta, p) {
      const view = this.project.view
      const oldZoom = view.matrix.a
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
      console.log('view',this.project.view)
      const view = this.project.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.offsetX, e.offsetY)
      )
      const transform = this.changeZoom(e.deltaY, viewPosition)
      // this.project.view.zoom = transform.zoom
      setProjectZoom(this.project, transform.zoom)
      this.project.view.center = this.project.view.center.add(transform.offset)
      drawXY(this.project, 'layerXY')
    },
    drawWaferBorder() {
      const radius = 200
      const length = 200
      let layerArc = this.project.layers['layerArc']
      if (layerArc) {
        layerArc.remove()
      }
      layerArc = new paper.Layer()
      layerArc.name = 'layerArc'
      // drawFlatHidden(this.project, 'layerArc', -90, length, radius)
      // drawNotchHidden(this.project, 'layerArc', 0, 60, 90, radius)
      // drawNotchHidden(this.project, 'layerArc', 90, 60, 90, radius)
      // drawNotchHidden(this.project, 'layerArc', 180, 60, 90, radius)
      // drawNotchHidden(this.project, 'layerArc', 270, 60, 90, radius)

      // drawFlat(this.project, 'layerArc', -90, length, radius)
      // drawFlat(this.project, 'layerArc', 90, length, radius)
      // drawNotch(this.project, 'layerArc', 180, 30, 90, radius)
      // drawNotch(this.project, 'layerArc', 90, 30, 90, radius)
      // drawNotch(this.project, 'layerArc', 0, 30, 90, radius)
      // const path = this.project.layers['layerArc'].children[0]
      // drawGrid(this.project, 'layerGrid', path, [3, 3])
    },
    onFrame() {
    },
    onMouseDown(e) {
      console.log(e.point)
      removeLayer(this.project, 'layerXY')
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
      // const center = new paper.Point(0)
      // const v = center.subtract(e.point)
      // const newC = this.project.view.center.add(v)
      // this.project.view.setCenter(newC)
    },
    onMouseUp(e) {
      this.initPoint = null
      drawXY(this.project, 'layerXY')
    },
    onKeyDown(e) {
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      this.project = initPaperCanvae(canvas)
      this.project.name = this.title
      this.project.view.onFrame = this.onFrame
      this.project.view.setCenter(0)
      console.log('初始化世界!!!', paper)
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
