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
    content="broom_brush"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'broom_brush' }, 'icon', 'el-icon-brush']"
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
  name: "broomBrush",
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
      if (this.selected === 'broom_brush') {
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
    },    
    changeBrush() {
      this.$emit('changeBrush', 'broom_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
      this.selection.closed = true
      this.selection.smooth()      
    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        fillColor: getRandomColor()
      })
      this.selection.add(e.point)
    },
    onMouseDrag(e) {
      console.log('drag--->',e.point)
      this.moveBrush(e)
      const step = e.delta.divide(2)
      step.angle += 90

      const top = e.middlePoint.add(step)
      const bottom = e.middlePoint.subtract(step)
      this.selection.add(top)
      this.selection.insert(0, bottom)
      // }
      this.selection.smooth()
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
        strokeWidth: 3
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
