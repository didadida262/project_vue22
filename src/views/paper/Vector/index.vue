<!--
 * @Author: Hhvcg
 * @Date: 2022-11-17 15:01:35
 * @LastEditors: -_-
 * @Description: 测试向量
-->

<template>
  <div class="vector">
    <div class="vector-text">
      <commonTemplate title="vector" />
    </div>
    <div class="vector-container flex-cc">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'vector',
  components: {
    commonTemplate
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  data() {
    return {
      title: 'vector',
      // 存储画布容器宽高
      WIDTH: null,
      HEIGHT: null,
      vectorStart: null,
      vectorPrevious: null,
      values: {
        fixLength: false,
        fixAngle: false,
        showCircle: false,
        showAngleLength: true,
        showCoordinates: false
      },
      vector: null,
      vectorItem: null,
      items: null,
      dashedItems: null

    }
  },
  created() {
    this.paper = null
  },
  mounted() {
    this.initWorld()
    this.draw()
    console.log('paperScope--->', this.paper)
  },
  beforeDestroy() {
    this.currentProject.remove()
  },

  methods: {
    drawVector(drag) {
      // if (this.items) {
      //   for (let i = 0, l = this.items.length; i < l; i++) {
      //     this.items[i].remove()
      //   }
      // }
      // if (this.vectorItem) { this.vectorItem.remove() }
      // this.items = []
      // const arrowVector = this.vector.normalize(10)
      // const end = this.vectorStart.add(this.vector)
      // this.vectorItem = new paper.Group([
      //   new paper.Path([this.vectorStart, end]),
      //   new paper.Path([
      //     end + arrowVector.rotate(135),
      //     end,
      //     end + arrowVector.rotate(-135)
      //   ])
      // ])
      // this.vectorItem.strokeWidth = 0.75
      // this.vectorItem.strokeColor = '#e4141b'
      // Display:
      // dashedItems = []
      // // Draw Circle
      // if (values.showCircle) {
      //   dashedItems.push(new Path.Circle({
      //     center: vectorStart,
      //     radius: vector.length
      //   }))
      // }
      // // Draw Labels
      // if (values.showAngleLength) {
      //   drawAngle(vectorStart, vector, !drag)
      //   if (!drag) { drawLength(vectorStart, end, vector.angle < 0 ? -1 : 1, true) }
      // }
      // var quadrant = vector.quadrant
      // if (values.showCoordinates && !drag) {
      //   drawLength(vectorStart, vectorStart + [vector.x, 0],
      //     [1, 3].indexOf(quadrant) != -1 ? -1 : 1, true, vector.x, 'x: ')
      //   drawLength(vectorStart, vectorStart + [0, vector.y],
      //     [1, 3].indexOf(quadrant) != -1 ? 1 : -1, true, vector.y, 'y: ')
      // }
      // for (var i = 0, l = dashedItems.length; i < l; i++) {
      //   var item = dashedItems[i]
      //   item.strokeColor = 'black'
      //   item.dashArray = [1, 2]
      //   items.push(item)
      // }
      // // Update palette
      // values.x = vector.x
      // values.y = vector.y
      // values.length = vector.length
      // values.angle = vector.angle
    },
    processVector(event, drag) {
      // let vector = event.point.subtract(this.vectorStart)
      // if (this.vectorPrevious) {
      //   if (this.values.fixLength && this.values.fixAngle) {
      //     vector = this.vectorPrevious
      //   } else if (this.values.fixLength) {
      //     vector.length = this.vectorPrevious.length
      //   } else if (this.values.fixAngle) {
      //     vector = vector.project(this.vectorPrevious)
      //   }
      // }
      // this.drawVector(drag)
    },
    draw() {
      this.vectorStart = new paper.Point(0)
      const end = new paper.Point(100)
      this.vector = end.subtract(this.vectorStart)
      this.arrowVector = this.vector.normalize(10)
      console.log('this.arrowVector>>', this.arrowVector)
      this.vectorItem = new paper.Group([
        new paper.Path([this.vectorStart, end]),
        new paper.Path([
          end.add(this.arrowVector.rotate(135)),
          end,
          end.add(this.arrowVector.rotate(-135))
        ])
      ])
      this.vectorItem.strokeWidth = 0.75
      this.vectorItem.strokeColor = 'white'
      new paper.Path.Circle({
        center: this.vectorStart,
        radius: 10,
        fillColor: 'red',
        opacity: 0.5
      })
      new paper.Path.Circle({
        center: end,
        radius: 10,
        fillColor: 'green',
        opacity: 0.5
      })
      console.log('p>>', this.paper)
      console.log('vectorItem>>', this.vectorItem)
    },
    initWorld() {
      // 获取
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.title
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
      this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
      this.paper.view.setCenter(0, 0)
    },
    onMouseDown(e) {
      // const end = this.vectorStart.add(this.vector)
      // let create = false
      // if (e.modifiers.shift && this.vectorItem) {
      //   this.vectorStart = end
      //   create = true
      // } else if (this.vector && (e.modifiers.option ||
      // end && end.getDistance(e.point) < 10)) {
      //   create = false
      // } else {
      //   this.vectorStart = e.point
      // }
      // if (create) {
      //   this.dashItem = this.vectorItem
      //   this.vectorItem = null
      // }
      // this.processVector(e, true)
      // //	document.redraw();
    },
    onMouseDrag(e) {
      // if (!e.modifiers.shift && this.values.fixLength && this.values.fixAngle) { this.vectorStart = e.point }
      // this.processVector(event, event.modifiers.shift)
    },

    onFrame(e) {
    }

  }
}
</script>

<style lang="scss" scoped>
.vector {
  width: 100%;
  height: calc(100vh - 70px);
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  &-text {
    width: 100%;
    height: 72px;
    margin-bottom: 10px;
  }
  &-container {
    height: calc(100% - 100px);
    width: 100%;
    background: black;
    .main_canvas {
      width: 100%;
      height: 100%;
    }
  }
}
</style>
