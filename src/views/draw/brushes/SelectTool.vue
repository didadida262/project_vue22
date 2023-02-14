<script>
import paper from 'paper'
import tool from '../tools'

export default {
  name: 'SelectTool',
  mixins: [tool],

  data() {
    return {
      name: '选择工具'
      // icon: 'fa-hand-pointer-o',
      // shortcut: '字母 A',
      // cursor: 'pointer',
      // scaleFactor: 15,
      // isValidDrag: false

    }
  },

  created() {
  },
  methods: {
    onMouseDown(event) {
      const hitResult = this.$parent.paper.project.hitTest(
        event.point,
        this.hitOptions
      )

      if (!hitResult) return
      if (hitResult.item['name']) return

      if (event.modifiers.shift) {
        if (hitResult.type === 'segment') {
          hitResult.segment.remove()
        }
        return
      }
      const path = hitResult.item
      let paperObject = null
      if (hitResult.type === 'segment') {
        this.segment = hitResult.segment
        paperObject = path.parent
        this.paperObject = paperObject
        this.adjustSegments = true
      } else if (hitResult.type === 'stroke') {
        const location = hitResult.location
        this.segment = path.insert(location.index + 1, event.point)
      } else if (event.item.className == 'CompoundPath') {
        this.initPoint = event.point
        this.moveObject = event.item
        paperObject = event.item
      }
      this.isBbox = this.checkBbox(paperObject)
      if (this.point != null) {
        this.edit.canMove = this.point.contains(event.point)
      } else {
        this.edit.canMove = false
      }
    },
    setAnnotationBorder(isshow) {
      if (this.hover.annotation) {
        this.hover.annotation.showBorder = isshow
      }
    },
    clear(currentDomIsAuditModal) {
      if (currentDomIsAuditModal) return
      if (new Date().getTime() - this.duration > 200) {
        if (!currentDomIsAuditModal) {
          this.$parent.isShowAuditModal = false
        }
      }
      this.setAnnotationBorder(false)
      this.hover.category = null
      this.hover.annotation = null
      this.isBbox = false
      this.segment = null
      this.moveObject = null
      if (this.hover.text != null) {
        this.hover.text.remove()
        this.hover.box.remove()
        this.hover.text = null
        this.hover.box = null
      }
    },
    createPoint(point) {
      if (this.point != null) {
        this.point.remove()
      }

      this.point = new paper.Path.Circle(point, this.edit.indicatorSize)
      this.point.strokeColor = 'black'
      this.point.strokeWidth = this.edit.indicatorWidth
      this.point.indicator = true
    },
    onMouseDrag(event) {
      this.isValidDrag = false
      // console.log('this.moveObject:',this.moveObject)
      if (this.moveObject) { // 源语句: if (this.isBbox && this.moveObject) 其实所有的框都要支持拖动
        if (this.moveObject.removeBorderCompoundPath) {
          this.moveObject.removeBorderCompoundPath()
        }
        // 拖动框逻辑
        let delta_x = this.initPoint.x - event.point.x
        let delta_y = this.initPoint.y - event.point.y
        const canMove = this.moveObject.children.some(item => {
          const res = this.$parent.validationAnnotationBounds(item.bounds, delta_x, delta_y)
          if (res.x_disable) { delta_x = 0 }
          if (res.y_disable) { delta_y = 0 }
          return res.x_disable && res.y_disable
        })
        if (canMove) return
        this.$parent.isChange = true
        this.moveObject.children.forEach((item) => {
          const segments = item.segments
          segments.forEach(segment => {
            const p = segment.point
            segment.point = new paper.Point(p.x - delta_x, p.y - delta_y)
          })
        })
        this.initPoint = event.point
        this.isValidDrag = true
      }

      if (this.adjustSegments && this.paperObject) {
        if (this.paperObject.removeBorderCompoundPath) {
          this.paperObject.removeBorderCompoundPath()
        }
      }
      if (this.segment && this.edit.canMove) {
        let left = 0; let right = 0; let top = 0; let bottom = 0
        if (event.point.x > 0) { left = Math.abs(event.point.x) }
        if (event.point.x < 0) { right = Math.abs(event.point.x) }
        if (event.point.y > 0) { top = Math.abs(event.point.y) }
        if (event.point.y < 0) { bottom = Math.abs(event.point.y) }
        if (this.$parent.validationAnnotationBounds({ left, right, top, bottom })) return
        // 改变框大小逻辑
        this.$parent.isChange = true
        this.createPoint(event.point)
        if (this.isBbox) {
          // counter clockwise prev and next.
          const isCounterClock =
            this.segment.previous.point.x == this.segment.point.x
          const prev = isCounterClock ? this.segment.previous : this.segment.next
          const next = !isCounterClock
            ? this.segment.previous
            : this.segment.next

          prev.point = new paper.Point(event.point.x, prev.point.y)
          next.point = new paper.Point(next.point.x, event.point.y)
        } // getbbox here somehow
        this.segment.point = event.point
        this.isValidDrag = true
      } else if (!this.keypoint) {
        // the event point exists on a relative coordinate system (dependent on screen dimensions)
        // however, the image on the canvas paper exists on an absolute coordinate system
        // thus, tracking mouse deltas from the previous point is necessary
        const delta_x = this.initPoint.x - event.point.x
        const delta_y = this.initPoint.y - event.point.y
        const center_delta = new paper.Point(delta_x, delta_y)
        const new_center = this.$parent.paper.view.center.add(center_delta)
        this.$parent.paper.view.setCenter(new_center)
      }
      // if (this.$parent.validationAnnotationMask(this.moveObject)) {
      //     this.$message.closeAll()
      //     this.$message.warning({
      //       message: "标注框不可和掩膜区域重合!",
      //       type: 'warning'
      //     })
      // }
      // 与掩膜的相交校验统一放到边缘像素生成后的节点去做
    },
    onMouseUp(event) {
      // this.isValidDrag && this.$parent.changeSnapshot()
      if (this.isValidDrag && this.moveObject) {
        this.$parent.resetAnnotationBorderPixels(this.moveObject)
      }
      if (this.adjustSegments) {
        this.$parent.resetAnnotationBorderPixels(this.paperObject)
      }
      this.clear()
      this.adjustSegments = false
    },
    onMouseMove(event) {
      const currentMoveDom = event.event.target.getAttribute('class') || ''
      const auditModalIncludeClass = ['audit-modal']
      // const auditModalIncludeClass = ['ivu-select-selection', 'ivu-select-selected-value', 'audit-modal', 'ivu-select-dropdown']
      const currentDomIsAuditModal = auditModalIncludeClass.some(item => currentMoveDom.includes(item))
      // ensures that the initPoint is always tracked.
      // Necessary for the introduced pan functionality and fixes a bug with selecting and dragging bboxes, since initPoint is initially undefined
      this.initPoint = event.point

      const hitResult = this.$parent.paper.project.hitTest(
        event.point,
        this.hitOptions
      )

      if (hitResult && !hitResult.item['name']) {
        let point = null

        if (hitResult.type === 'segment') {
          point = hitResult.segment.location.point
        } else if (hitResult.type === 'stroke') {
          point = hitResult.location.point
        }

        if (point != null) {
          this.edit.center = point
          // 排除掉不该显示的冗余点（dda计算出的边缘点，正常标注几乎不会出现x和y都是整型的场景）
          if (parseInt(point.x) == point.x && parseInt(point.y) == point.y) return
          this.createPoint(point)
        } else {
          if (this.point != null) {
            this.point.remove()
            this.point = null
          }
        }
      }

      this.$parent.hover.annotation = -1
      this.$parent.hover.category = -1

      this.$parent.paper.project.activeLayer.selected = false
      const item = event.item

      this.keypoint = null

      if (
        item &&
        item.data.hasOwnProperty('annotationId') &&
        item.data.hasOwnProperty('categoryId')
      ) {
        this.hover.position = event.point

        const categoryId = event.item.data.categoryId
        const annotationId = event.item.data.annotationId
        this.$parent.hover.categoryId = categoryId
        this.$parent.hover.annotation = annotationId

        this.hover.category = this.$parent.getCategory(categoryId)
        if (this.hover.category != null) {
          this.setAnnotationBorder(false)
          this.hover.annotation = this.hover.category.getAnnotationById(
            annotationId
          )
          this.setAnnotationBorder(true)
          event.item.selected = true
          // this.hoverText(); // 使用新的dom悬框
          if (!this.$parent.isShowAuditModal) {
            const { event: { clientX, clientY }} = event
            this.$parent.selectToolsPosition = { clientX, clientY }
            this.duration = new Date().getTime()
            this.$parent.isShowAuditModal = true
          }
          this.$parent.annotationsInfo = {
            annotation: this.hover.annotation.annotation,
            category: this.hover.category.category
          }
        }
      } else if (event.item && event.item.hasOwnProperty('keypoint')) {
        this.hover.position = event.point
        this.keypoint = item
      } else if (
        item &&
        item.lastChild &&
        item.lastChild.hasOwnProperty('keypoint')
      ) {
        this.hover.position = event.point
        for (let i = 0; i < item.children.length; ++i) {
          if (item.children[i].hasOwnProperty('keypoint')) {
            const keypoint = item.children[i].keypoint
            if (event.point.getDistance(keypoint) <= keypoint.radius) {
              this.keypoint = item.children[i]
              break
            }
          }
        }
      } else {
        this.clear(currentDomIsAuditModal)
      }
    }
  },
  watch: {

  },
  beforeDestroy() {
  }
}
</script>
