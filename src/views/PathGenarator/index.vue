<!-- path生成器，尚不支持导出功能... -->
<template>
  <div class="draw-container flex-cb">
    <div class="draw-container-tool">
      <SelectTool
        ref="select_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <RectBrush
        ref="rect_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
        />
      <Pencil
        ref="pencil_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
        @submitPath="submitPath"
      />
      <LinePoly
        ref="linepoly_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
    </div>
    <div class="draw-container-annotate flex-ca">
      <canvas
       ref="canvas"
       @wheel="onwheel"
       resize
       class="canvas" />
    </div>
  </div>
</template>

<script>
import Pencil from '@/components/Brushes/Pencil.vue'
import RectBrush from '@/components/Brushes/RectBrush.vue'
import SelectTool from '@/components/Brushes/SelectTool.vue'
import LinePoly from '@/components/Brushes/LinePoly.vue'
import paper from 'paper'
export default {
  name: 'Dashboard',
  components: {
    Pencil,
    RectBrush,
    SelectTool, // PaperNew,
    LinePoly

  },
  data() {
    return {
      cursorPointor: 'default',
      activatedBrush: 'select_tool',
      zoom: 1
    }
  },
  methods: {
    submitPath(path) {
      console.log('接收到path', path)
    },
    onwheel(e) {
      const view = this.project.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.offsetX, e.offsetY)
      )
      const transform = this.changeZoom(e.deltaY, viewPosition)
      this.project.view.zoom = transform.zoom
      this.project.view.center = this.project.view.center.add(transform.offset)
    },
    changeZoom(delta, p) {
      const view = this.project.view
      const oldZoom = view.zoom
      const c = view.center
      const factor = 0.05 + this.zoom

      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      const beta = oldZoom / zoom
      // 计算当前点到当前视图中心点向量指向
      const pc = p.subtract(c)
      // a点目测是换算后的新p点
      const a = p.subtract(pc.multiply(beta)).subtract(c)

      return { zoom: zoom, offset: a }
    },
    handleToolClick(brush) {

    },
    handleKeyDown(e) {
      console.log('外部事件捕获>>>')
      switch (e.key) {
        case 's':
          this.$refs['select_tool'].handleClickTool()
          break
        case 'r':
          this.$refs['rect_tool'].handleClickTool()
          break
        case 'p':
          this.$refs['linepoly_tool'].handleClickTool()
          break
        case 'm':
          this.$refs['measure_tool'].handleClickTool()
          break
        default:
          break
      }
    },
    setKeyDownListener() {
      console.log('setKeyDownListener>>')
      window.addEventListener(
        'keydown',
        this.handleKeyDown,
        {
          capture: false
        }
      )
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.project = paper.project
      this.project.name = this.title
      this.project.view.onFrame = this.onFrame
      this.project.view.setCenter(0)
      console.log('初始化世界!!!')
    },
    changeBrush(brushInfo) {
      this.activatedBrush = brushInfo.key
      this.cursorPointor = brushInfo.cursor
    }
  },
  mounted() {
    this.init()
  },
  created() {
    console.log('test>>>>>>console!!!!')
    this.setKeyDownListener()
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  computed: {
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss'
</style>
