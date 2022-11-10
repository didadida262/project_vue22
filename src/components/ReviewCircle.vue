<!--
 * @Author: Hhvcg
 * @Date: 2022-08-29 11:42:53
 * @LastEditors: -_-
 * @Description: 圆框点数据基础组件，包含外圆层、晶圆片点数据层（包含内圆）、网格层、十字移动层、密度图层、明场、暗场层。同时输出点击事件的数据输出，该组件是一个多图层的架构
                getXYData:输出move信息；getClickData：输出click点数据
-->
<template>
  <div class="review-circle-container">
    <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas"
    hidpi="off"
    />
  </div>
</template>
<script>
import paper from 'paper'
import { getAnotherPoint } from '@/utils/weapons'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'review-circle',
  props: {
    // 点数据
    defectList: {
      type: Array,
      required: true
    },
    // 晶圆片数据
    waferInfo: {
      type: Object,
      required: true
    },
    otherLayersInfo: {
      type: Array
    },
    typeList: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      WIDTH: null,
      HEIGHT: null,
      // 分割
      // 此处半径均为外框圆
      radius: null,
      realRadius: null,
      innerRadius: null,
      ratio: null
    }
  },
  created() {
  },
  methods: {
    // 初始化画布，并确认相关参数初始值
    init() {
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      this.radius = Math.min(this.WIDTH, this.HEIGHT) / 2 - 10
      this.realRadius = Number(this.waferInfo.radius)
      this.ratio = Number(this.radius / this.realRadius.toFixed(2))
      this.innerRadius = this.radius - this.waferInfo.edge_exclusion * this.ratio
      paper.setup(canvas)
      this.paper = paper
      this.paper.view.setCenter(0, 0)
      this.paper.project.name = 'circle'
      // this.paper.view.onMouseMove = (e) => { this.onMouseMove(e) }
      // this.paper.view.onMouseDown = (e) => { this.onClickChip(e) }
    },
    // 外圆
    drawCircle() {
      const layerCircleOut = new paper.Layer()
      layerCircleOut.name = 'layerCircleOut'
      const circleOut = new paper.Path.Circle({
        center: 0,
        radius: this.radius,
        strokeColor: 'grey',
        fillColor: 'white',
        name: 'circleOut'
      })
    },
    // 先批量处理点数据坐标信息，再绘制数据点
    // 内圆同数据处于同一图层
    drawDot() {
      console.log('this.defectList>>', this.defectList)
      // 基于当前晶圆大小，处理数据点信息
      const layerDot = new paper.Layer()
      layerDot.name = 'layerDot'
      const dotData = this.defectList.map((item) => {
        return {
          pos_x: Number((Number(item.pos_x) * this.ratio).toFixed(2)),
          pos_y: Number((Number(item.pos_y) * this.ratio).toFixed(2)),
          class_color: item.class_color,
          class_id: item.class_id,
          id: item.id,
          channel: item.channel
        }
      })

      dotData.forEach((item) => {
        const p = new paper.Path.Circle({
          center: new paper.Point(item.pos_x, item.pos_y),
          radius: 1.5,
          fillColor: this.classColors[item.class_id]
          // fillColor: getRandomColor()
        })
        p.class_id = item.class_id
        p.data_id = item.id
        p.channel = item.channel
        p.onClick = (e) => {
          console.log('点击')
        }
      })
    },
    // 基于指定半径的圆，画内圆
    drawInnerCircle(len, radius) {
      const layerInnerCircle = new paper.Layer()
      layerInnerCircle.name = 'layerInnerCircle'
      const xBot = len * this.ratio / 2
      const yBot = getAnotherPoint(xBot, radius)
      const Botleft = new paper.Point(-xBot, yBot)
      const Botright = new paper.Point(xBot, yBot)
      const through = new paper.Point(0, -radius)
      const pp = new paper.Path.Arc({
        from: Botleft,
        through: through,
        to: Botright,
        strokeColor: 'rgb(150,150,150)',
        closed: true
      })
      pp.strokeWidth = '2'
    },
    // // 添加并绘制网格层，默认隐藏,暂由后端图片替代，废弃
    // drawChip() {
    //   if (this.chipInputInfo) {
    //     this.chipSize = {
    //       width: Number((this.chipInputInfo.chipSize.width * this.ratio).toFixed(0)),
    //       height: Number((this.chipInputInfo.chipSize.height * this.ratio).toFixed(0))
    //     }
    //   } else {
    //     this.chipSize = {
    //       width: Number((2 * this.ratio).toFixed(0)),
    //       height: Number((2 * this.ratio).toFixed(0))
    //     }
    //   }
    //   const layerLine = new paper.Layer()
    //   layerLine.name = 'layerChip'

    //   // 计算底座端点坐标abs(xBot, yBot)
    //   const xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2
    //   const yBot = getAnotherPoint(xBot, this.innerRadius)
    //   // x方向，即上下线段
    //   for (let i = 0; i < this.innerRadius;) {
    //     // (i, other)当前遍历点坐标abs
    //     const other = getAnotherPoint(i, this.innerRadius)
    //     const botR = new paper.Point(i, Math.min(other, yBot))
    //     const topR = new paper.Point(i, -other)
    //     const lineXR = new paper.Path.Line({
    //       from: topR,
    //       to: botR,
    //       strokeColor: this.chipColor
    //     })
    //     if (i !== 0) {
    //       const botL = new paper.Point(-i, Math.min(other, yBot))
    //       const topL = new paper.Point(-i, -other)
    //       const lineXL = new paper.Path.Line({
    //         from: topL,
    //         to: botL,
    //         strokeColor: this.chipColor
    //       })
    //     }
    //     i = i + this.chipSize.width
    //   }
    //   // y方向,即左右方向
    //   for (let i = 0; i < this.innerRadius;) {
    //     const other = getAnotherPoint(i, this.innerRadius)
    //     if (i < yBot) {
    //       const left = new paper.Point(other, i)
    //       const right = new paper.Point(-other, i)
    //       const lineYB = new paper.Path.Line({
    //         from: left,
    //         to: right,
    //         strokeColor: this.chipColor
    //       })
    //     }
    //     // (i, other)当前遍历点坐标abs
    //     if (i !== 0) {
    //       const leftT = new paper.Point(-other, -i)
    //       const rightT = new paper.Point(other, -i)
    //       const lineYT = new paper.Path.Line({
    //         from: leftT,
    //         to: rightT,
    //         strokeColor: this.chipColor
    //       })
    //     }
    //     i = i + this.chipSize.height
    //   }
    //   layerLine.opacity = 0
    // }
    // // 创建中心图形
    // creatpointer(point) {
    //   const layerPointer = new paper.Layer()
    //   layerPointer.name = 'layerPointer'
    //   this.pointerData.pointer = new paper.Path.Rectangle({
    //     center: point,
    //     width: this.pointerData.width,
    //     height: this.pointerData.height,
    //     opacity: 0.5,
    //     fillColor: '#650D65'
    //   })
    //   this.currentProject.insertLayer(this.currentProject.layers.length - 2, layerPointer)
    // },
    // // 纠正移动越界
    // modifyMovePoint(point) {
    //   const xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2
    //   const yBot = getAnotherPoint(xBot, this.innerRadius)
    //   if (point.y > yBot) {
    //     point.y = yBot
    //   }
    //   return point
    // },
    // // drawpointer: 移动pointor
    // movePointer(e) {
    //   const _point = this.modifyMovePoint(e.point)
    //   if (!this.pointerData.pointer) {
    //     this.creatpointer(_point)
    //   }
    //   this.pointerData.pointer.position = _point
    // },
    // // 在circle项目中的指定位置点e，绘制layerXY图层, 若存在，直接覆盖
    // drawXY(e) {
    //   const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
    //   currentProject.activate()
    //   const data = getLineData(e.point, this.innerRadius)
    //   if (currentProject.layers['layerXY']) {
    //     currentProject.layers['layerXY'].remove()
    //   }
    //   const layerXY = new paper.Layer()
    //   layerXY.name = 'layerXY'
    //   const xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2
    //   const yBot = getAnotherPoint(xBot, this.innerRadius)
    //   if (data[1].two[1] > yBot) {
    //     data[1].two[1] = yBot
    //   }
    //   if (data[0].one[1] > yBot) {
    //     data[0].one[1] = yBot
    //     data[0].two[1] = yBot
    //   }
    //   const X = new paper.Path.Line({
    //     from: new paper.Point(data[0].one[0], data[0].one[1]),
    //     to: new paper.Point(data[0].two[0], data[0].two[1]),
    //     strokeColor: '#650D65'
    //   })
    //   const Y = new paper.Path.Line({
    //     from: new paper.Point(data[1].one[0], data[1].one[1]),
    //     to: new paper.Point(data[1].two[0], data[1].two[1]),
    //     strokeColor: '#650D65'
    //   })
    //   currentProject.insertLayer(currentProject.layers.length - 2, layerXY)
    // },
    // onMouseMove(e) {
    //   const point = preDealPoint(e.point, this.ratio)
    //   if (e.point.getDistance(new paper.Point(0)) <= this.innerRadius) {
    //     this.$emit('handleCircleOperation', {
    //       type: 'mouseMove',
    //       data: point
    //     })
    //     this.drawXY(e)
    //   }
    // },

    // onClickChip(e, chipIndex = null) {
    //   const chipLayer = this.paper.projects.filter((item) => item.name === 'circle')[0].layers['layerChip']
    //   if (!chipLayer || !chipLayer.opacity) return
    //   let originChipSize = { width: 2 * this.ratio, height: 2 * this.ratio }
    //   if (this.chipInputInfo) {
    //     originChipSize = {
    //       width: this.chipInputInfo.chipSize.width * this.ratio,
    //       height: this.chipInputInfo.chipSize.height * this.ratio
    //     }
    //   }
    //   const chipSize = {
    //     width: Number(originChipSize.width.toFixed(0)),
    //     height: Number(originChipSize.height.toFixed(0))
    //   }
    //   let chip = chipIndex
    //   const inside = (x, y, radius) => x * x + y * y <= radius * radius
    //   if (!chip) {
    //     const { x, y } = e.point
    //     const xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2
    //     let yBot = getAnotherPoint(xBot, this.innerRadius)
    //     yBot = Math.floor(yBot / chipSize.height) * chipSize.height
    //     if (!inside(x, y, this.innerRadius) || y >= yBot) return
    //     chip = { x: Math.floor((x + 0.5 * originChipSize.width) / originChipSize.width), y: Math.ceil(y / originChipSize.height) }
    //   }
    //   const point = { x: chip.x * originChipSize.width, y: (chip.y - 0.5) * originChipSize.height }
    //   const corner = (x, y, w, h) => [x > 0 ? x + w / 2 : x - w / 2, y > 0 ? y + h / 2 : y - h / 2]
    //   if (!inside(...corner(point.x, point.y, chipSize.width, chipSize.height), this.innerRadius)) return
    //   this.movePointer({ point })
    //   this.setSelectedCenter({ point: { x: point.x / this.ratio, y: point.y / this.ratio }, from: 'circle' })
    //   this.$emit('handleCircleOperation',
    //     {
    //       type: 'defectClick',
    //       data: {
    //         point: preDealPoint(point, this.ratio),
    //         pointerData: {
    //           width: this.pointerData.width / this.ratio,
    //           height: this.pointerData.height / this.ratio
    //         }
    //       }
    //     }
    //   )
    //   if (!chipIndex) {
    //     const index = 1 + this.chipIndices.findIndex(v => v[0] == chip.x && v[1] == (chip.y - 1)) // -1是因为x轴下面的是y=0
    //     this.setChip({ index, chip_x_index: chip.x, chip_y_index: chip.y, checked: true })
    //   }
    // },
    // generateChipIndices() {
    //   const chipIndices = []
    //   let chipSize = { width: 2, height: 2 }
    //   if (this.chipInputInfo) {
    //     chipSize = {
    //       width: this.chipInputInfo.chipSize.width,
    //       height: this.chipInputInfo.chipSize.height
    //     }
    //   }
    //   const edge_exclusion = this.chipInputInfo ? this.chipInputInfo.edge_exclusion : 3
    //   const innerRadius = this.realRadius - edge_exclusion
    //   const { width, height } = chipSize
    //   // 计算底座端点坐标abs(xBot, yBot)
    //   const xBot = this.waferInfo.flat_edge.DOWN / 2
    //   const yBot = getAnotherPoint(xBot, innerRadius)
    //   // y方向,即左右方向
    //   for (let i = height; i < innerRadius; i += height) {
    //     const other = getAnotherPoint(i, innerRadius)
    //     const dist = Math.abs(2 * other)
    //     let xNum = Math.floor(dist / width)
    //     if (!(xNum % 2)) xNum -= 1
    //     let xindex = -Math.floor(xNum / 2)
    //     const yindex = Math.round(i / height)
    //     for (let j = 0; j < xNum; j++) {
    //       chipIndices.push([xindex++, -yindex])
    //     }
    //     xindex = -Math.floor(xNum / 2)
    //     if (i < yBot) {
    //       for (let j = 0; j < xNum; j++) {
    //         chipIndices.push([xindex++, yindex - 1])
    //       }
    //     }
    //   }
    //   chipIndices.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))
    //   return chipIndices
    // },
    // handleClcikData(e) {
    //   if (this.$route.name === 'portalmain') return
    //   const id = e.target.data_id
    //   const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
    //   const currentLayer = currentProject.layers['layerData']
    //   if (e.target._b) {
    //     e.target.scaling = new paper.Point(0.5)
    //     e.target._b = false
    //   } else {
    //     // 放大当前缺陷点后，将其他方法点复原
    //     e.target.scaling = new paper.Point(2)
    //     e.target._b = true
    //     currentLayer.children.forEach((item, index) => {
    //       if (index !== 0) {
    //         if (item.data_id !== id && item._b) {
    //           item.scaling = new paper.Point(0.2)
    //           item._b = false
    //         }
    //       }
    //     })
    //   }
    //   // this.onMouseDown(e, id)
    //   this.$emit('handleCircleOperation',
    //     {
    //       type: 'defectClick',
    //       data: {
    //         id: id,
    //         point: preDealPoint(e.point, this.ratio),
    //         pointerData: {
    //           // width: this.pointerData.width / this.ratio,
    //           // height: this.pointerData.height / this.ratio,
    //           width: this.selectedArea.size.width / this.selectedArea.ratio,
    //           height: this.selectedArea.size.height / this.selectedArea.ratio
    //         }
    //       }
    //     }
    //   )
    //   // this.movePointer(e)
    // },
    // drawChipLayer() {
    //   const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
    //   currentProject.activate()
    //   let layerChip = currentProject.layers['layerChip']
    //   if (!layerChip) {
    //     layerChip = new paper.Layer()
    //     layerChip.name = 'layerChip'
    //   } else {
    //     layerChip.activate()
    //   }
    //   const raster = new paper.Raster(this.otherLayersInfo.chipImg)
    //   raster.onLoad = () => {
    //     const layer = currentProject.layers[0]
    //     raster.fitBounds(layer.bounds, false)
    //     layerChip.opacity = this.defectCompData ? this.defectCompData[1].checkBoxData ? this.defectCompData[1].sliderData : 0 : 0
    //   }
    //   layerChip.onMouseDown = this.onClickChip
    // },
    // drawDestinyLayer() {
    //   const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
    //   currentProject.activate()
    //   let layerDestiny = currentProject.layers['layerDestiny']
    //   if (!layerDestiny) {
    //     layerDestiny = new paper.Layer()
    //     layerDestiny.name = 'layerDestiny'
    //   } else {
    //     layerDestiny.activate()
    //   }
    //   const raster = new paper.Raster(this.otherLayersInfo.destinyImg)
    //   raster.onLoad = () => {
    //     const layerData = currentProject.layers[0]
    //     raster.fitBounds(layerData.bounds, false)
    //     layerDestiny.opacity = this.defectCompData ? this.defectCompData[2].checkBoxData ? this.defectCompData[2].sliderData : 0 : 0
    //   }
    // },
    // drawBfLayer() {
    //   const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
    //   currentProject.activate()
    //   let layerBf = currentProject.layers['layerBf']
    //   if (!layerBf) {
    //     layerBf = new paper.Layer()
    //     layerBf.name = 'layerBf'
    //   } else {
    //     layerBf.activate()
    //   }
    //   const raster = new paper.Raster(this.otherLayersInfo.bfImg)
    //   raster.onLoad = () => {
    //     const layerData = currentProject.layers[0]
    //     raster.fitBounds(layerData.bounds, false)
    //     layerBf.opacity = this.defectCompData ? this.defectCompData[3].checkBoxData ? this.defectCompData[3].sliderData : 0 : 0
    //   }
    // },
    // drawPlLayer() {
    //   const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
    //   currentProject.activate()
    //   let layerPl = currentProject.layers['layerPl']
    //   if (!layerPl) {
    //     layerPl = new paper.Layer()
    //     layerPl.name = 'layerPl'
    //   } else {
    //     layerPl.activate()
    //   }
    //   const raster = new paper.Raster(this.otherLayersInfo.plImg)
    //   raster.onLoad = () => {
    //     const layerData = currentProject.layers[0]
    //     raster.fitBounds(layerData.bounds, false)
    //     layerPl.opacity = this.defectCompData ? this.defectCompData[4].checkBoxData ? this.defectCompData[4].sliderData : 0 : 0
    //   }
    // },
    drawOtherLayers() {
      this.otherLayersInfo.forEach((layer) => {
        console.log('需要绘制图层>>', layer.name)
      })
    }

  },
  mounted() {
    console.time('Circle-time')
    this.init()
    this.drawCircle()
    this.drawInnerCircle(this.waferInfo.DOWN, this.innerRadius)
    this.drawDot()
    this.drawOtherLayers()
    console.timeEnd('Circle-time')
    console.log('circel-paperscope--->', this.paper)
  },
  beforeDestroy() {
    this.currentProject.remove()
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === 'circle')[0]
    },
    classColors() {
      const obj = {}
      this.typeList.forEach((type) => {
        obj[type.class_id] = type.color
      })
      return obj
    }
  },
  watch: {
  }
}
</script>

<style lang="scss">
.review-circle-container {
  width: 100%;
  height: 100%;
  position: relative;
  padding: 0px 10px 20px 10px;
  .main_canvas {
    width: 100%; // 让出右侧列表的位置
    height: 100%;
  }
}
</style>
