<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: -_-
 * @Description: 支持图片展示、拖拽、放大缩小功能及各种标注
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
    },
    activatedBrush: {
      type: String
    },
    activeScope: {
      type: String
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
    onMouseDown(e) {
      this.path = new paper.Path({
        strokeColor: 'black'
      })
      this.path.add(e.point)
    },
    onMouseDrag(e) {
      this.path.add(e.point)
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
    // onMouseDown(e) {
    //   this.initPoint = e.point
    // },
    // onMouseDrag(e) {
    //   const delta = this.initPoint.subtract(e.point)
    //   this.paper.projects.forEach(pro => {
    //     const newCenter = pro.view.center.add(delta)
    //     pro.view.setCenter(newCenter)
    //   })
    // },
    drawPic() {
      const raster = new paper.Raster(this.picInfo.src)
      raster.onLoad = () => {
        raster.fitBounds(this.paper.view.bounds, false)
      }
    }
  },
  watch: {
    activeScope() {
      if (this.activeScope === this.picInfo.title) {
        this.currentProject.activate()
      }
    },
    activatedBrush() {
      console.log('this.activatedBrush>>>', this.activatedBrush)
      if (this.activatedBrush === 'pencil') {
        this.currentProject.view.onMouseDown = this.onMouseDown
        this.currentProject.view.onMouseDrag = this.onMouseDrag
        this.currentProject.view.onMouseMove = this.onMouseMove
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
}

</style>
