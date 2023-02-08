<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="kill_brush"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'kill_brush' }]"
     @click="changeBrush"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-playstation" viewBox="0 0 16 16">
      <path d="M15.858 11.451c-.313.395-1.079.676-1.079.676l-5.696 2.046v-1.509l4.192-1.493c.476-.17.549-.412.162-.538-.386-.127-1.085-.09-1.56.08l-2.794.984v-1.566l.161-.054s.807-.286 1.942-.412c1.135-.125 2.525.017 3.616.43 1.23.39 1.368.962 1.056 1.356ZM9.625 8.883v-3.86c0-.453-.083-.87-.508-.988-.326-.105-.528.198-.528.65v9.664l-2.606-.827V2c1.108.206 2.722.692 3.59.985 2.207.757 2.955 1.7 2.955 3.825 0 2.071-1.278 2.856-2.903 2.072Zm-8.424 3.625C-.061 12.15-.271 11.41.304 10.984c.532-.394 1.436-.69 1.436-.69l3.737-1.33v1.515l-2.69.963c-.474.17-.547.411-.161.538.386.126 1.085.09 1.56-.08l1.29-.469v1.356l-.257.043a8.454 8.454 0 0 1-4.018-.323Z"/>
    </svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons.js'

// 色调         hue: Math.random() * 360,
// 饱和度    saturation: 1,
// 亮度       brightness: 1
export default {
  name: 'killBrush',
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      selectionsResp: [],
      lastPoint: null,
      brush: {
        path: null,
        color: 'black',
        pathOptions: {
          radius: 10,
          btype: 'circle' // circle ||  rectangle
          // btype: "rectangle"  // circle ||  rectangle,
        }
      },
      selection: null,
      tool: null,
      handle: null
    }
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'kill_brush') {
        this.init()
      }
    }
  },
  mounted() {},
  methods: {
    addBrokenPath(_point) {
      if (this.selection && _point.getDistance(this.lastPoint) >= this.brush.pathOptions.radius * 2) {
        const vector = _point.subtract(this.lastPoint)
        for (let i = 1; i < vector.length;) {
          const newPoint = this.lastPoint.add(vector.normalize().multiply(i))
          let temp = null
          // if (this.brush.pathOptions.btype==='circle'){
          temp = new paper.Path.Circle(newPoint, new paper.Size(this.brush.pathOptions.radius))
          // } else {
          //   temp = new paper.Path.Rectangle({
          //     center: newPoint,
          //     size: new paper.Size(this.brush.pathOptions.radius * 2)
          //   })
          // }

          const newSelection = this.selection.unite(temp)
          temp = null
          this.selection.remove()
          this.selection = newSelection
          i = i + this.brush.pathOptions.radius / 2
        }
        this.lastPoint = _point
      }
    },
    init() {
      // this.log('初始化brush--->')
      this.tool = this.$parent.tool
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown
      this.tool.onMouseDrag = this.onMouseDrag
      this.tool.onMouseMove = this.onMouseMove
      this.tool.onMouseUp = this.onMouseUp
      this.tool.fixedDistance = this.brush.pathOptions.radius / 2

      const point1 = new paper.Point(100, 0)
      const point2 = new paper.Point(100, this.brush.pathOptions.radius * 2)
      const vector = new paper.Point({
        angle: point1.subtract(point2).angle,
        length: Math.sqrt(this.brush.pathOptions.radius * this.brush.pathOptions.radius)
      })

      const path = new paper.Path({
        segments: [
          [point1, vector.rotate(90).multiply(1.5), vector.rotate(-90).multiply(1.5)],
          [point2, vector.rotate(-90).multiply(1.5), vector.rotate(90).multiply(1.5)]
        ],
        fullySelected: true
      })
      path.closed = true
      const text1 = new paper.PointText({
        point: point1.subtract(10),
        content: 'point1',
        fontSize: 10
      })
      const text2 = new paper.PointText({
        point: point2.add(10),
        content: 'point2',
        fontSize: 10
      })
    },
    changeBrush() {
      this.$emit('changeBrush', 'kill_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
      // const temp = this.selection.unite(this.brush.path)
      const newSelection = this.selection.unite(this.brush.path)
      this.selection.remove()
      this.selection = newSelection
      this.selectionsResp.push(this.selection.clone())
      this.removeSelection()

      // this.selection = temp.clone()
      // this.selection.closed = true
    },
    // 返回点在向量方向的上下顶点,长度基于brush.pathOptions.radius
    getTopAndBot(point, vector) {
      const top = point.add(vector.normalize().multiply(this.brush.pathOptions.radius).rotate(-90))
      const bot = point.add(vector.normalize().multiply(this.brush.pathOptions.radius).rotate(90))
      return [top, bot]
    },
    drawHead(e) {
      this.selection = new paper.Path({
        strokeColor: this.brush.color
      })
      const vector = new paper.Point({
        angle: 0,
        length: this.brush.pathOptions.radius
      })
      const res = this.getTopAndBot(e.point, vector)
      this.selection.add(res[1])
      this.selection.insert(0, res[0])
    },
    getDragPoints(e) {
      const vector = e.point.subtract(e.lastPoint)
      const step = vector.normalize().multiply(this.brush.pathOptions.radius)
      step.angle += 90
      const bottom = e.point.add(step)
      const top = e.point.subtract(step)
      return [top, bottom]
    },
    onMouseDown(e) {
      this.drawHead(e)
    },
    removeSelection() {
      if (this.selection) {
        this.selection.remove()
        this.selection = null
      }
    },
    // 给定两点，获取其中点
    getCenter(point1, point2) {
      return point2.add(point1.subtract(point2).divide(2))
    },

    // 捕捉第一个触发drag的点,修正开始两点的向量信息
    modifyHead(e) {
      // 拿到之前的点击点
      const t = this.getCenter(this.selection.segments[0].point, this.selection.segments[1].point)
      // vector为当前drag点到第一个点的向量
      const vector = e.point.subtract(t)
      const ress = this.getTopAndBot(t.subtract(vector.normalize().multiply(this.brush.pathOptions.radius)), vector)
      const res = this.getTopAndBot(t, vector)
      this.removeSelection()

      // 打点
      // const v = new paper.Point({
      //   angle: res[0].subtract(res[1]).angle,
      //   length: Math.sqrt(this.brush.pathOptions.radius * this.brush.pathOptions.radius * 2)
      // });
      vector.length = Math.sqrt(this.brush.pathOptions.radius * this.brush.pathOptions.radius * 2)
      if (this.brush.pathOptions.btype === 'circle') {
        this.selection = new paper.Path({
          segments: [
            [res[0], vector, vector.rotate(-180)],
            [res[1], vector.rotate(-180), vector]
          ],
          fillColor: getRandomColor()
        })
        // 如果是矩形
      } else {
        this.selection = new paper.Path({
          segments: [
            [ress[0], vector.normalize(), vector.rotate(90).normalize().multiply(this.brush.pathOptions.radius)],
            [ress[1], vector.rotate(-90).normalize().multiply(this.brush.pathOptions.radius), vector]
          ],
          fillColor: getRandomColor()
        })
      }
    },
    onMouseDrag(e) {
      // 第一次出发
      if (this.selection && this.selection.segments.length === 2) {
        this.modifyHead(e)
      }
      const res = this.getTopAndBot(e.point, e.point.subtract(e.lastPoint))
      this.selection.add(res[1])
      this.selection.insert(0, res[0])
      // }
      this.moveBrush(e)
    },
    onMouseMove(e) {
      if (this.brush.path === null) {
        this.createBrush(e)
      }
      this.moveBrush(e)
      // this.brush.path.bringToFront();
    },
    moveBrush(e) {
      this.brush.path.position = e.point
    },
    createBrush(e) {
      this.brush.path = new paper.Path.Circle({
        center: e.point,
        strokeColor: this.brush.color,
        radius: this.brush.pathOptions.radius
      })
    }
  },

  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
