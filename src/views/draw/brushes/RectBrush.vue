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
    content="rect_brush"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'rect_brush' }]"
     @click="changeBrush"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-textarea-resize" viewBox="0 0 16 16">
      <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z"/>
    </svg>
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
  name: "rect_brush",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selection: null,
      first: null,
      myPath: null,
      resp: []
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'rect_brush') {
        this.init()
      } else {
        this.tool = null
      }
    },
  },
  mounted() {},
  methods: {
    init() {
      // this.log('初始化brush--->')
      this.tool = this.$parent.tool
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown    
      this.tool.onMouseDrag = this.onMouseDrag    
      this.tool.onMouseMove = this.onMouseMove    
      this.tool.onMouseUp = this.onMouseUp
    },    
    changeBrush() {
      this.$emit('changeBrush', 'rect_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
      this.selection.selected = false
      this.selection.fillColor = getRandomColor()
      this.resp.push(this.selection.clone())
      const left = this.selection.curves[0].point1
      const right = this.selection.curves[0].point2
      let t1 = new paper.PointText({
        content: 'left',
        point: left,
        fontSize: 5
      });
      let t2 = new paper.PointText({
        content: 'right',
        point: right,
        fontSize: 5
      });      
      console.log('/////',this.selection)
      this.removeSelection()
    },

    onMouseDown(e) {
      this.first = e.point

    }, 
    onMouseDrag(e) {
      this.removeSelection()
      const width = e.point.x - this.first.x
      const height = e.point.y - this.first.y
      this.selection = new paper.Path.Rectangle(this.first.x,this.first.y, width, height)
      this.selection.selected = true
    },
    // 若path存在，清除第二个点，加上当前点
    onMouseMove(e) {

    },    
    removeSelection() {
      if (this.selection) {
        this.selection.remove()
        this.selection = null
      }
    },

  },

  created() {
  },
};
</script>

<style lang="scss" scoped>

</style>
