<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: -_-
 * @Description: 支持图片展示、拖拽、放大缩小功能
-->

<template>
  <canvas
    :id="picContainer"
    :ref="picContainer"
    resize
    class="picContainer"
    @wheel="onwheel"
  />
</template>
<script>
import paper from 'paper'
export default {
  name: 'paperpicsample',
  props: {
    picInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      zoom: 1,
      WIDTH: null,
      HEIGHT: null,
      // 拖动的初始点
      initPoint: null
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
      this.paper.projects.forEach((project) => {
        project.view.zoom = transform.zoom
        project.view.center = project.view.center.add(transform.offset)
      })
    },
    // 初始化画布，并确认相关参数初始值
    init() {
      const canvas = this.$refs[this.picContainer]
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.picContainer
      this.paper.view.setCenter(0, 0)
      this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
      this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
    },
    onMouseDown(e) {
      console.warn('down>>>>>>>>')
      this.initPoint = e.point
      // this.raster.setPixel(e.point.x, e.point.y, 'red')
      // const color = this.raster.getPixel(e.point.x, e.point.y)
      // console.log('color>>', color)
      // console.log(`RGB>>>>>${color.red} + ${color.green} + ${color.blue}`)
      const c = new paper.Path.Rectangle({
        center: e.point.floor(),
        size: new paper.Size(0.1),
        strokeColor: 'green',
        strokeWidth: 0.1
      })
    },
    onMouseDrag(e) {
      const delta = this.initPoint.subtract(e.point)
      this.paper.projects.forEach(pro => {
        const newCenter = pro.view.center.add(delta)
        pro.view.setCenter(newCenter)
      })
    },
    drawPic() {
      this.raster = new paper.Raster({
        source: this.picInfo.src,
        smoothing: false
      })
      this.raster.onLoad = () => {
        this.raster.fitBounds(this.paper.view.bounds, false)
        this.average = this.raster.getAverageColor()
        for (let i = 0; i < 100; i++) {
          const c = new paper.Path.Rectangle({
            center: new paper.Point(i, 0),
            size: new paper.Size(1),
            strokeColor: 'green',
            strokeWidth: 1
          })
        }

        this.$emit('handlePicEvent', {
          loadedSuccess: true
        })
      }
    }
  },
  computed: {
    picContainer() {
      return 'picContainer' + this.picInfo.title
    },
    currentProject() {
      return this.paper.projects.filter((item) => item.name === this.picContainer)[0]
    }
  },
  mounted() {
    this.init()
    this.drawPic()
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((p) => p.name === this.picContainer)
    currentProject.remove()
  }
}
</script>

<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
  border: 1px solid red;
}

</style>
