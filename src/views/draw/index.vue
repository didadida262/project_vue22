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
      test: null,
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
      this.test = new paper.Path()

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

      // 绑定各种事件函数
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        console.log('click', e.point)

        // 画线条
        this.myPath = new paper.Path({
          strokeCap: 'round'
        })
        this.myPath.strokeColor = 'red'
        this.myPath.strokeWidth = this.ra
        this.myPath.add(e.point)
      }
      this.tool.onMouseUp = (e) => {
        console.log('当前item--->',this.myPath)
        // 点击一次也给他画上
        if (this.myPath.segments.length === 1) {
          this.myPath.add(e.point)
        }
        this.myPaths.push(this.myPath)
        console.log('this.myPaths:', this.myPaths)
        console.log('抬起')
        this.unite(this.myPath)
        this.removeMyPath()
      }
      this.tool.onMouseDrag = (e) => {
        console.log('drag') 
        this.myPath.add(e.point)
      // this.myPath.flatten(1);

      }
      this.tool.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = this.paper.project.activeLayer
          layer.selected = !layer.selected
          return false
        }
      }
    },
    unite(path) {
      console.log('输出path:', path)
      // this.test = new this.paper.CompoundPath()
      // this.test = new paper.Path({
      //   segments: path.segements
      // })

      this.test = path.clone()
      this.test.strokeCap = 'square'

      this.test.unit(path)
      
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
