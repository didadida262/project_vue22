<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: -_-
 * @Description: 图片墙
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
      WIDTH: null,
      HEIGHT: null
    }
  },
  methods: {
    // 初始化画布，并确认相关参数初始值
    init() {
      const canvas = this.$refs[this.picContainer]
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.picContainer
      this.paper.view.setCenter(0, 0)
    },
    drawPic() {
      this.raster = new paper.Raster(this.picInfo.src)
      this.raster.onLoad = () => {
        this.loaded = true
        this.onResize()
      }
    },
    moveHandler() {

    },
    onResize() {
      if (!this.loaded) {
        return
      }
      this.currentProject.activeLayer.removeChildren()
      this.raster.fitBounds(this.currentProject.view.bounds, true)
      new paper.Path.Rectangle({
        rectangle: this.currentProject.view.bounds,
        fillColor: this.raster.getAverageColor(this.currentProject.view.bounds),
        onMouseMove: this.moveHandler
      })
    }
  },
  computed: {
    picContainer() {
      return 'picContainer' + this.title
    },
    currentProject() {
      return this.paper.projects.filter((p) => p.name === this.picContainer)[0]
    }
  },
  created() {
    this.raster = null
  },
  mounted() {
    this.init()
    this.drawPic()
  },
  beforeDestroy() {
    this.currentProject.remove()
  }
}
</script>

<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
}

</style>
