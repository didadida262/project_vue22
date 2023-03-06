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
    // 初始化画布，并确认相关参数初始值
    init() {
      const canvas = this.$refs[this.picContainer]
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.picContainer
      this.paper.view.setCenter(0, 0)
      this.paper.view.onMouseDown = this.onMouseDown
      this.paper.view.onMouseDrag = this.onMouseDrag
      this.paper.view.onMouseMove = this.onMouseMove
      this.paper.view.onMouseUp = this.onMouseUp
    },
    onMouseDown(e) {
      this.currentProject.activate()
      this.$emit('handleChangePaperScope', this.picInfo)
    },
    onMouseDrag(e) {
    },
    onMouseMove(e) {
    },
    onMouseUp(e) {
    },

    drawPic() {
      const raster = new paper.Raster(this.picInfo.src)
      raster.onLoad = () => {
        raster.fitBounds(this.paper.view.bounds, false)
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
  border: 1px solid rgb(184, 174, 174);
  border-radius: 5px;
}
.picContainer:hover {
  cursor: pointer;
  border: 2px solid rgb(0, 183, 255);
}

</style>
