<!--
 * @Author: Hhvcg
 * @Date: 2022-11-11 10:56:57
 * @LastEditors: -_-
 * @Description: paperPic v2.0版本，即“感知图片版本---谷歌地图的丐版
  1. 图片感知功能，自动感知视图内图片是否未完整铺满视图
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
      view.zoom = transform.zoom
      view.center = view.center.add(transform.offset)
      this.checkCurrentRastersCannotCoverView()
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
      this.initPoint = e.point
    },
    onMouseDrag(e) {
      const delta = this.initPoint.subtract(e.point)
      this.paper.projects.forEach(pro => {
        const newCenter = pro.view.center.add(delta)
        pro.view.setCenter(newCenter)
      })
      this.checkCurrentRastersCannotCoverView()
    },
    checkCurrentRastersCannotCoverView() {
      const view = this.currentProject.view
      const topLeftView = view.bounds.topLeft
      const topRightView = view.bounds.topRight
      const bottomLeftView = view.bounds.bottomLeft
      const bottomRightView = view.bounds.bottomRight
      const tLVector = this.imgInfo.topLeft.subtract(topLeftView)
      if (tLVector.quadrant === 1 && tLVector.length !== 0) {
        this.$message.warning('顶部左无')
        return
      }
      const tRVector = this.imgInfo.topRight.subtract(topRightView)
      if (tRVector.quadrant === 2 && tLVector.length !== 0) {
        this.$message.warning('顶部右无')
        return
      }
      const bLVector = this.imgInfo.bottomLeft.subtract(bottomLeftView)
      if (bLVector.quadrant === 4 && tLVector.length !== 0) {
        this.$message.warning('底部左无')
        return
      }
      const bRVector = this.imgInfo.bottomRight.subtract(bottomRightView)
      if (bRVector.quadrant === 3 && tLVector.length !== 0) {
        this.$message.warning('底部右无')
        return
      }
    },
    drawPic() {
      const raster = new paper.Raster(this.picInfo.src)
      raster.onLoad = () => {
        // raster.fitBounds(this.currentProject.view.bounds, false)
        console.log('>>>>>>>>>>>>', raster)
        this.imgInfo = {
          topLeft: raster.bounds.topLeft,
          topRight: raster.bounds.topRight,
          bottomLeft: raster.bounds.bottomLeft,
          bottomRight: raster.bounds.bottomRight
        }
        this.checkCurrentRastersCannotCoverView()
        // raster.fitBounds(this.paper.view.bounds, false)
      }
      console.log('>>>>>>>>', raster.getImageData())
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
    if (this.currentProject) {
      this.currentProject.remove()
    }
  }
}
</script>

<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
  background: black;
}

</style>
