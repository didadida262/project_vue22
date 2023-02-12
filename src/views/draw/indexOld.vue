<template>
  <div class="draw-container">
    <!-- 所有笔刷 -->
    <div class="tool">
      <!-- <el-button
       type="primary"
       size="mini"
       @click="handleExport"
       >Export</el-button> -->
      <Pencil
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <!-- <oldBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <broomBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <killBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <killBrushNew
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <LineBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      /> -->
      <RectBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
    </div>
    <!-- :class="[{'cursorpointerNone-st': activatedBrush !== 'pencil' && activatedBrush !== 'line' && activatedBrush !== 'rect_brush'}]" -->
    <Content
      ref="Content"
      @shortCut="onWheel"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Content from './Content'
import paper from 'paper'
import Pencil from './brushes/Pencil.vue'
import oldBrush from './brushes/oldBrush.vue'
import killBrush from './brushes/kill_brush.vue'
import killBrushNew from './brushes/kill_brush2.vue'
import broomBrush from './brushes/broomBrush.vue'
import LineBrush from './brushes/Line.vue'
import RectBrush from './brushes/RectBrush.vue'

export default {
  name: 'Dashboard',
  components: {
    Content,
    Pencil,
    oldBrush,
    killBrush,
    broomBrush,
    LineBrush,
    RectBrush,
    killBrushNew
  },
  data() {
    return {
      url: '@/assets/rick.jpg',
      WIDTH: null,
      HEIGHT: null,
      // 当前激活工具
      activatedBrush: '',
      tool: null,
      lastDragPoint: null,
      layer: null,
      info: {
        name: 'hhvcg'
      },
      paper: null,
      image: {
        // url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
      },
      testInfo: {
        plan: {
          price: 0
        }
      }

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === 'Draw')[0]
    }
  },

  mounted() {
    this.init()
    console.log('Draw---mounted--this.paper>>>>', this.paper)
  },
  created() {
  },
  beforeDestroy() {
    let currentProject = this.paper.projects.filter((_p) => _p.name === 'Draw')[0]
    currentProject.remove()
    currentProject = null
  },
  methods: {
    handleExport() {
      console.log('this.currentProject>>', this.currentProject)

      // 通过 API 获取目标 canvas 元素
      // const canvas = this.$refs.Content.$refs.main_canvas
      const x = this.currentProject.exportSVG({
        asString: true
      })
      const blob = new Blob([x], { type: 'svg' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'test.svg'
      a.click()
      console.log('x>>>', x)
      this.$message.success('Export Success!!!')
    },
    changeBrush(brush) {
      this.activatedBrush = brush
      this.$message.success(`切换至${brush}`)
    },
    draw(point) {
      if (this.selection) {
        console.log('point--->', point)
        console.log('lastpoint--->', this.lastDragPoint)
        console.log('point.getDistance(this.lastDragPoint):', point.getDistance(this.lastDragPoint))
        if (point.getDistance(this.lastDragPoint) >= this.brush.pathOptions.radius * 2) {
          console.log('断画！')
          // for (let i = this.lastDragPoint.x; i < )
        }
        this.lastDragPoint = point
        const newSelection = this.selection.unite(this.brush.path)
        this.selection.remove()
        this.selection = newSelection
        // this.selection.intersect(this.brush.path)
      }
    },
    createSelection() {
      // 笔刷工具可以继续标注
      this.selection = new paper.Path({
        strokeColor: this.brush.pathOptions.strokeColor,
        strokeWidth: this.brush.pathOptions.strokeWidth
      })
    },
    moveBrush(point) {
      if (this.brush.path == null) this.createBrush()
      this.brush.path.bringToFront()
      this.brush.path.position = point
    },
    createBrush(center) {
      center = center || new paper.Point(0, 0)
      if (this.brush.pathOptions.btype === 'circle') {
        this.brush.path = new paper.Path.Circle({
          strokeColor: this.brush.pathOptions.strokeColor,
          strokeWidth: this.brush.pathOptions.strokeWidth,
          radius: this.brush.pathOptions.radius,
          center: center
        })
      } else {
        this.brush.path = new paper.Path.Rectangle({
          size: [this.brush.pathOptions.radius * 2, this.brush.pathOptions.radius * 2],
          strokeColor: this.brush.pathOptions.strokeColor,
          strokeWidth: this.brush.pathOptions.strokeWidth,
          center: center
        })
      }
    },

    init() {
      const canvas = this.$refs.Content.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = 'Draw'
      this.image.raster = new paper.Raster({
        position: 0,
        source: this.url
      })
      this.image.raster.onLoad = () => {
        // 让图片raster的宽高自适应view这个容器
        this.image.raster.fitBounds(this.paper.view.bounds, true)
        console.log('??', this.image.raster)
      }
      // 绑定各种事件函数
      this.paper.view.setCenter(0, 0)
      this.paper.view.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = this.paper.project.activeLayer
          layer.selected = !layer.selected
        }
      }
    },

    addStrokes(point, delta) {
      // 原版的齿轮状
      let step = delta.rotate(90)
      const strokePoints = 6 * 2 + 1
      point = point.subtract(step.divide(2))
      step = step.divide(strokePoints - 1)
      for (let i = 0; i < strokePoints; i++) {
        let strokePoint = point.add(step.multiply(i))
        let offset = delta.multiply((Math.random() * 0.3 + 0.1))
        if (i % 2) {
          offset = offset.multiply(-1)
        }
        strokePoint = strokePoint.add(offset)
        this.selection.insert(0, strokePoint)
      }

      // 简易版,直接一个圆
      // const top = e.middlePoint.add(e.delta.rotate(90).normalize().multiply(10));

      // this.selection.insert(0, point.add(delta.normalize().multiply(10)));
    },
    // 以当前滚轮方向及真实坐标数据为输入
    changeZoom(delta, viewPosition) {
      const oldZoom = this.paper.view.zoom
      const c = this.paper.view.center
      const factor = 0.5
      // < 0:向上-->放大，反之向下--->缩小
      const zoom = delta < 0 ? oldZoom + factor : oldZoom - factor
      return zoom <= 0 || zoom >= 160 ? oldZoom : zoom
    },
    onWheel(e) {
      // const point = { x: e.x, y: e.y }
      // const view = this.paper.view

      // const viewPosition = view.viewToProject(
      //   new paper.Point(e.offsetX, e.offsetY)
      // )
      if (e.wheelDeltaY > 0) {
        if (this.paper.view.zoom - 0.1 > 0) {
          this.paper.view.zoom -= 0.4
        }
      } else {
        this.paper.view.zoom += 0.4
      }
      this.paper.view.setCenter(e.point)
    },
    // 根据加载图片宽高及外层div宽高，作自适应处理。

    realXY(point) {
      return {
        x: point.x * this.image.scale,
        y: point.y * this.image.scale
      }
    },
    line() {
      const vector = this.lastPoint.subtract(this.firstPoint)
      this.line.path.add(vector.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(-90).add(this.firstPoint))
      this.line.path.add(vector.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(90).add(this.firstPoint))
      const vector2 = this.firstPoint.subtract(this.lastPoint)
      this.line.path.add(vector2.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(-90).add(this.lastPoint))
      this.line.path.add(vector2.normalize().multiply(this.line.pathOptions.lineWidth / 2).rotate(90).add(this.lastPoint))
    },
    getTopBot(firstPoint, lastPoint) {
      // 返回其中顶
      const vector = this.lastPoint.subtract(this.firstPoint)
      const top = vector.normalize().multiply(10).rotate(-90).add(this.firstPoint)
      const bot = vector.normalize().multiply(10).rotate(90).add(this.firstPoint)
      return [top, bot]
    }

  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/draw/index.scss'
</style>
