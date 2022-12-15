<!--
 * @Author: Hhvcg
 * @Date: 2022-12-15 17:57:29
 * @LastEditors: -_-
 * @Description: space空间特效
-->

<template>
  <div class="Space-container pd10">
    <commonTemplate title="Space" />
    <div class="Space-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'Space',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Space',
      WIDTH: null,
      HEIGHT: null
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
    this.drawFont()
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    currentProject.remove()
  },
  methods: {
    drawFont() {
    },
    onFrame() {
    },
    onMouseDown(e) {
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.project.name = this.title
      this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = this.onMouseDown
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
      }
      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.Space-container {
  width: 100%;
  height: 100%;
  &-content {
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
