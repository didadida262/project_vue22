<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: Hhvcg
 * @Description:
 测量框
-->
<template>
  <el-tooltip
    class="item"
    effect="dark"
    :content="toolName"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'linepoly' }]"
     @click="handleClickTool"
     >

     <svg  width="16" height="16" fill="currentColor" t="1687250729863" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2207">
      <path d="M187.733333 1024h-170.666666c-10.24 0-17.066667-6.826667-17.066667-17.066667v-170.666666c0-10.24 6.826667-17.066667 17.066667-17.066667h170.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v170.666666c0 10.24-6.826667 17.066667-17.066667 17.066667zM34.133333 989.866667h136.533334v-136.533334H34.133333v136.533334zM1006.933333 204.8h-170.666666c-10.24 0-17.066667-6.826667-17.066667-17.066667v-170.666666c0-10.24 6.826667-17.066667 17.066667-17.066667h170.666666c10.24 0 17.066667 6.826667 17.066667 17.066667v170.666666c0 10.24-6.826667 17.066667-17.066667 17.066667zM853.333333 170.666667h136.533334V34.133333h-136.533334v136.533334z" fill="" p-id="2208"></path><path d="M187.733333 853.333333c-3.413333 0-10.24 0-13.653333-3.413333-6.826667-6.826667-6.826667-17.066667 0-23.893333l648.533333-648.533334c6.826667-6.826667 17.066667-6.826667 23.893334 0s6.826667 17.066667 0 23.893334l-648.533334 648.533333c0 3.413333-6.826667 3.413333-10.24 3.413333z" p-id="2209">
      </path>
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
  name: 'lineVersionTwoTool',
  mixins: [tools],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: 'linepoly',
      toolName: '多边线段',
      cursor: 'copy',
      polygonPath: null,
      resp: [],
      pathOptions: {
        strokeColor: 'rgb(89, 195, 225)',
        strokeWidth: 1,
        selected: true
      }
    }
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'linepoly') {
        this.setKeyDownListener()
      }
    }

  },
  mounted() {
    this.paper = paper
  },
  methods: {
    createPolygon() {
      this.polygonPath = new paper.Path(this.pathOptions)
    },

    onMouseUp(e) {
    },
    onMouseDown(e) {
      const point = e.point
      if (this.polygonPath == null) {
        this.createPolygon()
      }
      this.polygonPath.add(point)
      this.polygonPath.add(point)
    },
    onMouseDrag(e) {
    },
    updateRect() {
      if (this.rect) {
        this.rect.remove()
        this.lenMetr.remove()
      }
      const len = this.polygonPath.segments.length
      const p1 = this.polygonPath.segments[len - 2].point
      const p2 = this.polygonPath.segments[len - 1].point
      const vector = p2.subtract(p1)
      const middle = p1.add(vector.normalize(vector.length / 2))
      this.lenMetr = new paper.PointText({
        point: middle,
        content: vector.length.toFixed(2) + 'px',
        color: 'red'
      })
      this.rect = new paper.Path.Rectangle({
        position: middle,
        size: [vector.length, 10],
        fillColor: 'red',
        opacity: 0.5
      })
      this.rect.rotate(vector.angle)
      // this.rect = new paper.Path.Rectangle({
      //   center: center,
      //   size: [100, 100],
      //   fillColor: 'red',
      //   opacity: 0.5
      // })
    },
    onMouseMove(e) {
      const point = e.point
      if (!this.polygonPath || !this.polygonPath.segments.length) return
      this.removeLastPoint()
      this.polygonPath.add(point)
      this.updateRect()
    },
    removeLastPoint() {
      this.polygonPath.removeSegment(this.polygonPath.segments.length - 1)
    },
    handleModifyDefectDialogKeyDown(e) {
      e.stopPropagation()
      if (e.keyCode === 13) {
        this.completeLine()
      }
    },
    removePolygonPath() {
      if (this.polygonPath) {
        this.polygonPath.remove()
        this.polygonPath = null
      }
    },
    completeLine() {
      this.removeLastPoint()
      this.resp.push(this.polygonPath.clone())
      this.removePolygonPath()
    },
    setKeyDownListener() {
      window.addEventListener(
        'keydown',
        (this.handleModifyDefectDialogKeyDown = this.handleModifyDefectDialogKeyDown.bind(this)),
        {
          capture: true
        }
      )
    }
  },
  created() {
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleModifyDefectDialogKeyDown)
  }
}
</script>

<style lang="scss" scoped>

</style>
