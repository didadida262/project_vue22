<template>
  <div class="Mapping-container pd10">
    <div class="Mapping-container-content">
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
import tools from './tools'
import { showText } from '@/utils/paperWeaponTS.ts'
export default {
  mixins: [tools],
  name: 'Mapping',
  components: {
  },
  data() {
    return {
      title: 'Mapping',
      WIDTH: null,
      HEIGHT: null,
      zoom: 1,
      project: null
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
    this.init()
    showText(new paper.Point(0), '测试')
  },
  beforeDestroy() {
    if (this.project) {
      this.project.remove()
    }
  },
  methods: {
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
    onFrame() {
    },
    onMouseDown(e) {
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
    }
  }
}
</script>
<style scoped lang="scss">
.Mapping-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: 100%;
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      // background: black;
    }
  }
}
</style>
