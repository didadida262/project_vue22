
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
  mounted() {
    this.initWorld()
    this.drawPic()
  },

  methods: {
    drawPic() {
      console.log('???')
      let raster = new paper.Raster(this.url)
      let project = paper.projects.filter((item) => item.name === this.title)[0]
      raster.onLoad = () => {
        raster.fitBounds(project.view.bounds, false)
        console.log('load-success!!')
      }
      console.log('paper???', paper)
    },
    initWorld() {
      // 获取
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      paper.project.name = this.title
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
  border: 1px solid red;
  width: 100%;
  height: 100%;

}
</style>
