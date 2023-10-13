<!--
 * @Author: Hhvcg
 * @Date: 2023-06-08 17:35:19
 * @LastEditors: Hhvcg
 测量框工具
-->
<script>
import paper from "paper";
import tool from "./tool";


export default {
  name: "MeasureTool",
  mixins: [tool],
  props: {
  },
  data() {
      return {
          icon: "fa-location-arrow",
          name: "测量工具",
          // shortcut: "字母 M",
          shortcut: "",
          cursor: "copy",
          path: null,
          firstPoint: null,
          lastPoint: null,
      };
  },
  created() {
  },
  watch: {
    selected() {
      if (this.selected !== this.name) {
        this.removeAny()
    }
    }

  },
  methods: {
    removeLastPoint() {
      this.path.removeSegment(this.path.segments.length - 1)
    },
    completeLine(point) {
      this.lastPoint = point
      this.path.add(this.lastPoint)
      this.firstPoint = null
      this.lastPoint = null
    },
    createLine(point) {
      this.firstPoint = point
      this.path = new paper.Path({
        strokeColor: 'red',
        strokeWidth: 1 / paper.project.view.zoom
      })
      this.path.add(this.firstPoint)
    },
    drawLength(from, to, sign, label, value, prefix) {
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
      if (this.path) {
        this.path.remove()
      }
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
        this.createLine(e.point)
      } else {
        this.completeLine(e.point)
      }
    },
    onMouseDrag(e) {
    },
    onMouseMove(e) {
      if (!this.firstPoint && !this.lastPoint) return
      if (this.path.segments.length > 1) {
        this.removeLastPoint()
      }
      this.lastPoint = e.point
      this.path.add(this.lastPoint)
      this.dragArr(e, e.modifiers.shift)
      this.drawLength(this.firstPoint, this.lastPoint)
      this.drawInfo(this.firstPoint, this.lastPoint)
    }
  },


  mounted() {

  },
  beforeDestroy() {
    this.removeAny()
  }
};
</script>
