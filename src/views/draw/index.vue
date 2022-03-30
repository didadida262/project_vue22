<template>
  <div class="draw-container">
    <Tool
     @changeRa="selectBrush" 
    />
    <Content
     ref='Content' 
     @shortCut="onWheel"/>
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
      info:'hhvcg',
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
      this.image.raster = new paper.Raster(this.image.url);
      this.image.raster.smoothing = false;

      this.image.raster.onLoad = () => {
        console.log('图片加载成功！！！')
      }
      this.image.raster.position = this.paper.view.center

    // 绑定各种事件函数
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        // 画线条
        this.myPath = new paper.Path()
        this.myPath.strokeColor = 'red'
        this.myPath.strokeWidth = this.ra
        this.myPath.add(e.point)
      }
      this.tool.onMouseUp = () => {
        this.myPaths.push(this.myPath)
        console.log('this.myPaths:', this.myPaths)
        console.log('抬起')
      }
      this.tool.onMouseDrag = (e) => {
        this.myPath.add(e.point)
      }
      this.tool.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = this.paper.project.activeLayer
          layer.selected = !layer.selected
          return false
        }
      }
    },
    // copy的函数，慎重使用
    changeZoom(delta, p) {
      let oldZoom = this.paper.view.zoom;
      let c = this.paper.view.center;
      let factor = 0.3 + oldZoom;
      console.log('oldZoom:', oldZoom)
      console.log('factor:', factor)
      console.log('c:', c)

      let zoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
      let beta = oldZoom / zoom;
      let pc = p.subtract(c);
      let a = p.subtract(pc.multiply(beta)).subtract(c);

      return { zoom: zoom, offset: a };
    },    
    onWheel(e) {
      console.log('滚轮事件:', e)
      this.paper.view.center = new paper.Point(e.x, e.y)
      console.log('e:', e)
      if (e.deltaY < 0) {
        this.paper.view.zoom = this.paper.view.zoom + 1
      }
      if (e.deltaY > 0) {
        if (this.paper.view.zoom > 0) {
          this.paper.view.zoom = this.paper.view.zoom - 1
        }
      }



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
