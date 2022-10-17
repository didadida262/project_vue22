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
    content="老笔刷"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'old_brush' }]"
     @click="changeBrush"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-yin-yang" viewBox="0 0 16 16">
      <path d="M9.167 4.5a1.167 1.167 0 1 1-2.334 0 1.167 1.167 0 0 1 2.334 0Z"/>
      <path d="M8 0a8 8 0 1 0 0 16A8 8 0 0 0 8 0ZM1 8a7 7 0 0 1 7-7 3.5 3.5 0 1 1 0 7 3.5 3.5 0 1 0 0 7 7 7 0 0 1-7-7Zm7 4.667a1.167 1.167 0 1 1 0-2.334 1.167 1.167 0 0 1 0 2.334Z"/>
    </svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from "paper";
import { getRandomColor } from '@/utils/weapons.js'

export default {
  name: "oldBrush",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      brush: {
        radius: 10,
        path: null,
        color: 'black'
      },
      selection: null,
      view: null,
      tool: null,
      handle: null,
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'old_brush') {
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
      }  

    },     
    init() {
      console.log('老笔刷----')
      // this.log('初始化brush--->')
      this.view = this.$parent.paper.view
      this.tool = this.$parent.tool
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown    
      this.tool.onMouseDrag = this.onMouseDrag    
      this.tool.onMouseMove = this.onMouseMove    
      this.tool.onMouseUp = this.onMouseUp
      
    },    
    changeBrush() {
      this.$emit('changeBrush', 'old_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
      this.draw()
    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        strokeColor: getRandomColor()
      })
      this.draw()
    },
    // 将当前brush的path合并到selection
    draw() {
      this.selection.unite(this.brush.path)
    },
    onMouseMove(e) {
      if (this.brush.path === null) {
        this.createBrush(e)
      }
      this.moveBrush(e)
    },
    moveBrush(e) {
      this.brush.path.position = e.point
    },
    onMouseDrag(e) {
      this.moveBrush(e)
      // this.addBrokenPath(e.point)
      // if (e.point.getDistance(this.lastPoint) >= this.brush.radius * 2) {
      //   console.log('断画！')
      //   const vector = e.point.subtract(this.lastPoint).normalize()
      //   for (let i = 1; i < e.point.getDistance(this.lastPoint);) {
      //     let temp = new paper.Path.Circle({
      //       center: this.lastPoint.add(vector * i),
      //       radius: this.brush.radius
      //     })
      //     this.selection.unite(temp)
      //     temp.remove()
      //     temp = null
      //     i = i + this.brush.radius
      //   }
      // }
      this.draw()
    },
    createBrush(e) {
      this.brush.path = new paper.Path.Circle({
        center: e.point,
        strokeColor: getRandomColor(),
        radius: this.brush.radius,
        strokeWidth: 3
      })
    }
  },

  created() {
  },
};
</script>

<style lang="scss" scoped>

</style>
