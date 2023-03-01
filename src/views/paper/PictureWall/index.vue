<!--
 * @Author: Hhvcg
 * @Date: 2022-11-09 17:07:29
 * @LastEditors: -_-
 * @Description: picture wall ---wangjian
-->

<template>
  <div class="PictureWall-container pd10">
    <commonTemplate :title="`像素打印机--${num}`" />
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
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'PictureWall',
  components: {
    commonTemplate
  },
  data() {
    return {
      num: 0,
      SIZE: 15,
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
    this.init()
  },
  watch: {},

  methods: {
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    // 判断是否越界点
    outRange(point) {
      if (Math.abs(point.x) <= this.WIDTH && Math.abs(point.y) <= this.HEIGHT) {
        return false
      } else {
        return true
      }
    },
    onFrame() {
      // this.drawSnakeStep()
    },
    drawSnakeStep() {
      if (this.start) {
        this.num++
        this.brick = new paper.Path.Rectangle(this.start, new paper.Size(this.SIZE))
        this.brick.fillColor = getRandomColor()
        // 构建一个向量，确认其运动的方向
        const v = new paper.Point.random()
        this.start.add(v)
        // if (Math.abs(newPosition.x) < this.WIDTH / 2 && Math.abs(newPosition.y) < this.HEIGHT / 2) {
        //   this.start = this.start.add(vector)
        // } else {
        // }
        // 如何确定一个点在view中
      }
      // if (this.snake.x >= this.XY.x || this.snake.y >= this.XY.y) return
      // // 根据当前snake的xy绘制图形
      // if (Math.abs(this.snake.x + this.SIZE * this.snake.direction) <= this.XY.x) {
      //   this.snake.x += this.SIZE * this.snake.direction
      // } else {
      //   this.snake.y += this.SIZE
      //   this.snake.direction = -this.snake.direction
      // }
    },
    init() {
      const canvas = this.$refs[this.picContainer]
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.picContainer
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      console.log('this.paper>>>', this.paper)
      this.start = this.paper.view.bounds.topLeft
    },

    onResize() {

    }
  },
  beforeDestroy() {
    if (this.paper) {
      this.paper = null
    }
    const currentProject = this.paper.projects.filter((p) => p.name === this.picContainer)
    if (currentProject) {
      currentProject.remove()
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
      // background: black;
    }
  }
}
</style>
