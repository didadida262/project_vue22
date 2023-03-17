<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: -_-
 * @Description: 支持图片展示、拖拽、放大缩小功能
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
export default {
  name: 'paperpicsample',
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
      initPoint: null,
      picOriginData: null
    }
  },
  methods: {
    changeZoom(delta, p) {
      const view = this.currentProject.view
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
    onwheel(e) {
      const view = this.currentProject.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.offsetX, e.offsetY)
      )
      const transform = this.changeZoom(e.deltaY, viewPosition)
      this.paper.projects.forEach((project) => {
        project.view.zoom = transform.zoom
        project.view.center = project.view.center.add(transform.offset)
      })
    },
    // 初始化画布，并确认相关参数初始值
    init() {
      const canvas = this.$refs[this.picContainer]
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.picContainer
      this.paper.view.setCenter(0, 0)
      this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
      this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
    },
    onMouseDown(e) {
      console.warn('down>>>>>>>>')
      this.initPoint = e.point
      // this.raster.setPixel(e.point.x, e.point.y, 'red')
      const color = this.raster.getPixel(e.point.x, e.point.y)
      console.log('color>>', color)
      console.log(`RGB>>>>>${color.red} + ${color.green} + ${color.blue} + ${color.alpha}`)
      // const c = new paper.Path.Rectangle({
      //   center: e.point.floor(),
      //   size: new paper.Size(0.1),
      //   strokeColor: 'green',
      //   strokeWidth: 0.1
      // })
    },
    onMouseDrag(e) {
      const delta = this.initPoint.subtract(e.point)
      this.paper.projects.forEach(pro => {
        const newCenter = pro.view.center.add(delta)
        pro.view.setCenter(newCenter)
      })
    },
    getOriginData() {
      const width = this.raster.width
      const height = this.raster.height
      const obj = {}
      console.time('getPicPix')
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const curPixelData = this.raster.getImageData(i, j, 1, 1)
          const pixValue = Math.floor((curPixelData.data[0] + curPixelData.data[1] + curPixelData.data[2]) / 3)
          if (!obj.hasOwnProperty(pixValue)) {
            obj[pixValue] = 1
          } else {
            obj[pixValue]++
          }
        }
      }
      this.picOriginData = obj
    },
    getPicPix() {
      const width = this.raster.width
      const height = this.raster.height
      const obj = {}
      console.time('getPicPix')
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const curPixelData = this.raster.getImageData(i, j, 1, 1)
          const pixValue = Math.floor((curPixelData.data[0] + curPixelData.data[1] + curPixelData.data[2]) / 3)
          if (!obj.hasOwnProperty(pixValue)) {
            obj[pixValue] = 1
          } else {
            obj[pixValue]++
          }
        }
      }
      this.$emit('handlePicEvent', {
        type: 'submitData',
        data: obj
      })
      console.timeEnd('getPicPix')
    },
    binaryPic() {
      const width = this.raster.width
      const height = this.raster.height
      const imageArr = new Array(width).fill(new Array(height))
      const resp = []
      console.time('1')
      for (let i = 0; i < width; i++) {
        for (let j = 0; j < height; j++) {
          const curPixelData = this.raster.getImageData(i, j, 1, 1)
          const sum = curPixelData.data[0] + curPixelData.data[1] + curPixelData.data[2]
          if (sum / 3 >= 127) {
            curPixelData.data[0] = 0
            curPixelData.data[1] = 0
            curPixelData.data[2] = 0
          } else {
            curPixelData.data[0] = 255
            curPixelData.data[1] = 255
            curPixelData.data[2] = 255
          }
          resp.push({ data: curPixelData, index: [i, j] })
          imageArr[i][j] = curPixelData
        }
      }
      console.timeEnd('1')
      resp.forEach((item) => {
        this.raster.putImageData(item.data, item.index[0], item.index[1])
      })
    },
    drawPic() {
      this.raster = new paper.Raster({
        source: this.picInfo.src,
        smoothing: false
      })
      this.raster.onLoad = () => {
        this.raster.fitBounds(this.paper.view.bounds, false)
        console.log('this.raster>>>', this.raster)
        // const topLeft = new paper.Path.Circle({
        //   center: this.raster.bounds.topLeft,
        //   radius: 100,
        //   fillColor: 'red'
        // })
        // const topRight = new paper.Path.Circle({
        //   center: this.raster.bounds.topRight,
        //   radius: 100,
        //   fillColor: 'red'
        // })
        // const bottomLeft = new paper.Path.Circle({
        //   center: this.raster.bounds.bottomLeft,
        //   radius: 100,
        //   fillColor: 'red'
        // })
        // const bottomRight = new paper.Path.Circle({
        //   center: this.raster.bounds.bottomRight,
        //   radius: 100,
        //   fillColor: 'red'
        // })
        // this.binaryPic()
        this.getOriginData()
        this.getPicPix()
      }
    }
  },
  watch: {
    'picInfo.mode'() {
      if (this.picInfo.mode === 'binary') {
        this.binaryPic()
        this.getPicPix()
      }
    }
  },
  computed: {
    picContainer() {
      return 'picContainer' + this.picInfo.title
    },
    currentProject() {
      return this.paper.projects.filter((item) => item.name === this.picContainer)[0]
    }
  },
  mounted() {
    this.init()
    this.drawPic()
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((p) => p.name === this.picContainer)
    currentProject.remove()
  }
}
</script>

<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
}

</style>
