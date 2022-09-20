<!--
 * @Author: Hhvcg
 * @Date: 2022-09-20 09:54:00
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <div class='test-st pd10'>
    <commonTemplate title='Test' />
    <div class='content'>
      <canvas
      @wheel="onwheel" id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>
<script>
import CommonTemplate from '@/components/titleTemplate.vue'
import PaperPic from '@/components/PaperPic.vue'
import paper from 'paper'

import { textHeights } from 'ol/render/canvas'
export default {
  name: 'Test',
  components: {
    CommonTemplate,
    PaperPic
  },
  data() {
    return {
      url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
      WIDTH: null,
      HEIGHT: null,
      scale: 0,
      zoom: 1,      
    }
  },
  created() {
  },
  methods: {
    initWorld() {
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.view.setCenter(0, 0);
    },
    drawPic() {
      let raster = new paper.Raster(this.url)
      raster.onLoad = () => {
        raster.fitBounds(this.paper.view.bounds, false)
      }
    },
    onwheel(e) {
      console.log('onwheel>>>', e)
      e.preventDefault();
      // let currentProject = this.paper.projects.filter((item) => item.name === this.title)[0]
      let currentProject = this.paper.project
      let view = currentProject.view;
      if (e.ctrlKey) {
        // Pan up and down
        let delta = new paper.Point(0, 0.5 * e.deltaY);
        view.setCenter(view.center.add(delta));
      } else if (e.shiftKey) {
        // Pan left and right
        let delta = new paper.Point(0.5 * e.deltaY, 0);
        view.setCenter(view.center.add(delta));
      } else {
        let viewPosition = view.viewToProject(
            new paper.Point(e.offsetX, e.offsetY)
        );

        let transform = this.changeZoom(e.deltaY, viewPosition);
          this.scale = 1 / transform.zoom;
          view.zoom = transform.zoom + Math.pow(Math.E, -6);
          view.center = view.center.add(transform.offset);
      }

      // return false;
    },    
    // 计算鼠标滑动后的 zoom和 offset, 仅在 @onwheel 方法中用到
    changeZoom(delta, p) {
      // let currentProject = this.paper.projects.filter((item) => item.name === this.title)[0]
      let currentProject = this.paper.project
      let view = currentProject.view;      
      let oldZoom = view.zoom;
      let c = view.center;
      let factor = 1 + this.zoom;

      let zoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
      let beta = oldZoom / zoom;
      let pc = p.subtract(c);
      let a = p.subtract(pc.multiply(beta)).subtract(c);

      return { zoom: zoom, offset: a };
    },     
  },
  mounted() {
    console.time('test-spendtime')
    this.initWorld()
    this.drawPic()
    console.timeEnd('test-spendtime')
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang='scss'>
.test-st {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    flex-wrap: wrap;
    .main_canvas {
      width: 100%;
      height: 100%;
      border: 1px solid grey;
    }
  }
}
</style>