<template>
  <div class="draw-container">
    <Tool
      @changeRa="selectBrush"
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
      lastPoint: null,
      test: null,
      brush: null,
      selection: null,
      info: 'hhvcg',
      myPath: null,
      myPaths: [],
      ra: 20,
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
    selectBrush(ra) {
      if (ra === 'bbox') {
        console.warn('选中标注框')
      } else {
        this.ra = ra
      }
    },
    init() {
      const canvas = this.$refs.Content.$refs.main_canvas
      paper.setup(canvas)
      this.paper = paper
      console.log('paper:', this.paper)

      this.image.raster = new paper.Raster(this.image.url)
      this.image.raster.smoothing = false

      this.image.raster.onLoad = () => {
        console.log('图片加载成功！！！')
      }
      const viewheight = this.paper.view.size.height
      const viewwidth = this.paper.view.size.width
      const imgwidth = this.image.raster.width
      const imgheight = this.image.raster.height
      // 按比例放大或缩小
      let ratio = null
      if (imgwidth >= imgheight) {
        ratio = viewwidth / imgwidth
      } else {
        ratio = viewheight / imgheight
      }
      ratio = Math.floor(ratio)
      // console.log('ratio:', ratio)
      // this.image.raster.width = imgwidth * ratio
      // this.image.raster.height = imgheight * ratio
      this.image.raster.position = this.paper.view.center
      // console.log('this.paper.view.center:', this.paper.view.center)

      // console.log('this.image.raster:', this.image.raster)
      // console.log('this.image.width', this.image.raster.width)
      // console.log('this.image.height', this.image.raster.height)
      // console.log('this.paper.view', this.paper.view.size)

      // 画一个圆
      this.circle = new paper.Path.Circle(new paper.Point(100, 100), 10)
      this.circle.strokeColor = 'red'
      

      // 绑定各种事件函数
      this.paper.view.onFrame = this.onFrame

      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        // 扫把头版
        this.selection = new paper.Path()
        this.selection.fillColor  = {
          hue: Math.random() * 360,
          saturation: 1,
          brightness: 1
        }
        this.selection.add(e.point)



        // 大小葫芦版本
        // this.selection = new paper.Path()
        // this.selection.fillColor  = {
        //   hue: Math.random() * 360,
        //   // 饱和度对比度
        //   saturation: 1,
        //   brightness: 1
        // };
        // this.selection.add(e.point)

        // // // // 出现断画的圆形尝试
        // this.brush = new paper.Path.Circle({
        //   center: e.point,
        //   radius: 10,
        //   strokeColor: 'black'
        // })
        // const newSe = this.selection.unite(this.brush.path)
        // this.selection = newSe;

        // 笔刷正统版实现
        // this.myPath = new paper.Path({
        //   strokeCap: 'square',
        //   strokeWidth: 20,
        //   strokeColor: 'red'
        // })
        // this.myPath.add(e.point)
      }
      this.tool.onMouseUp = (e) => {
        console.log('e:',e)
        console.log(this.selection)
        this.selection.closed = true
      }
      this.tool.onMouseDrag = (e) => {
        // If this is the first drag event,
        // add the strokes at the start:
        if(e.count == 0) {
          this.addStrokes(e.middlePoint, e.delta.multiply(-1));
        } else {
          const bottom = e.point.add(e.delta.rotate(90).normalize().multiply(10));
          const top = e.point.subtract(e.delta.rotate(90).normalize().multiply(10));

          this.selection.add(top);
          this.selection.insert(0, bottom);
        }
        this.selection.smooth();
        
        // this.lastPoint = e.middlePoint;

        // 葫芦版本
        // let step = e.delta;
        // step.angle += 90;
        // const t = new paper.Path()
        // let top = e.middlePoint.add(10);
        // let bottom = e.middlePoint.subtract(10);
        
        // this.selection.add(top);
        // this.selection.insert(0, bottom);
        // this.selection.smooth();




          // this.myPath.add(e.point)

        // this.myPath.flatten(1);
        // this.brush = new paper.Path.Circle({
        //   center: e.point,
        //   radius: 10,
        //   strokeColor: 'black'
        // })
        // const newSe = this.selection.unite(this.brush.path)
        // this.selection.remove();
        // this.selection = newSe;
        // this.selection.add(e.point)

        // this.myPath.add(e.point)

      }
      this.tool.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = this.paper.project.activeLayer
          layer.selected = !layer.selected
          return false
        }
      }
    },
    addStrokes (point, delta) {
      console.log('首当其冲的点')
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

      
      // this.myPaths.forEach(path => {
      //   let t = path.clone()
      //   t.strokeCap = 'round'
      // })
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
      // console.log('滚轮事件:', e)
      // this.paper.view.center = new paper.Point(e.x, e.y)
      // console.log('e:', e)
      // if (e.deltaY < 0) {
      //   this.paper.view.zoom = this.paper.view.zoom + 1
      // }
      // if (e.deltaY > 0) {
      //   if (this.paper.view.zoom > 0) {
      //     this.paper.view.zoom = this.paper.view.zoom - 1
      //   }
      // }

      // let viewPosition = paper.view.viewToProject(
      //     new paper.Point(e.offsetX, e.offsetY)
      // );
      // console.log('viewPosition:', viewPosition)
      // console.log('e.deltaY:', e.deltaY)

      // let transform = this.changeZoom(e.deltaY, viewPosition);
      // console.log('transform:', transform)
      // // this.image.scale = 1 / transform.zoom;
      // this.paper.view.zoom = transform.zoom + Math.pow(Math.E, -6);
      // this.paper.view.center = this.paper.view.center.add(transform.offset);
    },
    onFrame () {
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
