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
     :class="[{ 'is-active': selected === 'rect_brush' }, 'icon', 'el-icon-brush']"
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
      this.log('初始化brush--->')
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
