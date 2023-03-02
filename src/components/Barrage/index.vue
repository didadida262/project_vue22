<!--
 * @Author: Hhvcg
 * @Date: 2022-12-02 16:06:02
 * @LastEditors: -_-
 * @Description: 弹幕层
-->

<template>
  <div class="Barrage-container">
      <canvas ref="canvas" resize class="canvas" />
  </div>
</template>

<script>
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons'
import { CyberFont } from './cyberfont'

export default {
  name: 'Barrage',
  props: {
    dataList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      title: 'barrage',
      WIDTH: null,
      HEIGHT: null,
      resp: []
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
  created() {
    console.log('收到的数据>>', this.dataList)
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    currentProject.remove()
  },
  methods: {
    // 根据当前paperscope宽高，返回一个范围内的随机坐标
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    drawFont() {
      this.resp = []
      for (let i = 0; i < this.dataList.length; i++) {
        this.resp.push(new CyberFont(Math.random() * 100, getRandomColor(), new paper.Point(this.random(), this.random()), this.dataList[i], Math.random() * 20))
      }
    },
    onFrame() {
      this.resp.forEach((f) => {
        f.run()
      })
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
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = this.onMouseDown
    }
  }
}
</script>
<style scoped lang="scss">
.Barrage-container {
  width: 100%;
  height: 100%;
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }

}
</style>
