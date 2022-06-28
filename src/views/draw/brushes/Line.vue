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
    content="line"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'line' }]"
     @click="changeBrush"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-lg" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
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
  name: "Line_brush",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      selection: null,
      finished: false
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'line') {
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
      this.$emit('changeBrush', 'line')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
        // this.selection.segments.pop()
        // this.selection.add(e.point)


      // const temp = this.selection.unite(this.brush.path)
        // this.removeSelection()

      // this.selection = temp.clone()
      // this.selection.closed = true
    },

    onMouseDown(e) {
      if (this.selection && this.selection.segments.length === 2) {
        this.selection = null
        this.selection = new paper.Path({
          strokeColor: 'black'
        })
      return
      }
      console.log(1)
      this.selection = new paper.Path({
        strokeColor: 'black'
      })
      this.selection.add(e.point)
    }, 
    onMouseDrag(e) {
    },
    // 若path存在，清除第二个点，加上当前点
    onMouseMove(e) {
      if(this.selection) {
        if (this.selection.segments.length === 2) {
          this.selection.segments.pop()
        } else if (this.selection.segments.length === 1) {
        this.selection.add(e.point)
        }
      }
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
