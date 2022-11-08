<!--
 * @Author: Hhvcg
 * @Date: 2022-08-29 11:42:53
 * @LastEditors: -_-
 * @Description: 圆框点数据基础组件，包含外圆层、晶圆片点数据层（包含内圆）、网格层、十字移动层、密度图层、明场、暗场层。同时输出点击事件的数据输出，该组件是一个多图层的架构
                getXYData:输出move信息；getClickData：输出click点数据
-->
<template>
  <div class="review-circle-container">
    <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" :style="showPointer"
    hidpi="off"
    />
  </div>
</template>
<script>
import paper from "paper";
import { mapState, mapMutations } from 'vuex'
import { getAnotherPoint, preDealPoint, getLineData, getDiff } from "@/utils/index";
export default {
  name: "review-circle",
  props: {  
    // 点数据
    defectList: {
      type: Array,
      required: true,
    },
    // 晶圆片数据
    waferInfo: {
      type: Object,
      required: true,
    },
    otherLayersInfo: {
      type: Object,
    },
    defectCompData: {
      type: Array
    },
    // 扫描位置
    realtimeScanningBoxInfo: {
      type: Object,
    },
  },
  data() {
    return {
      // 组件内定义数据均为试图内转换数据，输入输出均需转换
      pointerData: {
        pointer: null,
        width: 2,
        height: 2
      },
      chipInputInfo: null,
      chipSize: null,
      WIDTH: null,
      HEIGHT: null,
      // 此处半径均为外框圆
      radius: null,
      realRadius: null,
      innerRadius: null,
      ratio: null,
      chipColor: "grey",
      // main页面的扫描框
      scanningBox: null,
      scanningBoxInterval: null,
      currentId: 0,
      chipIndices: null
    };
  },
  created() {
    this.chipInputInfo = JSON.parse(sessionStorage.getItem("chipInputInfo"))
    if (this.chipInputInfo && this.chipInputInfo.chipSize) {
      this.pointerData.width = this.chipInputInfo.chipSize.width
      this.pointerData.height = this.chipInputInfo.chipSize.height
    }
  },
  methods: {
    ...mapMutations('admin/paper', ['setActiveProject']),
    ...mapMutations('admin/selection', ['setChip', 'setSelectedRange', 'setSelectedCenter']),
    // 添加并绘制网格层，默认隐藏,暂由后端图片替代
    drawChip() {
      if (this.chipInputInfo) {
        this.chipSize = {
          width: Number((this.chipInputInfo.chipSize.width * this.ratio).toFixed(0)),
          height: Number((this.chipInputInfo.chipSize.height * this.ratio).toFixed(0)),
        }
      } else {
        this.chipSize = {
          width: Number((2 * this.ratio).toFixed(0)),
          height: Number((2 * this.ratio).toFixed(0)),
        }
      }    
      let layerLine = new paper.Layer();
      layerLine.name = 'layerChip'  

      // 计算底座端点坐标abs(xBot, yBot)
      let xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2;
      let yBot = getAnotherPoint(xBot, this.innerRadius);
      // x方向，即上下线段
      for (let i = 0; i < this.innerRadius;) {
        // (i, other)当前遍历点坐标abs
        let other = getAnotherPoint(i, this.innerRadius);
        let botR = new paper.Point(i, Math.min(other, yBot));
        let topR = new paper.Point(i, -other);
        let lineXR = new paper.Path.Line({
          from: topR,
          to: botR,
          strokeColor: this.chipColor,
        });
        if (i !== 0) {
          let botL = new paper.Point(-i, Math.min(other, yBot));
            let topL = new paper.Point(-i, -other);
            let lineXL = new paper.Path.Line({
              from: topL,
              to: botL,
              strokeColor: this.chipColor,
            });        
        }
        i = i + this.chipSize.width;
      }
      // y方向,即左右方向
      for (let i = 0; i < this.innerRadius;) {
          let other = getAnotherPoint(i, this.innerRadius);
        if (i < yBot) {
          let left = new paper.Point(other, i);
          let right = new paper.Point(-other, i);
          let lineYB = new paper.Path.Line({
            from: left,
            to: right,
            strokeColor: this.chipColor,
          });
        }
        // (i, other)当前遍历点坐标abs
        if (i !== 0) {
          let leftT = new paper.Point(-other, -i);
          let rightT = new paper.Point(other, -i);
          let lineYT = new paper.Path.Line({
            from: leftT,
            to: rightT,
            strokeColor: this.chipColor,
          });
        }        
        i = i + this.chipSize.height;
      }      
      layerLine.opacity = 0
    },
    // 基于指定半径的圆，画内圆
    drawInnerCircle(info, radius) {
      let xBot = info.DOWN * this.ratio / 2;
      let yBot = getAnotherPoint(xBot, radius);
      let Botleft = new paper.Point(-xBot, yBot);
      let Botright = new paper.Point(xBot, yBot);
      let through = new paper.Point(0, -radius);
      let pp = new paper.Path.Arc({
        from: Botleft,
        through: through,
        to: Botright,
        strokeColor: "rgb(150,150,150)",
        closed: true,
      });
      pp.strokeWidth = '2'
      if (info.LEFT) {
        // 若还存在left，需额外操作
        let yLeft = info.LEFT / 2;
        let xLeft = getAnotherPoint(yLeft, radius);
        let leftTop = new paper.Point(-xLeft, -yLeft);
        let leftBot = new paper.Point(-xLeft, yLeft);
        let throughleft = new paper.Point(0, -radius);
        let ppp = new paper.Path.Arc({
          from: leftTop,
          through: throughleft,
          to: leftBot,
          strokeColor: "rgb(150,150,150)",
          closed: true,
        });
        let fina = pp.intersect(ppp);
        fina.strokeColor = "rgb(150,150,150)";
        fina.strokeWidth = '2'
        pp.remove();
        ppp.remove();
      }

    },
    // 初始化画布，并确认相关参数初始值
    init() {
      const canvas = this.$refs.main_canvas;
      this.WIDTH = canvas.clientWidth;
      this.HEIGHT = canvas.clientHeight;
      this.radius = Math.min(this.WIDTH, this.HEIGHT) / 2 - 10;
      this.realRadius = Number(this.waferInfo.radius);
      this.ratio = Number(this.radius / this.realRadius.toFixed(2));
      // @chenkai temp
      // if (this.ratio == Infinity){
      //   this.ratio = 1.0
      // }
      
      const width = this.picViewSize.w / 1000 * this.ratio
      const height = this.picViewSize.h / 1000 * this.ratio
      this.pointerData.width = width
      this.pointerData.height = height
      // this.pointerData.width =  this.pointerData.width * this.ratio
      // this.pointerData.height =  this.pointerData.height * this.ratio
      if (this.chipInputInfo) {
        this.innerRadius = this.radius - this.chipInputInfo.edge_exclusion * this.ratio;
      } else {
        this.innerRadius = this.radius - 3 * this.ratio;
      }
      paper.setup(canvas);
      this.paper = paper;
      this.paper.view.setCenter(0, 0);
      this.paper.project.name = 'circle'
      if (this.$route.name !== 'portalmain') {
        this.paper.view.onMouseMove = (e) => {this.onMouseMove(e)}
        this.paper.view.onMouseDown = (e) => {this.onClickChip(e)}
      }
    },
    // 外圆
    drawCircle() {
      let circleOut = new paper.Path.Circle({
        center: 0,
        radius: this.radius,
        strokeColor: "grey",
        fillColor: 'white'
      });
    },
    // 创建中心图形
    creatpointer(point) {
      let layerPointer = new paper.Layer()
      layerPointer.name = 'layerPointer'
      this.pointerData.pointer = new paper.Path.Rectangle({
        center: point,
        width: this.pointerData.width,
        height: this.pointerData.height,
        opacity: 0.5,
        fillColor: '#650D65'
      })
      this.currentProject.insertLayer(this.currentProject.layers.length - 2, layerPointer)      
    },
    // 纠正移动越界
    modifyMovePoint(point) {
      let xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2;
      let yBot = getAnotherPoint(xBot, this.innerRadius);
      if (point.y > yBot) {
        point.y = yBot
      }
      return point
    },
    // drawpointer: 移动pointor
    movePointer(e) {
      let _point = this.modifyMovePoint(e.point)
      if (!this.pointerData.pointer) {
        this.creatpointer(_point)
      }
      this.pointerData.pointer.position = _point
    },
    // 在circle项目中的指定位置点e，绘制layerXY图层, 若存在，直接覆盖
    drawXY(e) {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let data = getLineData(e.point, this.innerRadius)
      if (currentProject.layers['layerXY']) {
        currentProject.layers['layerXY'].remove()
      }
      let layerXY = new paper.Layer()
      layerXY.name = 'layerXY'      
      let xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2;
      let yBot = getAnotherPoint(xBot, this.innerRadius);
      if (data[1].two[1] > yBot) {
        data[1].two[1] = yBot
      }
      if (data[0].one[1] > yBot) {
        data[0].one[1] = yBot
        data[0].two[1] = yBot
      }
      let X = new paper.Path.Line({
        from: new paper.Point(data[0].one[0], data[0].one[1]), 
        to: new paper.Point(data[0].two[0], data[0].two[1]), 
        strokeColor: '#650D65'
      })      
      let Y = new paper.Path.Line({
        from: new paper.Point(data[1].one[0], data[1].one[1]), 
        to: new paper.Point(data[1].two[0], data[1].two[1]), 
        strokeColor: '#650D65'
      })  
      currentProject.insertLayer(currentProject.layers.length - 2, layerXY)      
    },
    onMouseMove(e) {
      let point = preDealPoint(e.point, this.ratio)
      if (e.point.getDistance(new paper.Point(0)) <= this.innerRadius) {
        this.$emit('handleCircleOperation', {
          type: 'mouseMove',
          data: point
        })
        this.drawXY(e)
      }
    },  
    // 先批量处理点数据坐标信息，再绘制数据点
    // 内圆同数据处于同一图层
    drawData() {
      // console.log('this.defectList>>', this.defectList)
      // 基于当前晶圆大小，处理数据点信息
      this.setActiveProject('circle')
      let dotData = this.defectList.map((item) => {
        return {
          pos_x: Number((Number(item.pos_x) * this.ratio).toFixed(2)),
          pos_y: Number((Number(item.pos_y) * this.ratio).toFixed(2)),
          class_color: item.class_color,
          class_id: item.class_id,
          id: item.id,
          channel: item.channel
        };
      });
      const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let layerDot = currentProject.layers['layerData']
      if (!layerDot) {
        let layerDot = new paper.Layer();
        layerDot.name = 'layerData'
      } else {
        layerDot.removeChildren()
        layerDot.activate()
      }
      this.drawInnerCircle(this.waferInfo.flat_edge, this.innerRadius)
      dotData.forEach((item) => {
        let p = new paper.Path.Circle({
          center: new paper.Point(item.pos_x, item.pos_y),
          radius: 1.5,
          fillColor: this.classColors[item.class_id],
        });
        p.class_id = item.class_id;
        p.data_id = item.id;
        p.channel = item.channel
        p.onClick = (e) => {
          if (this.$route.name !== 'portalmain')
            this.setSelectedCenter({id: item.id, point: preDealPoint(e.point, this.ratio), from: 'circle'})
        }
      });
      this.setActiveProject(null)
    },
    onClickChip(e, chipIndex=null) {
      const chipLayer = this.paper.projects.filter((item) => item.name === 'circle')[0].layers['layerChip']
      if (!chipLayer || !chipLayer.opacity) return
      let originChipSize = { width: 2 * this.ratio, height: 2 * this.ratio }
      if (this.chipInputInfo) {
        originChipSize = {
          width: this.chipInputInfo.chipSize.width * this.ratio,
          height: this.chipInputInfo.chipSize.height * this.ratio,
        }
      }
      const chipSize = {
        width: Number(originChipSize.width.toFixed(0)),
        height: Number(originChipSize.height.toFixed(0))
      }
      let chip = chipIndex
      const inside = (x, y, radius) => x*x + y*y <= radius * radius
      if (!chip) {
        const { x, y } = e.point
        const xBot = this.waferInfo.flat_edge.DOWN * this.ratio / 2;
        let yBot = getAnotherPoint(xBot, this.innerRadius);
        yBot = Math.floor(yBot / chipSize.height) * chipSize.height
        if (!inside(x, y, this.innerRadius) || y >= yBot) return
        chip = {x: Math.floor((x + 0.5 * originChipSize.width) / originChipSize.width), y: Math.ceil(y / originChipSize.height)}
      }
      const point = { x: chip.x * originChipSize.width, y: (chip.y - 0.5) * originChipSize.height }
      const corner = (x, y, w, h) => [x > 0 ? x + w/2 : x - w/2, y > 0 ? y + h/2 : y - h/2]
      if (!inside(...corner(point.x, point.y, chipSize.width, chipSize.height), this.innerRadius)) return
      this.movePointer({ point })
      this.setSelectedCenter({point: {x: point.x / this.ratio, y: point.y / this.ratio}, from: 'circle'})
      this.$emit('handleCircleOperation', 
        {
          type: 'defectClick',
          data: {
            point: preDealPoint(point, this.ratio),
            pointerData: {
              width: this.pointerData.width / this.ratio,
              height: this.pointerData.height / this.ratio,
            }
          }
        }
      )
      if (!chipIndex) {
        const index = 1 + this.chipIndices.findIndex(v => v[0] == chip.x && v[1] == (chip.y - 1)) // -1是因为x轴下面的是y=0
        this.setChip({ index, chip_x_index: chip.x, chip_y_index: chip.y, checked: true })
      }
    },    
    generateChipIndices() {
      const chipIndices = []
      let chipSize = { width: 2, height: 2 }
      if (this.chipInputInfo) {
        chipSize = {
          width: this.chipInputInfo.chipSize.width,
          height: this.chipInputInfo.chipSize.height
        }
      }
      const edge_exclusion = this.chipInputInfo ? this.chipInputInfo.edge_exclusion : 3
      const innerRadius = this.realRadius - edge_exclusion
      const { width, height } = chipSize
      // 计算底座端点坐标abs(xBot, yBot)
      let xBot = this.waferInfo.flat_edge.DOWN / 2;
      let yBot = getAnotherPoint(xBot, innerRadius)
      // y方向,即左右方向
      for (let i = height; i < innerRadius; i += height) {
        let other = getAnotherPoint(i, innerRadius)
        let dist = Math.abs(2 * other)
        let xNum = Math.floor(dist / width)
        if (!(xNum % 2)) xNum -= 1
        let xindex = -Math.floor(xNum / 2)
        const yindex = Math.round(i / height)
        for (let j = 0; j < xNum; j++) {
          chipIndices.push([xindex++, -yindex])
        }
        xindex = -Math.floor(xNum / 2)
        if (i < yBot) {
          for (let j = 0; j < xNum; j++) {
            chipIndices.push([xindex++, yindex - 1])
          }
        }
      }
      chipIndices.sort((a, b) => (a[0] - b[0]) || (a[1] - b[1]))
      return chipIndices
    },
    handleClcikData(e) {
      if (this.$route.name === 'portalmain') return
      const id = e.target.data_id
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      let currentLayer = currentProject.layers['layerData']
      if (e.target._b) {
        e.target.scaling = new paper.Point(0.5)
        e.target._b = false
      } else {
        // 放大当前缺陷点后，将其他方法点复原
        e.target.scaling = new paper.Point(2)
        e.target._b = true
        currentLayer.children.forEach((item, index) => {
          if (index !== 0) {
            if (item.data_id !== id && item._b) {
              item.scaling = new paper.Point(0.2)
              item._b = false
            }
          }
        })
      }
      // this.onMouseDown(e, id)
      this.$emit('handleCircleOperation', 
        {
          type: 'defectClick',
          data: {
            id: id,
            point: preDealPoint(e.point, this.ratio),
            pointerData: {
              // width: this.pointerData.width / this.ratio,
              // height: this.pointerData.height / this.ratio,
              width: this.selectedArea.size.width / this.selectedArea.ratio,
              height: this.selectedArea.size.height / this.selectedArea.ratio,
            }
          }
        }
      )
      // this.movePointer(e)
    },
    drawChipLayer() {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let layerChip = currentProject.layers['layerChip']
      if (!layerChip) {
        layerChip = new paper.Layer()
        layerChip.name = 'layerChip'
      } else {
        layerChip.activate()
      }
      let raster = new paper.Raster(this.otherLayersInfo.chipImg)
      raster.onLoad = () => {
        let layer = currentProject.layers[0]
        raster.fitBounds(layer.bounds, false)
        layerChip.opacity = this.defectCompData?this.defectCompData[1].checkBoxData?this.defectCompData[1].sliderData: 0: 0
      }
      layerChip.onMouseDown = this.onClickChip
    },    
    drawDestinyLayer() {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let layerDestiny = currentProject.layers['layerDestiny']
      if (!layerDestiny) {
        layerDestiny = new paper.Layer()
        layerDestiny.name = 'layerDestiny'
      } else {
        layerDestiny.activate()
      }
      let raster = new paper.Raster(this.otherLayersInfo.destinyImg)
      raster.onLoad = () => {
        let layerData = currentProject.layers[0]
        raster.fitBounds(layerData.bounds, false)
        layerDestiny.opacity = this.defectCompData?this.defectCompData[2].checkBoxData?this.defectCompData[2].sliderData: 0: 0
      }
    },
    drawBfLayer() {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let layerBf = currentProject.layers['layerBf']
      if (!layerBf) {
        layerBf = new paper.Layer()
        layerBf.name = 'layerBf'
      } else {
        layerBf.activate()
      }
      let raster = new paper.Raster(this.otherLayersInfo.bfImg)
      raster.onLoad = () => {
        let layerData = currentProject.layers[0]
        raster.fitBounds(layerData.bounds, false)
        layerBf.opacity = this.defectCompData?this.defectCompData[3].checkBoxData?this.defectCompData[3].sliderData: 0: 0
      }
    },
    drawPlLayer() {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let layerPl = currentProject.layers['layerPl']
      if (!layerPl) {
        layerPl = new paper.Layer()
        layerPl.name = 'layerPl'
      } else {
        layerPl.activate()
      }
      let raster = new paper.Raster(this.otherLayersInfo.plImg)
      raster.onLoad = () => {
        let layerData = currentProject.layers[0]
        raster.fitBounds(layerData.bounds, false)
        layerPl.opacity = this.defectCompData?this.defectCompData[4].checkBoxData?this.defectCompData[4].sliderData: 0: 0
      }
    },
    // data图层置顶
    topLayerData() {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      let layerData = currentProject.layers['layerData']
        currentProject.insertLayer(currentProject.layers.length - 1, layerData)      
    },
    // 框选区域次顶
    secondLayerPoint() {
      let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      let layerPointer = currentProject.layers['layerPointer']
      currentProject.insertLayer(currentProject.layers.length - 2, layerPointer)      
    },
    // Main页面绘制当前正在扫描的小红框
    drawRealtimeScanningBox() {
      // let layerScanning = new paper.Layer();
      // layerScanning.name = 'layerScanning'
      // console.log("realtimeScanningBoxInfo", this.realtimeScanningBoxInfo)

      this.setActiveProject('circle')
      const currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      currentProject.activate()
      let layerScanningBox = currentProject.layers['layerScanningBox']
      if (!layerScanningBox) {
        let layerScanningBox = new paper.Layer();
        layerScanningBox.name = 'layerScanningBox'
      } else {
        layerScanningBox.removeChildren()
        layerScanningBox.activate()
      }

      if (this.realtimeScanningBoxInfo 
        && 'x' in this.realtimeScanningBoxInfo
        && 'y' in this.realtimeScanningBoxInfo
        && 'w' in this.realtimeScanningBoxInfo
        && 'h' in this.realtimeScanningBoxInfo      
      ) {
        let convertedBoxInfo = {}
        convertedBoxInfo['x'] = Number((Number(this.realtimeScanningBoxInfo['x']) * this.ratio).toFixed(2))
        convertedBoxInfo['y'] = Number((Number(this.realtimeScanningBoxInfo['y']) * this.ratio).toFixed(2))
        convertedBoxInfo['w'] = Number((Number(this.realtimeScanningBoxInfo['w']) * this.ratio).toFixed(2))
        convertedBoxInfo['h'] = Number((Number(this.realtimeScanningBoxInfo['h']) * this.ratio).toFixed(2))
        // console.log("draw scanning box on position:", this.ratio)
        
        this.scanningBox = new paper.Path.Rectangle({
          point: [convertedBoxInfo['x'], convertedBoxInfo['y']],
          // draw a square
          size: [convertedBoxInfo['w'], convertedBoxInfo['w']],
          // strokeColor: 'white',
          opacity: 0.5,
        });
      }
      else{
        if (process.env.VUE_APP_MODE == 'development'){
          this.$message.warning("未获取到实时扫描位置信息")
        }
      }

      this.setActiveProject(null)

      if (this.scanningBoxInterval == null){
        // console.log("set scanningBoxInterval")
        this.scanningBoxInterval = setInterval(() => {
          if (this.scanningBox != null){
            if (this.scanningBox.fillColor != null) {
              this.scanningBox.fillColor = null
            }
            else{
              this.scanningBox.fillColor = '#ff0000'
            }
          }
        }, 1000)
      }
    },
    // 确保layerData等层的次序 
    seqLayers() {
      this.topLayerData()
      this.secondLayerPoint()
    }
  },
  mounted() {
    console.time("Circle-time");
    this.init();
    this.drawCircle();
    this.drawData();
    this.chipIndices = this.generateChipIndices()
    if (this.$route.name !== 'portalmain') {
      this.drawXY({point: new paper.Point(0)})
      this.movePointer({point: new paper.Point(0)})
    }    
    if (this.otherLayersInfo && this.otherLayersInfo.destinyImg) {
      this.drawDestinyLayer()
    }
    if (this.otherLayersInfo && this.otherLayersInfo.bfImg) {
      this.drawBfLayer()
    }
    if (this.otherLayersInfo && this.otherLayersInfo.plImg) {
      this.drawPlLayer()
    }   
    if (this.otherLayersInfo && this.otherLayersInfo.chipImg) {
      this.drawChipLayer()
    }
    if (this.$route.name == 'portalmain') {
      this.drawRealtimeScanningBox()
    }
    this.seqLayers()
    console.timeEnd("Circle-time");
    console.log('circel-paperscope--->', this.paper)
  },
  beforeDestroy() {
    let project = this.paper.projects.filter((item) => item.name === 'circle')[0]
    project.remove()
  },
  computed: {
    ...mapState('admin/paper', ['activeProject']),
    ...mapState('admin/selection', ['selectedArea', 'chipInfo']),
    centerAreaInfo() {
      return JSON.parse(sessionStorage.getItem("chipInputInfo")).chipSize
    },    
    showPointer() {
      if (this.$route.name !== 'portalmain') {
        return 'cursor: none'
      }
    },
    classColors() {
      return JSON.parse(sessionStorage.getItem('classColors'))
    },
    currentProject() {
      return this.paper.projects.filter((item) => item.name === 'circle')[0] 
    },
    picViewSize() {
      return JSON.parse(sessionStorage.getItem("picViewSize")) || {w: 1000, h: 1000}
    }
  },    
  watch: {
    'otherLayersInfo.chipImg'() {
      this.drawChipLayer()
      this.seqLayers()
    },
    'otherLayersInfo.plImg'() {
      this.drawPlLayer()
      this.seqLayers()
    },
    'otherLayersInfo.bfImg'() {
      this.drawBfLayer()
      this.seqLayers()
    },
    'otherLayersInfo.destinyImg'() {
      this.drawDestinyLayer()
      this.seqLayers()
    },
    // 监听area数据变化
    selectedArea(val, old) {
      const diff = getDiff(val, old)
      const operation = {
        id: () => {
          if (!val.id) return
          this.currentId = val.id
          let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
          let currentLayer = currentProject.layers['layerData']
          const p = currentLayer.children.find(item => item.data_id == val.id)
          if (!p) return;
          const point = {x: val.point.x * this.ratio, y: val.point.y * this.ratio}
          this.handleClcikData({ target: p, point })
          this.drawXY({ point })
          this.movePointer({ point })
        },
        point: () => {
          const point = {x: val.point.x * this.ratio, y: val.point.y * this.ratio}
          this.drawXY({point})
          this.movePointer({point})
        },
        size: () => {
          const size = {...val.size}
          size.width *= this.ratio, size.height *= this.ratio
          if (this.pointerData.pointer) this.pointerData.pointer.remove()
          this.pointerData = size
          const point = {x: val.point.x * this.ratio, y: val.point.y * this.ratio}
          this.movePointer({point}) // 这里是重绘方块
        },
        ratio: () => {
          if (!this.picViewSize) return
          const zoom = val.ratio
          const position = new paper.Point(this.pointerData.pointer.position)
          this.pointerData.width = val.size.width * this.ratio / zoom
          this.pointerData.height = val.size.height * this.ratio / zoom
          // console.log('pointer data in review circle: ', this.pointerData, this.ratio, zoom, this.picViewSize)
          let oldLayer = this.currentProject.layers.filter((_layer) => _layer.name === 'layerPointer')[0]
          oldLayer.remove()
          this.pointerData.pointer.remove()
          this.pointerData.pointer = null
          this.movePointer({
            point: position
          })
        }
      }
      diff.forEach(e => operation[e] && operation[e]())
      // if (val.from !== 'table') return
      // if (!val || !val.id || val.id == this.currentId) return;
      // this.currentId = val.id
      // let currentProject = this.paper.projects.filter((item) => item.name === 'circle')[0]
      // let currentLayer = currentProject.layers['layerData']
      // const p = currentLayer.children.find(item => item.data_id == val.id)
      // if (!p) return;
      // this.handleClcikData({ target: p, point: { x: val.point.x * this.ratio, y: val.point.y * this.ratio } })
      // const point = { point: new paper.Point({ x: val.point.x * this.ratio, y: val.point.y * this.ratio }) }
      // this.drawXY(point)
      // this.movePointer(point)
    },
    chipInfo(val) {
      const chipLayer = this.paper.projects.filter((item) => item.name === 'circle')[0].layers['layerChip']
      if (!chipLayer || !chipLayer.opacity) return
      this.onClickChip(null, {x: val.chip_x_index, y: val.chip_y_index})
    },
    defectList() {
      this.drawData();
    },
    realtimeScanningBoxInfo(val){
      this.drawRealtimeScanningBox()
    },
  }
};
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
