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
    content="select_tool"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'select_tool' }]"
     @click="handleClickTool"
     >
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 1024 1024">
      <path d="M895.783519 383.907222a125.409693 125.409693 0 0 0-62.704846 17.062544A127.969074 127.969074 0 0 0 725.158087 341.250864a125.409693 125.409693 0 0 0-62.704847 17.062544A127.969074 127.969074 0 0 0 511.876297 306.272651V127.969074a127.969074 127.969074 0 0 0-255.938149 0v409.074474l-28.57976-29.006324A131.808146 131.808146 0 0 0 133.087837 469.219939 133.087837 133.087837 0 0 0 0 602.307776 236.316224 236.316224 0 0 0 69.1033 767.814445l151.856635 151.430071 39.670413 79.340826A42.656358 42.656358 0 0 0 298.594506 1023.752593a39.670413 39.670413 0 0 0 19.195361-4.692199 42.656358 42.656358 0 0 0 18.768798-57.15952l-42.656358-85.312716a46.921994 46.921994 0 0 0-7.678145-11.090653L127.969074 708.948671a149.297253 149.297253 0 0 1-42.656358-106.640895 47.775121 47.775121 0 0 1 81.473644-33.698523l101.522132 101.522132a42.656358 42.656358 0 0 0 46.49543 8.957835A42.656358 42.656358 0 0 0 341.250864 639.845371V127.969074a42.656358 42.656358 0 0 1 85.312716 0v469.219939a42.656358 42.656358 0 0 0 85.312717 0v-170.625433a42.656358 42.656358 0 0 1 85.312716 0v170.625433a42.656358 42.656358 0 0 0 85.312716 0v-127.969074a42.656358 42.656358 0 0 1 85.312716 0v127.969074a42.656358 42.656358 0 0 0 85.312716 0v-85.312716a42.656358 42.656358 0 0 1 85.312716 0v263.189729a246.980313 246.980313 0 0 1-72.942372 175.744195 42.656358 42.656358 0 0 0 0 60.572028 42.656358 42.656358 0 0 0 60.572028 0A331.866466 331.866466 0 0 0 1023.752593 775.066026V511.876297a127.969074 127.969074 0 0 0-127.969074-127.969075z" p-id="3110">
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
  name: 'select_tool',
  mixins: [tools],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: 'select_tool',
      selection: null,
      first: null,
      myPath: null,
      resp: [],
      colors: [],
      hitOptions: {
        segments: true,
        // stroke: true,
        // fill: true,
        tolerance: 5
        // match: hit => {
        //   return !hit.item.hasOwnProperty('indicator') && !hit.item.parent.hasOwnProperty('ignore')
        // }
      },
      cursorPoint: null
    }
  },
  computed: {},
  watch: {

  },
  mounted() {
    this.paper = paper
  },
  methods: {
    // 针对给定path，color，上梯度色
    colorFul(item) {
      console.log('item---->', item.bounds)
      this.gradient = new paper.Gradient(this.colors, false)
      this.radius = Math.max(item.bounds.width, item.bounds.height) * 0.75
      item.fillColor = new paper.Color(this.gradient, item.bounds.leftCenter, item.bounds.rightCenter.add(this.radius))
    },
    createColors() {
      for (let i = 0; i < 60; i++) {
        const brightness = 1 - (i / 60) * 1.5
        const hue = i / 60 * 4 * 360
        const color = {
          hue: hue,
          saturation: 1,
          brightness: brightness
        }
        this.colors.push(color)
      }
      console.log(this.colors)
    },
    onMouseUp(e) {
    },

    onMouseDown(e) {
      console.log('onMouseDown')
      this.initPoint = e.point
    },
    onMouseDrag(e) {
      console.log('onMouseDrag')
      if (this.hitResult) {
        this.removeCursorPoint()
        const segment = this.hitResult.segment
        const previous = segment.previous
        const next = segment.next
        if (segment.index === 1 || segment.index === 3) {
          previous.point = previous.point.add(e.delta.x, 0)
          next.point = next.point.add(0, e.delta.y)
        } else if (segment.index === 0 || segment.index === 2) {
          previous.point = previous.point.add(0, e.delta.y)
          next.point = next.point.add(e.delta.x, 0)
        }
        const newPoint = segment.point.add(e.delta)
        segment.point = newPoint
        this.drawCursorPoint(newPoint)
      } else {
        const delta = this.initPoint.subtract(e.point)
        this.paper.projects.forEach(pro => {
          const newCenter = pro.view.center.add(delta)
          pro.view.setCenter(newCenter)
        })
      }
    },
    removeCursorPoint() {
      if (this.cursorPoint) {
        this.cursorPoint.remove()
        this.cursorPoint = null
      }
    },
    drawCursorPoint(point) {
      console.log('绘制点>>>', point)
      this.cursorPoint = new paper.Path.Circle({
        center: point,
        radius: 5,
        strokeColor: 'black'
      })
      this.cursorPoint.name = 'circle'
    },
    handleHitResult(hitResult) {
      if (hitResult.type === 'fill') {
        console.warn('fill>>>')
        console.log('=============')
      } else if (hitResult.type === 'segment') {
        console.log('hitResult>>>', hitResult)
        console.log('segment>>>')
        console.log('=============')
        const item = hitResult.item
        this.hitResult = hitResult
        this.drawCursorPoint(hitResult.segment.location.point)
      }
    },
    onMouseMove(e) {
      this.removeCursorPoint()
      this.hitResult = null
      const currentProject = this.paper.project
      this.hitOptions.tolerance = 5 / currentProject.view.zoom
      const hitResult = currentProject.hitTest(e.point, this.hitOptions)
      if (hitResult) {
        this.handleHitResult(hitResult)
      }
    }

  },

  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
