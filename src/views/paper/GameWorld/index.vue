
<template>
  <div class="gameWorld-container pd10">
    <commonTemplate title="gameWorld" />
    <div class="gameWorld-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'
import tools from './tools'

export default {
  mixins: [tools],
  name: 'gameWorld',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'gameWorld',
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
    this.drawGround()
    this.test3()
    console.log('this.currentProject>>>>', this.currentProject)
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    if (currentProject) {
      currentProject.remove()
    }
    if (this.paper) {
      this.paper = null
    }
  },
  methods: {
    // 测试点信息
    test3() {
      const p1 = new paper.Point(100)
      const p2 = new paper.Point(200)
      const p3 = new paper.Point(300)
      const v = p2.subtract(p1)
      console.log('v>>', v)
    },
    test2() {
      console.log('test2')
      // 创建一个路径对象
      // const path = new paper.Path()

      // // 将起始点移动到画布的左侧中央位置
      // path.moveTo(new paper.Point(0, this.HEIGHT / 2))

      // // 添加三个控制点来创建一个贝塞尔曲线
      // path.cubicCurveTo(
      //   new paper.Point(100, 0),
      //   new paper.Point(300, this.HEIGHT),
      //   new paper.Point(this.WIDTH - 50, this.HEIGHT / 2 - 50)
      // )

      // // 设置曲线的颜色和宽度
      // path.strokeColor = 'red'
      // path.strokeWidth = 4

      // // 将绘制的曲线显示在画布上
      // this.paper.view.draw()
      const rect = new paper.Path.Rectangle(new paper.Rectangle(50, 50, 200, 100))
      rect.strokeColor = 'green'
      rect.strokeWidth = 1
      rect.shadowColor = new paper.Color(1, 1, 1, 1)
      rect.shadowColor = 'white'
      rect.shadowBlur = 3
      // paper.view.draw()
    },
    test() {
      // const center = new paper.Path.Circle({
      //   center: this.paper.view.center,
      //   radius: 200,
      //   strokeColor: 'white',
      //   strokeWidth: 1,
      //   shadowColor: 'white',
      //   fillColor: 'green',
      //   shadowOffset: new paper.Point(0.1),
      //   shadowBlur: 200
      // })
      const gradient = new paper.Gradient({
        stops: ['yellow', 'red', 'blue']
        // radial: true
      })
      const rec = new paper.Path.Rectangle({
        center: this.paper.view.center,
        size: [300, 300],
        strokeColor: 'white',
        strokeWidth: 3,
        shadowBlur: 10,
        shadowColor: 'white'
      })
    },
    // 初版简单粗暴，就一条直线，视图下方处
    drawGround() {

    },
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    getRandomPoint() {
      return new paper.Point(Math.random() * this.WIDTH, Math.random() * this.HEIGHT)
    },
    onFrame() {
    },
    onMouseDown(e) {
    },
    onMouseDrag(e) {
    },
    onMouseMove(e) {
    },
    onMouseUp(e) {
    },
    onKeyDown(e) {
      // 方向键控制role，何时触发视图的变幻？
      // if (e.key === 'a') {
      //   const currentCenter = this.currentProject.view.center
      //   const newCenter = currentCenter.add(new paper.Point(-50, 0))
      //   this.currentProject.view.setCenter(newCenter)
      //   console.log('left>>>')
      // }
      // if (e.key === 'd') {
      //   console.log('right>>>')
      //   const currentCenter = this.currentProject.view.center
      //   const newCenter = currentCenter.add(new paper.Point(50, 0))
      //   this.currentProject.view.setCenter(newCenter)
      // }
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
      // this.paper.view.setCenter(0)

      console.log('初始化世界!!!')
    }
  }
}
</script>
<style scoped lang="scss">
.gameWorld-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
