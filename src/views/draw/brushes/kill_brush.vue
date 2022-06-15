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
     :class="[{ 'is-active': selected === 'kill_brush' }, 'icon', 'el-icon-brush']"
     @click="changeBrush"
     >
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from "paper";
import { getRandomColor } from '@/weapons'

// 色调         hue: Math.random() * 360,
// 饱和度    saturation: 1,
// 亮度       brightness: 1
export default {
  name: "killBrush",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lastPoint: null,
      brush: {
        radius: 10,
        path: null,
        color: 'black'
      },
      selection: null,
      tool: null,
      handle: null
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'kill_brush') {
        this.init()
      } else {
        this.tool = null
      }
    },
  },
  mounted() {},
  methods: {
    addBrokenPath(_point) {
      if (this.selection && _point.getDistance(this.lastPoint) >= this.brush.radius * 2) {
        const vector = _point.subtract(this.lastPoint)
        for (let i = 1; i < vector.length;) {
          let newPoint = this.lastPoint.add(vector.normalize().multiply(i))
          let temp = null
          // if (this.brush.pathOptions.btype==='circle'){
            temp = new paper.Path.Circle(newPoint, new paper.Size(this.brush.radius))
          // } else {
          //   temp = new paper.Path.Rectangle({
          //     center: newPoint,
          //     size: new paper.Size(this.brush.pathOptions.radius * 2) 
          //   })
          // }
          
          let newSelection = this.selection.unite(temp);
          temp = null
          this.selection.remove();
          this.selection = newSelection;
          i = i + this.brush.radius / 2
        }
        this.lastPoint = _point
      }  

    },     
    init() {
      this.log('初始化brush--->')
      this.tool = this.$parent.tool
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown    
      this.tool.onMouseDrag = this.onMouseDrag    
      this.tool.onMouseMove = this.onMouseMove    
      this.tool.onMouseUp = this.onMouseUp
      this.tool.fixedDistance = this.brush.radius / 2
      
      const point1 = new paper.Point(100, 0)
      const point2 = new paper.Point(100, this.brush.radius * 2)
      const vector = new paper.Point({
        angle: point1.subtract(point2).angle,
        length: Math.sqrt(this.brush.radius * this.brush.radius)
      });

      const path = new paper.Path({
        segments: [
          [point1, vector.rotate(90).multiply(1.5), vector.rotate(-90).multiply(1.5)],
          [point2, vector.rotate(-90).multiply(1.5), vector.rotate(90).multiply(1.5)]
        ],
        fullySelected: true
      });   
      path.closed = true
      console.log('path',path)
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
      const temp = this.selection.unite(this.brush.path)
      this.removePath(this.selection)

      this.selection = temp.clone()
      this.selection.closed = true
      console.log('this.selection',this.selection)
    },
    // 返回点在向量方向的上下顶点,长度基于brush.radius
    getTopAndBot(point, vector) {
      const top = point.add(vector.normalize().multiply(this.brush.radius).rotate(-90))
      const bot = point.add(vector.normalize().multiply(this.brush.radius).rotate(90))
      return [top, bot]
    },
    drawHead(e) {
      this.selection = new paper.Path({
        strokeColor: this.brush.color
      })      
      const vector = new paper.Point({
        angle: 0,
        length: this.brush.radius
      })      
      const res = this.getTopAndBot(e.point, vector)
      this.selection.add(res[1])
      this.selection.insert(0, res[0])      
    },
    onMouseDown(e) {
      this.drawHead(e)
    },
    removePath(item) {
      if (item) {
        item.remove()
        item = null
      }
    },
    getDragPoints(e) {
      const vector = e.point.subtract(e.lastPoint)
      const step = vector.normalize().multiply(this.brush.radius)
      step.angle += 90
      const bottom = e.point.add(step)
      const top = e.point.subtract(step)
      return [top, bottom]
    },
    // 捕捉第一个触发drag的点,修正开始两点的向量信息
    modifyHead(e) {
      // 拿到之前的点击点
      const x = this.selection.segments[0].point
      const y = this.selection.segments[1].point
      const t = y.add(x.subtract(y).divide(2))
      const vector = e.point.subtract(t)
      const res = this.getTopAndBot(t, vector)

      this.selection.remove()
      this.selection = null
      this.selection = new paper.Path({
        strokeColor: this.brush.radius
      })
      this.removePath(this.selection)

      // 打点
      const v = new paper.Point({
        angle: res[0].subtract(res[1]).angle,
        length: Math.sqrt(this.brush.radius * this.brush.radius)
      });      
      this.selection = new paper.Path({
        segments: [
          [res[0], v.rotate(90).multiply(1.5), v.rotate(-90).multiply(1.5)],
          [res[1], v.rotate(-90).multiply(1.5), v.rotate(90).multiply(1.5)]
        ],
        strokeColor: 'black',
      }) 
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
        radius: this.brush.radius,
      })
    }
  },

  created() {
    this.log("pencile---created");
  },
};
</script>

<style lang="scss" scoped>

</style>
