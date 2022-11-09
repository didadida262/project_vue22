<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: 见缝插针
-->
<template>
  <div class="Watch-container pd10">
    <commonTemplate title="Big Brother Is Watching you" />
    <div class="Watch-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
// import { getRandomColor } from '@/utils/weapons.js'
export default {
  name: 'Watch',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Watch',
      paper: null,
      tool: null,
      url: require('@/assets/Sam.webp')
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
  },
  beforeDestroy() {
    this.currentProject.remove()
  },
  methods: {
    removeItem(item) {
      if (item) {
        item.remove()
        item = null
      }
    },
    onFrame() {
    },
    drawPic() {
      const raster = new paper.Raster(this.url)
      raster.onLoad = () => {
        raster.fitBounds(this.currentProject.view.bounds)
      }
    },
    init() {
      console.log('初始化世界!!!')
      const canvas = this.$refs.canvas
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.view.setCenter(0, 0)
      this.paper.project.name = 'Watch'
      this.paper.view.onFrame = this.onFrame
      this.tool = new this.paper.Tool()
      this.tool.onKeyDown = (e) => {
      }
      this.tool.onMouseDown = (e) => {
      }
      this.drawPic()
    }
  }
}
</script>
<style scoped lang="scss">
.Watch-container {
  width: 100%;
  height: 100%;
  .Watch-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: white;
    }
  }
}
</style>
