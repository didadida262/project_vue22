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
      firstPoint: null,
      lastPoint: null,
      test: null,
      brush: {
        path: null
      },
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

    init() {
      const canvas = this.$refs.Content.$refs.main_canvas
      paper.setup(canvas)
      this.paper = paper
      this.image.raster = new paper.Raster(this.image.url)
      // this.mask_png = new paper.Raster('http://zhuoxilab.com:10444/file_0/2,035e7ca1c5d1ae?rend=1649939540571');
      this.image.raster.smoothing = false
      this.image.raster.onLoad = () => {
        this.fit()
      }


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
    // 以当前滚轮方向及真实坐标数据为输入
    changeZoom(delta, p) {
      console.log('方向---->', delta)
      console.log('滚轮所在真实坐标点---->', p)
      const oldZoom = this.paper.view.zoom
      console.log('oldZoom', oldZoom)
      const c = this.paper.view.center
      const factor = 0.3 + oldZoom
      // < 0:向上-->放大，反之向下--->缩小
      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      console.log('zoom', zoom)
      const beta = oldZoom / zoom
      const pc = p.subtract(c)
      const a = p.subtract(pc.multiply(beta)).subtract(c)
      console.log('a:', a)

      return { zoom: zoom, offset: a }
    },
    onWheel(e) {
      const point = {x: e.x, y: e.y}
      // if (e.wheelDelta > 0) {
      //   console.log('上滚动----放大')
      //   this.paper.view.setCenter(new paper.Point({x: e.x, y: e.y}))
      //   this.paper.view.zoom = this.paper.view.zoom +  0.5
      // } else if (e.wheelDelta < 0) {
      //   console.log('下滚动----缩小')
      // }
      let view = this.paper.view
      // view.viewToProject:这玩意儿能干嘛呢？将点转化为视图中点，即：视图中真实的点
      let viewPosition = view.viewToProject(
          new paper.Point(e.offsetX, e.offsetY)
      );

      // let transform = this.changeZoom(e.deltaY, viewPosition);
      // this.image.scale = transform.zoom;
      console.log('this.paper.view.zoom:',this.paper.view)
      if (e.deltaY < 0) {
        this.paper.view.zoom = this.paper.view.zoom + 0.5
      } else {
        if (this.paper.view.zoom - 0.5 > 0) {
          this.paper.view.zoom = this.paper.view.zoom - 0.5
        }
      }
      // this.paper.view.zoom = transform.zoom
      // this.paper.view.center = view.center.add(transform.offset);
    },
    // 根据加载图片宽高及外层div宽高，作自适应处理。
    fit() {
      const frame = this.$refs.Content.$refs.content
      let parentX = this.image.raster.width
      let parentY = this.image.raster.height
      // 计算缩放因子
      // 规则:分别计算canvas画布宽高是图片宽高各自的倍数,最后取最小值作为整体的缩放倍数
      let w = frame.clientWidth / parentX
      let h = frame.clientHeight / parentY
      let ratio = Math.min(w, h)
      this.paper.view.zoom = ratio - 0.1
      console.log('当前zoom:',this.paper.view.zoom)
      this.paper.view.setCenter(0, 0);
      console.log('当前zoom:',this.paper.view)

      this.image.scale = this.paper.view.zoom;
    },    
    onFrame () {
    },
    realXY (point) {
      return {
        x: point.x * this.image.scale,
        y: point.y * this.image.scale
      }
    },
    onMouseDown (e) {
      console.log('click:', e.point)
    },
    // 笔刷跟随鼠标移动
    moveBrush(point) {
      if (this.brush.path == null) this.createBrush(point);
      console.log('this.brush----',this.brush)
      this.brush.path.bringToFront();
      this.brush.path.position = point;
    }, 
    createBrush(center) {
      console.log('Jin--createBrush')
    //   center = center || new paper.Point(0, 0);
    //   console.log('center:', center)
      this.brush.path = new this.paper.Path.Circle({
        strokeColor: 'gree',
        strokeWidth: 20,
        radius: 10,
        center: center
     })
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
        // this.tool.onMouseMove = (e) => {
        //   this.moveBrush(e.point);
        // }
        this.tool.onMouseDown = (e) => {
          console.log('开始点:', e)
          this.selection = new paper.Path()
          this.selection.fillColor =  {
            hue: Math.random() * 360,
            saturation: 1,
            brightness: 1
          };
          this.firstPoint = e.point
        }
        this.tool.onMouseDrag = (e) => {
          console.log('拖动点---->', e)
          this.lastPoint = e.point
          // this.selection.removeSegments()
          const [top, bot] = this.getTopBot(this.firstPoint, this.lastPoint)
          this.selection.add(top)
          this.selection.add(bot)
          this.selection.closePath()
          this.firstPoint = this.lastPoint

          // 老版本
          // let bot = e.point.add(e.delta.rotate(90).normalize().multiply(10))
          // let top = e.point.subtract(e.delta.rotate(90).normalize().multiply(10))
          // this.selection.add(bot)
          // this.selection.insert(0, top)
          // this.selection.smooth()
        }
        this.tool.onMouseUp = (e) => {
          console.log('结束点:', e)
          this.lastPoint = e.point
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
        // 触发drag需要拖拽的最大距离
        // 这里我觉得很奇怪,tool有最大距离和最小距离....
        
        this.tool.maxDistance = 45;
        // this.tool.maxDistance = 1;
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
          console.log('drag---->', e)
          // if(e.count == 0) {
          //   console.log('存在?')
          //   this.addStrokes(e.middlePoint, e.delta.multiply(-1));
          // } else {          
            let step = e.delta.divide(2);
            step.angle += 90;

            let top = e.middlePoint.add(step)
            let bottom = e.middlePoint.subtract(step)
            this.selection.add(top);
            this.selection.insert(0, bottom);          
          // }
          this.selection.smooth()
          this.lastPoint = e.middlePoint.clone()
        }
        this.tool.onMouseUp = (e) => {
          console.log('结束点:', e)
          let delta = e.point.subtract(this.lastPoint)
          delta.length = this.tool.maxDistance;
          // this.addStrokes(e.point, delta);
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
