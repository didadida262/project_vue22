<template>
  <div class="draw-container">

    <!-- 所有笔刷 -->
    <div class="tool">
      <Pencil
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <oldBrush
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />      
      <killBrush
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />      
     </div>
      <!-- style="cursor:none" -->

    <Content
      :class="[{'cursorpointerNone-st': activatedBrush === 'old_brush' || activatedBrush === 'kill_brush'}]"
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

export default {
  name: 'Dashboard',
  components: {
    Content,
    Pencil,
    oldBrush,
    killBrush
  },
  data() {
    return {
      // 当前激活工具
      activatedBrush: '',
      tool: null,





      isActive: 'old_brush',
      lastDragPoint: null,
      layer: null,
      selection: null,
      brush: {
        pathOptions: {
          strokeColor: "black",
          strokeWidth: 1,
          radius: 10,
          btype: "circle"  // circle ||  rectangle
        }
      },
      //       this.brush.path = null
      // this.selection = null
      strokeEnds: 6,
      currentTool: null,
      firstPoint: null,
      lastPoint: null,
      test: null,
      info: 'hhvcg',
      myPath: null,
      myPaths: [],
      paper: null,
      image: {
        url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
      },

    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    // currentTool(newVal, oldVal) {
    //   // 像素笔刷
    //   if (newVal === 'pixelbrush') {
    //     this.tool.onMouseDown = (e) => {
    //       // console.log('tool点击:', e.point)
    //       const newP = new paper.Point(Math.floor(e.point.x), Math.floor(e.point.y))
    //       // console.log('newP:', newP)

    //       this.myPath = new this.paper.Path.Rectangle(new paper.Point(Math.floor(e.point.x), Math.floor(e.point.y - 0.5) + 0.5), new paper.Size(1, 1))
    //       this.myPath.fillColor = 'black'
    //     }
    //   } else if (newVal === 'pencil') {
    //     // 绑定铅笔的事件
    //     this.tool.onMouseDown = (e) => {
    //       this.selection = new paper.Path({
    //         strokeColor: '#00000',
    //         strokeWidth: 1,
    //         strokeCap: 'round'

    //       })
    //       this.selection.add(e.point)
    //     }
    //     // console.log(this.paper.view)
    //     this.tool.onMouseDrag = (e) => {
    //       this.selection.add(e.point)
    //     }
    //     this.tool.onMousUp = (e) => {
    //       this.selection.simplify(10)
    //       this.selection.smooth()
    //       this.selection = null
    //     }
    //   } else if (newVal === 'fat_brush') {
    //     this.tool.onMouseDown = (e) => {
    //       this.selection = new paper.Path()
    //       this.selection.fillColor = {
    //         hue: Math.random() * 360,
    //         saturation: 1,
    //         brightness: 1
    //       }
    //       this.selection.add(e.point)
    //     }
    //     this.tool.onMouseDrag = (e) => {
    //       const step = e.delta.divide(2)
    //       step.angle += 90

    //       const top = e.middlePoint.add(step)
    //       const bottom = e.middlePoint.subtract(step)

    //       this.selection.add(top)
    //       this.selection.insert(0, bottom)
    //       this.selection.smooth()
    //     }
    //     this.tool.onMouseUp = (e) => {
    //       // console.log('e.delta--->', e.delta)
    //       // console.log('e.delta3--->', e.delta.multiply(3))

    //       this.selection.add(e.point)
    //       this.selection.closed = true
    //       this.selection.smooth()
    //     }
    //   } else if (newVal === 'broom_brush') {
    //     this.tool.fixedDistance = 30
    //     // 触发drag需要拖拽的最大距离
    //     // 这里我觉得很奇怪,tool有最大距离和最小距离....

    //     // this.tool.maxDistance = 45
    //     // this.tool.maxDistance = 1;
    //     // 扫把头
    //     this.tool.onMouseDown = (e) => {
    //       // console.log('开始点:', e)
    //       this.selection = new paper.Path()
    //       this.selection.fillColor = {
    //         hue: Math.random() * 360,
    //         saturation: 1,
    //         brightness: 1
    //       }
    //     }
    //     this.tool.onMouseDrag = (e) => {
    //       // console.log('drag---->', e)
    //       // if(e.count == 0) {
    //       //   // console.log('存在?')
    //       //   this.addStrokes(e.middlePoint, e.delta.multiply(-1));
    //       // } else {
    //       const step = e.delta.divide(2)
    //       step.angle += 90

    //       const top = e.middlePoint.add(step)
    //       const bottom = e.middlePoint.subtract(step)
    //       this.selection.add(top)
    //       this.selection.insert(0, bottom)
    //       // }
    //       this.selection.smooth()
    //       this.lastPoint = e.middlePoint.clone()
    //     }
    //     this.tool.onMouseUp = (e) => {
    //       // console.log('结束点:', e)
    //       const delta = e.point.subtract(this.lastPoint)
    //       delta.length = this.tool.maxDistance
    //       // this.addStrokes(e.point, delta);
    //       this.selection.closed = true
    //       this.selection.smooth()
    //     }
    //   } else if (newVal === 'old_brush') {

    //     // this.tool.onMouseDown = (e) => {
    //     //   this.selection = new paper.Path({
    //     //     strokeColor: this.brush.pathOptions.strokeColor,
    //     //     strokeWidth: this.brush.pathOptions.strokeWidth
    //     //   })
    //     // }
    //     this.tool.onMouseDown = (e) => {
    //         let _point = e.point
    //         this.lastDragPoint = e.point
    //         // let p_x = Math.abs(_point.x) + this.brush.pathOptions.radius
    //         // let p_y = Math.abs(_point.y) + this.brush.pathOptions.radius
    //         this.createSelection();
    //     }

    //     // this.tool.onMouseDrag = (e) => {
    //     //   // let newSelection = this.selection.unite(this.brush.path);
    //     //   const newSelection = this.selection.unite(this.brush.path)
    //     //   this.selection.remove()
    //     //   this.selection = newSelection
    //     // }
    //     this.tool.onMouseMove = (e) => {
    //       this.moveBrush(e.point)
    //     }         
    //     this.tool.onMouseDrag = (e) => {
    //         let _point = e.point
    //         this.moveBrush(_point);
    //         this.draw(e.point);
    //     }
    //     this.tool.onMouseUp = (e) => {
    //       // this.merge();
    //         this.lastDragPoint = null
    //       console.log('销毁前--->', this.selection)
    //       // this.removeSelection();
    //     }
    //   } else if (newVal === 'kill_brush') {

    //     this.tool.fixedDistance = this.brush.pathOptions.radius / 2
    //     // this.tool.fixedDistance = 1
    //     // 触发drag需要拖拽的最大距离
    //     // 这里我觉得很奇怪,tool有最大距离和最小距离....

    //     // this.tool.maxDistance = 45
    //     // this.tool.maxDistance = 1;
    //     // 扫把头
    //     this.tool.onMouseDown = (e) => {
    //       console.log('onMouseDown点---->:', e)
    //       // const header = new paper.Path.Circle(e.point, new paper.Size(10))
    //       this.selection = new paper.Path()
    //       this.selection.unite(new paper.Path.Circle(e.point, new paper.Size(this.brush.pathOptions.radius)))

    //       // this.selection = this.selection.unite(header).clone()
    //       // header = null
    //       // const header = this.brush.path.clone()
    //       // header.position = e.
    //       // this.selection = this.selection.unite(this.brush.path).clone()
    //       console.log('onMouseDownSel---->:', this.selection)
    //       // this.header = this.brush.path.clone()
    //       // this.selection = this.selection.unite(this.brush.path).clone()
    //       // this.selection.unite(this.brush.path)
    //       // const step = e.delta.divide(2)
    //       // step.angle += 90
    //       // const top = e.downPoint.add(step.normalize().multiply(this.brush.pathOptions.radius))
    //       // const bottom = e.downPoint.subtract(step.normalize().multiply(this.brush.pathOptions.radius))
    //       // this.selection.add(top)
    //       // this.selection.insert(0, bottom)
    //       // // }
    //       // this.selection.smooth()       
    //     }
    //     this.tool.onMouseMove = (e) => {
    //       this.moveBrush(e.point)
    //     } 
    //     this.tool.onMouseDrag = (e) => {
    //       console.log('onMouseDrag点---->:', e)
    //       this.moveBrush(e.point)
    //       this.layer.selected = true
    //       const step = e.delta.divide(2)
    //       step.angle += 90

    //       const bottom = e.middlePoint.add(step.normalize().multiply(this.brush.pathOptions.radius))
    //       const top = e.middlePoint.subtract(step.normalize().multiply(this.brush.pathOptions.radius))
    //       this.selection.add(bottom)
    //       this.selection.insert(0, top)
    //       // }
    //       console.log('onMouseDragSel---->:', this.selection)
    //       // this.selection.smooth()
    //     }
    //     this.tool.onMouseUp = (e) => {
    //       console.log('onMouseUp点---->:', e)
    //       // this.selection.curves.splitAt(this.selection.segments.length / 2)
    //       // this.selection.add(e.point)
        
    //       // this.selection.closed = true
    //       // 直接加上当前笔刷
    //       this.selection.unite(this.brush.path)
    //       // this.selection.closed = true
    //       // this.selection.curves.splice(news.segements / 2 - 1, 1)
    //       // this.selection = this.selection.clone()
    //       // this.selection.smooth()
    //       console.log('onMouseUpSel---->:', this.selection)
    //     }
    //   }
    // }
  },
  mounted() {
    this.init()
    // console.log('this.paper---', this.paper)
  },
  methods: {
    changeBrush(brush) {
      this.activatedBrush = brush
      this.$message(`切换至${brush}`)
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
        let newSelection = this.selection.unite(this.brush.path);
        this.selection.remove();
        this.selection = newSelection;
        // this.selection.intersect(this.brush.path)

      }
    },
    createSelection() {
      // 笔刷工具可以继续标注
      this.selection = new paper.Path({
        strokeColor: this.brush.pathOptions.strokeColor,
        strokeWidth: this.brush.pathOptions.strokeWidth
      });
    },
    moveBrush(point) {
      if (this.brush.path == null) this.createBrush();
      this.brush.path.bringToFront();
      this.brush.path.position = point;
    },
    createBrush(center) {
      center = center || new paper.Point(0, 0);
      if (this.brush.pathOptions.btype==='circle'){
        this.brush.path = new paper.Path.Circle({
          strokeColor: this.brush.pathOptions.strokeColor,
          strokeWidth: this.brush.pathOptions.strokeWidth,
          radius: this.brush.pathOptions.radius,
          center: center
        });
      }else {
        this.brush.path = new paper.Path.Rectangle({
          size: [this.brush.pathOptions.radius * 2, this.brush.pathOptions.radius * 2],
          strokeColor: this.brush.pathOptions.strokeColor,
          strokeWidth: this.brush.pathOptions.strokeWidth,
          center: center
        });
      }
    },     
    
    // 。。。。。。。。。。。。。。
    // 。。。。。。。。。。。。。。
    // 。。。。。。。。。。。。。。
    // 。。。。。。。。。。。。。。
    init() {
      const canvas = this.$refs.Content.$refs.main_canvas
      paper.setup(canvas)
      this.paper = paper
      this.image.raster = new paper.Raster(this.image.url)
      this.tool = new paper.Tool()
      // this.mask_png = new paper.Raster('http://zhuoxilab.com:10444/file_0/2,035e7ca1c5d1ae?rend=1649939540571');
      this.image.raster.smoothing = false
      this.image.raster.onLoad = () => {
        // 让图片raster的宽高自适应view这个容器
        this.image.raster.fitBounds(this.paper.view.bounds, false)
      }

      // 绑定各种事件函数
      this.paper.view.setCenter(0, 0)
      this.paper.view.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = this.paper.project.activeLayer
          layer.selected = !layer.selected
        }
      }
      // const vector = x2Center.subtract(x1Center)
      // for (let i = 1; i < vector.length; i++) {
      //   const newPoint = x1Center.add(vector.normalize().multiply(i))
      //   this.x3 = new paper.Path.Circle(newPoint, new paper.Size(10))
      //   this.x3.fillColor = 'green'
      // }
    },    // // 笔刷跟随鼠标移动

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
    unite(path) {
      // console.log('输出path:', path)
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

  },
  created() {
    this.log('父组件---created')
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/draw/index.scss'
</style>
