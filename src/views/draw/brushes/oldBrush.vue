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
     :class="[{ 'is-active': selected === 'old_brush' }, 'icon', 'el-icon-brush']"
     @click="changeBrush"
     >
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from "paper";

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
      lastPoint: null,
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
        this.lastPoint = _point
      }  

    },     
    init() {
      // this.log('初始化brush--->')
      this.view = this.$parent.paper.view
      console.log('this.view--->',this.view)
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
      this.lastPoint = null
    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        strokeColor: this.brush.color
      })
      this.draw()
      this.lastPoint = e.point
    },
    draw() {
      this.view.requestUpdate = () => {
        const temp = this.selection.unite(this.brush.path)
        this.selection.remove()
        this.selection = temp
      }
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
    onMouseDrag(e) {
      console.log('drag--->',e.point)
      this.moveBrush(e)
      console.log('drag')
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
      this.lastPoint = e.point
      console.log(this.lastPoint)
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
  },
};
</script>

<style lang="scss" scoped>

</style>
