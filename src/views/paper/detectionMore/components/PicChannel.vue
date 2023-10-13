<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description: 支持图片展示、放大缩小功能.
 适配多通道版本
-->

<template>
  <canvas
    :id="picContainer"
    :ref="picContainer"
    resize
    class="picContainer"
    @wheel="onwheel"
  />
</template>
<script>
import paper from 'paper'
import { addLayer } from '@/utils/paperWeaponTS.ts'

export default {
  name: 'picChannel',
  props: {
    picInfo: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      zoom: 1,
      WIDTH: null,
      HEIGHT: null,
      // 拖动的初始点
      initPoint: null
    }
  },
  methods: {
    onwheel(e) {
      const view = this.project.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.offsetX, e.offsetY)
      )
      const transform = this.changeZoom(e.deltaY, viewPosition)
      paper.projects.forEach((project) => {
        project.view.zoom = transform.zoom
        project.view.center = project.view.center.add(transform.offset)
      })
      this.$emit('handleChangePaperScope', {
        type: 'changeZoom',
        data: 1/ transform.zoom
      })
    },
    changeZoom(delta, p) {
      const view = this.project.view
      const oldZoom = view.zoom
      const c = view.center
      const factor = 0.15 + this.zoom

      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      const beta = oldZoom / zoom
      // 计算当前点到当前视图中心点向量指向
      const pc = p.subtract(c)
      // a点目测是换算后的新p点
      const a = p.subtract(pc.multiply(beta)).subtract(c)

      return { zoom: zoom, offset: a }
    },
    // 初始化画布，并确认相关参数初始值
    init() {
      const parentPaper = this.$parent.paper
      const canvas = this.$refs[this.picContainer]
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      parentPaper.setup(canvas)
      this.project = parentPaper.project
      this.project.name = this.picInfo.key
      this.project.view.setCenter(0, 0)
      this.project.view.onMouseDown = this.onMouseDown
      this.project.WIDTH = this.WIDTH
      this.project.HEIGHT = this.HEIGHT
    },
    onMouseDown(e) {
        this.project.activate()
        this.$emit('handleChangePaperScope', {
          type: 'changeActivateScope',
          data: this.picInfo
        })
    },
    drawPic() {
      let layerImg = this.project.layers[`layerImg`]
      if (!layerImg) {
        layerImg = new paper.Layer()
        layerImg.name = `layerImg`
      }
      layerImg.activate()
      const size = new paper.Size(this.WIDTH - 10, this.HEIGHT - 10)
      const rec = new paper.Rectangle({
        center: 0,
        size: size,
      })
      const raster = new paper.Raster(this.picInfo.src)
      raster.onLoad = () => {
        raster.fitBounds(rec, false)
      }
      layerImg.sendToBack()
    },
    removeProject() {
      if (this.project) {
        this.project.remove()
        this.project = null
      }
    }
  },
  computed: {
    picContainer() {
      return 'picContainer' + this.picInfo.title
    },

  },
  watch: {

  },
  mounted() {
    this.init()
    this.drawPic()
    addLayer(this.project, 'layerDefect')
  },
  created() {
    this.removeProject()
  },
  beforeDestroy() {
    this.removeProject()
  }
}
</script>

<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
  border: 1px solid rgb(184, 174, 174);
}
// .picContainer:hover {
//   cursor: pointer;
//   border: 2px solid rgb(0, 183, 255);
// }

</style>
