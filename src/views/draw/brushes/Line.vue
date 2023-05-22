
<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: Hhvcg
 * @Description:
-->
<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="line_brush"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'line_brush' }]"
     @click="handleClickTool"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-slash-lg" viewBox="0 0 16 16">
      <path fill-rule="evenodd" d="M13.854 2.146a.5.5 0 0 1 0 .708l-11 11a.5.5 0 0 1-.708-.708l11-11a.5.5 0 0 1 .708 0Z"/>
    </svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons.js'
import tools from './tools'
// 色调         hue: Math.random() * 360,
// 饱和度    saturation: 1,
// 亮度       brightness: 1
export default {
  name: 'line_brush',
  mixins: [tools],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: 'line_brush',
      path: null,
      pathOptions: {
        strokeColor: getRandomColor(),
        strokeWidth: 1,
        lineWidth: 40
      },
      firstPoint: null,
      lastPoint: null,
      resp: [],

      selection: null,
      first: null,
      colors: []
    }
  },
  computed: {},
  watch: {

  },
  mounted() {},
  methods: {
    removeLastPoint() {
      this.path.removeSegment(this.path.segments.length - 1)
    },
    onMouseMove(event) {
      console.log('onMouseMove>>>')
      console.log('this.path>>>', this.path)
      if (!this.path) return
      if (this.path.segments.length > 1) {
        this.removeLastPoint()
      }
      this.lastPoint = event.point
      this.path.add(this.lastPoint)
      this.path.closePath()
    },
    onMouseDown(e) {
      if (!this.firstPoint) {
        this.createLine(e.point)
      } else {
        this.completeLine(e.point)
      }
    },
    createLine(point) {
      this.firstPoint = point
      this.path = new paper.Path(this.pathOptions)
      this.path.add(this.firstPoint)
    },
    completeLine(point) {
      this.lastPoint = point
      this.path.add(this.lastPoint)
      this.path.closePath()
      this.resp.push(this.path.clone())
      this.path.removeSegments()
      this.removeLine()
    },
    removeLine() {
      this.path.remove()
      this.path = null
      this.firstPoint = null
      this.lastPoint = null
    },

    onMouseDrag(e) {

    },
    removeSelection() {

    }

  },

  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
