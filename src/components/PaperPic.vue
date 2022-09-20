<!--
 * @Author: Hhvcg
 * @Date: 2022-09-20 09:54:00
 * @LastEditors: -_-
 * @Description: 纯粹处理图片--paperjs
-->

<template>
  <div class="paperpic-st">
    <span>{{ title }}</span>
    <div class='content'>
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import CommonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor, getCirclePoint } from '@/utils/weapons'

export default {
  name: 'PaperPic',
  components: {
    CommonTemplate
  },
  props: {
    title: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      WIDTH: null,
      HEIGHT: null,
    }
  },
  created() {
  },
  watch: {
    url() {
      console.log(`${this.title}的url变化！！！`)
      console.log('paper>>', this.paper)
      let project = this.paper.projects.filter((item) => item.name === this.title)[0]
      project.activate()
      let layer = project.layers[0]
      layer.remove()
      let raster = new paper.Raster(this.url)
      raster.onLoad = () => {
        console.log('再次加载图片!!!1')
        raster.fitBounds(project.view.bounds, false)
      }
      console.log('this.paper>>>', this.paper)

      // let layer = project.layers[0]
      // let raster = layer.children[0]
      // console.log('raster>>>',raster)
      
    }
  },
  mounted() {
    console.time('pic---time')
    this.initWorld()
    this.drawPic()
    console.timeEnd('pic---time')
  },

  methods: {
    drawPic() {
      console.log('???')
      let raster = new paper.Raster(this.url)
      let project = paper.projects.filter((item) => item.name === this.title)[0]
      raster.onLoad = () => {
        raster.fitBounds(project.view.bounds, false)
      }
    },
    initWorld() {
      // 获取
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.title
      this.paper.view.setCenter(0, 0);
    }
  },
  beforeDestroy() {
    let project = paper.projects.filter((item) => item.name === this.title)[0]
    project.remove()
  }
}
</script>

<style lang="scss" scoped>
.paperpic-st {
  border: 1px solid grey;
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 20px);
    .main_canvas {
      width: 100%;
      height: 100%;
    }
  }

}
</style>
