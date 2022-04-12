<template>
  <div class="draw-container">
    <Tool
      @handleChange="handleChange"
    />
    <Content
      ref="Content"
      @shortCut="onWheel"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tool from './Tool'
import Content from './Content'
import paper from 'paper'

export default {
  name: 'Dashboard',
  components: {
    Tool,
    Content
  },
  data() {
    return {
      strokeEnds: 6,
      currentTool: null,
      lastPoint: null,
      test: null,
      brush: null,
      selection: null,
      info: 'hhvcg',
      myPath: null,
      myPaths: [],
      paper: null,
      tool: null,
      image: {
        url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
      }
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.init()
  },
  methods: {
    handleChange(e) {
      this.selection = null
      this.tool.onMouseUp = () => {}
      this.tool.onMouseDown = () => {}
      this.tool.onMouseDrag = () => {}
      this.currentTool = e
      this.$message({
        message: `切换画笔至${e}`,
        type: 'success'
      });      
    },
    // 对加载图像自适应
    fit() {
      const frame = this.$refs.Content.$refs.content
      // 首先拿到当前图片宽高
      let parentX = this.image.raster.width
      let parentY = this.image.raster.height
      console.log('div宽高:', frame.clientWidth,frame.clientHeight)
      console.log('图片宽高:', parentX,parentY)
      // 计算缩放因子
      // 规则:分别计算canvas画布宽高是图片宽高各自的倍数,最后取最小值作为整体的放大倍数
      let w = frame.clientWidth / parentX
      let h = frame.clientHeight / parentY
      let ratio = Math.min(
          frame.clientWidth / (parentX + Math.pow(Math.E, -6)),
          (frame.clientHeight - 100) / (parentY + Math.pow(Math.E, -6))
        ) + Math.pow(Math.E, -6)
        // this.paper.view.zoom = ratio
        this.paper.view.zoom = Math.min(w, h)
        // console.log('this.paper.view:', JSON.stringify(this.paper.view.center))
        this.paper.view.setCenter(0, 0);
        // this.image.scale = 1 / this.paper.view.zoom;
        console.log('this.image:', this.image)
    },
    init() {
      const canvas = this.$refs.Content.$refs.main_canvas
      paper.setup(canvas)
      this.paper = paper

      this.image.raster = new paper.Raster(this.image.url)
      this.image.raster.smoothing = false

      this.image.raster.onLoad = () => {
        console.log('图片加载成功！！！')
        // this.image.raster.sendToBack();
        console.log('this.paper',this.paper)
        this.fit()
      }

      // const viewheight = this.paper.view.size.height
      // const viewwidth = this.paper.view.size.width
      // const imgwidth = this.image.raster.width
      // const imgheight = this.image.raster.height
      // // 按比例放大或缩小
      // let ratio = null
      // if (imgwidth >= imgheight) {
      //   ratio = viewwidth / imgwidth
      // } else {
      //   ratio = viewheight / imgheight
      // }
      // ratio = Math.floor(ratio)
      // console.log('ratio:', ratio)
      // this.image.raster.width = imgwidth * ratio
      // this.image.raster.height = imgheight * ratio
      // this.image.raster.position = this.paper.view.center
      // console.log('this.paper.view.center:', this.paper.view.center)

      // console.log('this.image.raster:', this.image.raster)
      // console.log('this.image.width', this.image.raster.width)
      // console.log('this.image.height', this.image.raster.height)
      // console.log('this.paper.view', this.paper.view.size)

      // 画一个圆
      // this.circle = new paper.Path.Circle(new paper.Point(100, 100), 10)
      // this.circle.strokeColor = 'red'
      

      // 绑定各种事件函数
      this.paper.view.onFrame = this.onFrame

      this.tool = new paper.Tool()
      this.paper.view.onMouseDown = this.onMouseDown
      this.tool.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = this.paper.project.activeLayer
          layer.selected = !layer.selected
          return false
        }
      }
    },
    addStrokes (point, delta) {
      // 原版的齿轮状
      let step = delta.rotate(90);
      let strokePoints = 6 * 2 + 1;
      point = point.subtract(step.divide(2));
      step = step.divide(strokePoints - 1);
      for(let i = 0; i < strokePoints; i++) {
        let strokePoint = point.add(step.multiply(i));
        let offset = delta.multiply((Math.random() * 0.3 + 0.1)) ;
        if(i % 2) {
          offset = offset.multiply(-1);
        }
        strokePoint = strokePoint.add(offset);
        this.selection.insert(0, strokePoint);
      }
      
      // 简易版,直接一个圆
          // const top = e.middlePoint.add(e.delta.rotate(90).normalize().multiply(10));

      // this.selection.insert(0, point.add(delta.normalize().multiply(10)));

    },
    unite(path) {
      console.log('输出path:', path)
    },
    removeMyPath () {
      if (this.myPath != null) {
        this.myPath.fullySelected = false
        this.myPath.remove();
        this.myPath = null
      }
    },  
    removeItem(item) {
      if (item.path != null) {
        item.path.remove();
        item.path = null;
      }
    },      
    // copy的函数，慎重使用
    changeZoom(delta, p) {
      const oldZoom = this.paper.view.zoom
      const c = this.paper.view.center
      const factor = 0.3 + oldZoom
      console.log('oldZoom:', oldZoom)
      console.log('factor:', factor)
      console.log('c:', c)

      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      const beta = oldZoom / zoom
      const pc = p.subtract(c)
      const a = p.subtract(pc.multiply(beta)).subtract(c)

      return { zoom: zoom, offset: a }
    },
    onWheel(e) {
      const point = {x: e.x, y: e.y} 
      console.log('滚动点:', point)
      if (e.wheelDelta > 0) {
        console.log('上滚动----放大')
      } else if (e.wheelDelta < 0) {
        console.log('下滚动----缩小')
      }
    },
    onFrame () {
    },
    onMouseDown (e) {
      console.log('click:', e.point)
    }
  },
  watch: {
    currentTool(newVal, oldVal) {
      if (newVal === 'pencil') {
        // 绑定铅笔的事件
        this.tool.onMouseDown = (e) => {
          this.selection = new paper.Path({
            strokeColor: '#00000',
            strokeWidth: 1
          })
          this.selection.add(e.point)
        }
        this.tool.onMouseDrag = (e) => {
          this.selection.add(e.point)
        }
        this.tool.onMousUp = (e) => {
          this.selection = null
        }
      } else if (newVal === 'brush') {
        // 绑定笔刷事件
        this.tool.onMouseDown = (e) => {
          console.log('开始点:', e)
          this.selection = new paper.Path()
          this.selection.fillColor =  {
            hue: Math.random() * 360,
            saturation: 1,
            brightness: 1
          };
          let bot = e.point.add(e.delta.rotate(90).normalize().multiply(10))
          let top = e.point.subtract(e.delta.rotate(90).normalize().multiply(10))
          this.selection.add(bot)
          this.selection.insert(0, top)
          this.selection.smooth()
        }
        this.tool.onMouseDrag = (e) => {
          let bot = e.point.add(e.delta.rotate(90).normalize().multiply(10))
          let top = e.point.subtract(e.delta.rotate(90).normalize().multiply(10))
          this.selection.add(bot)
          this.selection.insert(0, top)
          this.selection.smooth()
        }
        this.tool.onMouseUp = (e) => {
          console.log('结束点:', e)
          let bot = e.point.add(e.delta.rotate(90).normalize().multiply(10))
          let top = e.point.subtract(e.delta.rotate(90).normalize().multiply(10))
          this.selection.add(bot)
          this.selection.insert(0, top)
          this.selection.smooth()
        }
      } else if (newVal === 'fat_brush') {
        this.tool.onMouseDown = (e) => {
          this.selection = new paper.Path()
          this.selection.fillColor =  {
            hue: Math.random() * 360,
            saturation: 1,
            brightness: 1
          };
          this.selection.add(e.point)          
        }
        this.tool.onMouseDrag = (e) => {
          let step = e.delta.divide(2)
          step.angle += 90
          
          let top = e.middlePoint.add(step);
          let bottom = e.middlePoint.subtract(step);
          
          this.selection.add(top);
          this.selection.insert(0, bottom);
          this.selection.smooth();          
        }
        this.tool.onMouseUp = (e) => {
          console.log('e.delta--->',e.delta)
          console.log('e.delta3--->',e.delta.multiply(3))
          
          this.selection.add(e.point)
          this.selection.closed = true
          this.selection.smooth()
        }
      } else if (newVal === 'broom_brush') {
        this.tool.fixedDistance = 30;
        this.tool.maxDistance = 45;
        // 扫把头
        this.tool.onMouseDown = (e) => {
          console.log('开始点:', e)
          this.selection = new paper.Path()
          this.selection.fillColor = {
            hue: Math.random() * 360,
            saturation: 1,
            brightness: 1
          };          
        }
        this.tool.onMouseDrag = (e) => {
          if(e.count == 0) {
            this.addStrokes(e.middlePoint, e.delta * -1);
          } else {          
            let step = e.delta.divide(2);
            step.angle += 90;

            let top = e.middlePoint.add(step)
            let bottom = e.middlePoint.subtract(step)
            this.selection.add(top);
            this.selection.insert(0, bottom);          
          }
          this.selection.smooth()
          this.lastPoint = e.middlePoint.clone()
        }
        this.tool.onMouseUp = (e) => {
          console.log('结束点:', e)
          let delta = e.point.subtract(this.lastPoint)
          delta.length = this.tool.maxDistance;
          this.addStrokes(e.point, delta);
          this.selection.closed = true
          this.selection.smooth()
        }        
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.draw {
  &-container {
    margin: 30px;
  }
}
.draw-container {
  height: 80vh;
  display: flex;
  justify-content: space-between;
}
</style>
