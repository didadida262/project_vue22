<!--
 * @Author: Hhvcg
 * @Date: 2022-11-09 17:07:29
 * @LastEditors: -_-
 * @Description: picture wall ---wangjian
-->

<template>
  <div class="PictureWall-container pd10">
    <commonTemplate title="Picture Wall" />
    <div class="PictureWall-container-content">
      <canvas
        :id="picContainer"
        :ref="picContainer"
        resize
        class="canvas"
      />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import paper from 'paper'

export default {
  name: 'PictureWall',
  components: {
    commonTemplate
  },
  data() {
    return {
      loaded: false,
      WIDTH: null,
      HEIGHT: null,
      title: 'PictureWall',
      url: require('@/assets/Sam.webp')
    }
  },
  computed: {
    picContainer() {
      return 'picContainer-' + this.title
    },
    currentProject() {
      return this.paper.projects.filter((p) => p.name === this.picContainer)[0]
    }
  },
  created() {
  },
  mounted() {
    this.raster = null
    this.init()
    this.drawPic()
    this.lastPos = this.currentProject.view.center
  },
  watch: {},

  methods: {
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
      this.raster = new paper.Raster(this.url)
      this.raster.onLoad = () => {
        this.loaded = true
        this.onResize()
      }
    },
    moveHandler(name) {
      console.log('moveHandler>>>', name)
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
        // onMouseMove: this.moveHandler
        onClick: this.moveHandler
      })
    }
  }
}
</script>
<style scoped lang="scss">
.PictureWall-container {
  width: 100%;
  height: 100%;
  .PictureWall-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
