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
        length: this.brush.radius
      });
      console.log('vector',vector)

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
      // if (this.selection.segments.length === 2) {
        
      // }
      this.selection.closed = true
      console.log('this.selection',this.selection)
      console.log(this.selection.segments[0].point.subtract(this.selection.segments[1].point))
      // this.selection.simplify(10)
    },
    drawHead(e) {
      // console.log('head点数据---》', e)
      const vector = new paper.Point({
        angle: 0,
        length: this.brush.radius
      })
      // const vector = e.point.subtract(e.lastPoint)
      const step = vector.normalize().multiply(this.brush.radius)
      step.angle += 90      
          const top = e.point.add(step)
      const bottom = e.point.subtract(step)
      // const top = e.point.add(vector.rotate(-90))
      // const bottom = e.point.add(vector.rotate(90))
      // const t1 = new paper.PointText({
      //   point: top,
      //   content: 'top',
      //   fontSize: 10
      // })
      // const t2 = new paper.PointText({
      //   point: bottom,
      //   content: 'bottom',
      //   fontSize: 10
      // })
      
      // this.selection = new paper.Path({
      //   segments: [
      //     [top, vector, vector.rotate(-180)],
      //     [bottom, vector.rotate(-180), vector],

      //   ],
      //   strokeColor: 'black',
      //   fullySelected: true
      // })            
      // const v = new paper.Point({
      //   angle: top.subtract(bottom).angle,
      //   length: this.brush.radius
      // });      
      // this.selection = new paper.Path({
      //   segments: [
      //     // [top, v.rotate(90), v.rotate(-90)],
      //     // [bottom, v.rotate(-90), v.rotate(90)]
      //     [top, null, null],
      //     [bottom, null, null]
      //   ],
      //   fillColor: "black"
      // })      

            this.selection.add(bottom)
      this.selection.insert(0, top)
    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        strokeColor: 'black'
      })

      this.drawHead(e)
    },
    onMouseDrag(e) {
      // 第一次出发
      if (this.selection.segments.length === 2) {
        const x = this.selection.segments[0].point
        const y = this.selection.segments[1].point
        const t = y.add(x.subtract(y).divide(2))
        const vector = e.point.subtract(t)
        const step = vector.normalize().multiply(this.brush.radius)
        step.angle += 90

        const top = t.add(step)
        const bottom = t.subtract(step)
        this.selection.remove()
        this.selection = new paper.Path({
        strokeColor: 'black'
          
        })
        this.selection.add(top)
        this.selection.insert(0, bottom)   
      }
      // console.log('drag--->',e)
      const vector = e.point.subtract(e.lastPoint)
      const step = vector.normalize().multiply(this.brush.radius)
      step.angle += 90

      const top = e.point.add(step)
      const bottom = e.point.subtract(step)
      this.selection.add(top)
      this.selection.insert(0, bottom)
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
