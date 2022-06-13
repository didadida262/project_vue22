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
      lastPos: null,
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
      if (this.selected === 'old_brush') {
        this.init()
      } else {
        this.tool = null
      }
    },
  },
  mounted() {},
  methods: {
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
      this.$emit('changeBrush', 'old_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
      this.draw()
      this.lastPos.remove()
      this.lastPos = null
    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        strokeColor: this.brush.color
      })
      this.draw()
      this.lastPos = this.brush.path.clone()
    },
    draw() {
      requestAnimationFrame(() => {
        this.selection.unite(this.brush.path)
      })
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
      this.moveBrush(e)
      console.log('drag')
      if (e.point.getDistance(this.lastPos.position) >= this.brush.radius * 2) {
        console.log('断画！')
        const vector = e.point.subtract(this.lastPos.position).normalize()
        for (let i = 1; i < e.point.getDistance(this.lastPos.position);) {
          let temp = new paper.Path.Circle({
            center: this.lastPos.position.add(vector * i),
            radius: this.brush.radius
          })
          this.selection.unite(temp)
          temp.remove()
          temp = null
          i = i + this.brush.radius * 2 - 1
        }
      }
      this.draw()
      this.lastPos = this.brush.path.clone()
    },
    createBrush(e) {
      this.brush.path = new paper.Path.Circle({
        center: e.point,
        strokeColor: this.brush.color,
        radius: this.brush.radius,
        strokeWidth: this.brush.radius / 2
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
