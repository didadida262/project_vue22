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
    content="测量工具"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'measuretool' }]"
     @click="handleClickTool"
     >
     <svg width="16" height="16" fill="currentColor" t="1686218864661" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3661">
      <path d="M413.583 452.419L363.1 503.368l27.576 27.576a35.548 35.548 0 0 0 50.484 0 35.548 35.548 0 0 0 0-50.483l-27.577-28.042z m-91.146 91.15l-50.483 50.484 27.576 27.576a35.548 35.548 0 0 0 50.483 0 35.548 35.548 0 0 0 0-50.483l-27.576-27.576z m-91.146 91.147L180.808 685.2l27.576 27.577a35.548 35.548 0 0 0 50.483 0 35.548 35.548 0 0 0 0-50.484l-27.576-27.576zM687.022 178.98l-50.483 50.483 27.576 27.576a35.548 35.548 0 0 0 50.483 0 35.548 35.548 0 0 0 0-50.483l-27.576-27.576zM504.73 361.272l-50.484 50.95 27.577 27.576a35.548 35.548 0 0 0 50.483 0 35.548 35.548 0 0 0 0-50.483l-27.576-28.043z" p-id="3662"></path><path d="M959.995 279.946L747.786 67.738a35.548 35.548 0 0 0-50.483 0L64.425 700.62a35.548 35.548 0 0 0 0 50.483l211.743 211.743a35.548 35.548 0 0 0 50.483 0l633.344-632.423c13.553-14.023 13.553-36.46 0-50.478zM301.87 887.122l-161.26-161.26 35.523-35.522 146.77-146.77 40.663-40.663 50.483-50.483 40.663-40.663 50.484-50.484 40.663-40.663 50.483-50.483 40.663-40.663 50.483-50.483 35.523-35.523 160.793 161.726L301.87 887.122z" fill="#e6e6e6" p-id="3663"></path><path d="M595.876 270.126l-50.483 50.483 27.576 27.577a35.548 35.548 0 0 0 50.483 0 35.548 35.548 0 0 0 0-50.484l-27.576-27.576z" fill="#e6e6e6" p-id="3664">
      </path>
     </svg>
      <!-- <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 1024 1024">
      <path d="M895.783519 383.907222a125.409693 125.409693 0 0 0-62.704846 17.062544A127.969074 127.969074 0 0 0 725.158087 341.250864a125.409693 125.409693 0 0 0-62.704847 17.062544A127.969074 127.969074 0 0 0 511.876297 306.272651V127.969074a127.969074 127.969074 0 0 0-255.938149 0v409.074474l-28.57976-29.006324A131.808146 131.808146 0 0 0 133.087837 469.219939 133.087837 133.087837 0 0 0 0 602.307776 236.316224 236.316224 0 0 0 69.1033 767.814445l151.856635 151.430071 39.670413 79.340826A42.656358 42.656358 0 0 0 298.594506 1023.752593a39.670413 39.670413 0 0 0 19.195361-4.692199 42.656358 42.656358 0 0 0 18.768798-57.15952l-42.656358-85.312716a46.921994 46.921994 0 0 0-7.678145-11.090653L127.969074 708.948671a149.297253 149.297253 0 0 1-42.656358-106.640895 47.775121 47.775121 0 0 1 81.473644-33.698523l101.522132 101.522132a42.656358 42.656358 0 0 0 46.49543 8.957835A42.656358 42.656358 0 0 0 341.250864 639.845371V127.969074a42.656358 42.656358 0 0 1 85.312716 0v469.219939a42.656358 42.656358 0 0 0 85.312717 0v-170.625433a42.656358 42.656358 0 0 1 85.312716 0v170.625433a42.656358 42.656358 0 0 0 85.312716 0v-127.969074a42.656358 42.656358 0 0 1 85.312716 0v127.969074a42.656358 42.656358 0 0 0 85.312716 0v-85.312716a42.656358 42.656358 0 0 1 85.312716 0v263.189729a246.980313 246.980313 0 0 1-72.942372 175.744195 42.656358 42.656358 0 0 0 0 60.572028 42.656358 42.656358 0 0 0 60.572028 0A331.866466 331.866466 0 0 0 1023.752593 775.066026V511.876297a127.969074 127.969074 0 0 0-127.969074-127.969075z" p-id="3110">
      </path>
     </svg> -->

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
  name: 'measuretool',
  mixins: [tools],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: 'measuretool',
      path: null,
      firstPoint: null,
      lastPoint: null,
      resp: []
    }
  },
  computed: {},
  watch: {

  },
  mounted() {
    this.paper = paper
  },
  methods: {
    removeLastPoint() {
      this.path.removeSegment(this.path.segments.length - 1)
    },
    removeLine() {
      this.path.remove()
      this.path = null
      this.firstPoint = null
      this.lastPoint = null
    },
    completeLine(point) {
      this.lastPoint = point
      this.path.add(this.lastPoint)
      this.path.closePath()
      this.resp.push(this.path.clone())
      this.resp.push(this.arr.clone())
      this.path.removeSegments()
      this.arr.removeSegments()
      this.removeLine()
    },
    createLineGroup(point) {
      this.firstPoint = point
      this.pathGroup = new paper.Group()
      this.path = new paper.Path({
        strokeColor: 'red',
        strokeWidth: 1 / paper.project.view.zoom
      })
      this.path.add(this.firstPoint)
      this.pathGroup.addChild(this.path.clone())
    },
    drawLength(from, to, sign, label, value, prefix) {
      // const lengthSize = 5
      // const vector = to.subtract(from)
      // const currentlength = vector.length
      // if (currentlength < lengthSize * 4) return
      // var awayVector = vector.normalize(lengthSize).rotate(90 * sign)
      // var upVector = vector.normalize(lengthSize).rotate(45 * sign)
      // var downVector = upVector.rotate(-90 * sign)
      // var lengthVector = vector.normalize(
      //   vector.length / 2 - lengthSize * Math.sqrt(2))
      // var line = new Path()
      // line.add(from + awayVector)
      // line.lineBy(upVector)
      // line.lineBy(lengthVector)
      // line.lineBy(upVector)
      // var middle = line.lastSegment.point
      // line.lineBy(downVector)
      // line.lineBy(lengthVector)
      // line.lineBy(downVector)
      // dashedItems.push(line)
      // if (label) {
      //   // Length Label
      //   var textAngle = Math.abs(vector.angle) > 90
      //     ? textAngle = 180 + vector.angle : vector.angle
      //   // Label needs to move away by different amounts based on the
      //   // vector's quadrant:
      //   var away = (sign >= 0 ? [1, 4] : [2, 3]).indexOf(vector.quadrant) != -1
      //     ? 8 : 0
      //   value = value || vector.length
      //   var text = new PointText({
      //     point: middle + awayVector.normalize(away + lengthSize),
      //     content: (prefix || '') + Math.floor(value * 1000) / 1000,
      //     fillColor: 'black',
      //     justification: 'center'
      //   })
      //   text.rotate(textAngle)
      //   items.push(text)
      // }
    },
    drawInfo(from, to) {
      if (this.lineName) {
        this.lineName.remove()
      }
      const vector = to.subtract(from)
      const middle = from.add(vector.normalize(vector.length / 2))
      this.lineName = new paper.PointText({
        point: middle,
        // point: middle + awayVector.normalize(away + lengthSize),
        content: vector.length.toFixed(2),
        fontSize: 15 / paper.project.view.zoom,
        justification: 'right',
        fillColor: 'black'
      })
    },
    dragArr(e, drag) {
      if (this.arr) {
        this.arr.remove()
      }
      const vector = e.point.subtract(this.firstPoint)
      const arrowVector = vector.normalize(10 / paper.project.view.zoom)
      this.arr = new paper.Path({
        strokeColor: 'red',
        strokeWidth: 1 / paper.project.view.zoom,
        segments: [
          this.lastPoint.add(arrowVector.rotate(135)),
          this.lastPoint,
          this.lastPoint.add(arrowVector.rotate(-135))
        ]

      })
    },
    removeAny() {
      this.resp.forEach((item) => {
        item.remove()
      })
      if (this.arr) {
        this.arr.remove()
      }
      if (this.lineName) {
        this.lineName.remove()
      }
    },
    onMouseUp(e) {
    },
    onMouseDown(e) {
      if (!this.firstPoint) {
        // 全部清空
        this.removeAny()
        this.createLineGroup(e.point)
      } else {
        this.completeLine(e.point)
      }
    },
    onMouseDrag(e) {
    },
    onMouseMove(e) {
      if (!this.path) return
      if (this.path.segments.length > 1) {
        this.removeLastPoint()
      }
      this.lastPoint = e.point
      this.path.add(this.lastPoint)
      this.path.closePath()
      this.dragArr(e, e.modifiers.shift)
      this.drawLength(this.firstPoint, this.lastPoint)
      this.drawInfo(this.firstPoint, this.lastPoint)
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
