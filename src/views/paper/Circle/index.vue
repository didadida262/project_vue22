<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: 见缝插针
-->
<template>
  <div class="Circlle-container pd10">
    <commonTemplate title="Circle" />
    <div class="Circlle-container-content">
      <review-circle
       :defectList="circleData.dotData"
       :waferInfo="circleData.waferInfo"
      />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import ReviewCircle from '@/components/ReviewCircle.vue'
// import { getRandomColor } from '@/utils/weapons.js'
export default {
  name: 'Circlle',
  components: {
    commonTemplate,
    ReviewCircle
  },
  data() {
    return {
      title: 'Circlle',
      paper: null,
      tool: null,
      circleData: require('@/api/circleData')
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
    this.drawData()
  },
  beforeDestroy() {
    this.currentProject.remove()
  },
  methods: {
    drawData() {
      console.log('this.circleData>>>', this.circleData)
    },
    removeItem(item) {
      if (item) {
        item.remove()
        item = null
      }
    },
    onFrame() {
    },
    init() {
      console.log('初始化世界!!!')
      const canvas = this.$refs.canvas
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.view.setCenter(0, 0)
      this.paper.project.name = 'Circlle'
      this.paper.view.onFrame = this.onFrame
      this.tool = new this.paper.Tool()
      this.tool.onKeyDown = (e) => {
      }
      this.tool.onMouseDown = (e) => {
      }
    }
  }
}
</script>
<style scoped lang="scss">
.Circlle-container {
  width: 100%;
  height: 100%;
  .Circlle-container-content {
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
