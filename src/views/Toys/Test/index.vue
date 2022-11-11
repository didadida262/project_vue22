<!--
 * @Author: Hhvcg
 * @Date: 2022-09-20 09:54:00
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="test-st pd10">
    <commonTemplate title="Test" />
    <div class="content pd10">
      <!-- <paper-pic-version-two
          :picInfo="picList[0]"
           /> -->
      <!-- <pic-wall
        :pic-info="picList[0]"
      /> -->
      <div
        class="content-item"
        v-for="(pic, index) in picList"
        :key="index"
        >
        <paper-pic-version-two
          :picInfo="pic"
           />
      </div>
    </div>
  </div>
</template>
<script>
import CommonTemplate from '@/components/titleTemplate.vue'
import PaperPicVersionTwo from '@/components/PaperPicVerisonTwo.vue'
import paper from 'paper'

export default {
  name: 'Test',
  components: {
    CommonTemplate,
    PaperPicVersionTwo
  },
  data() {
    return {
      picList: [
        {
          title: '1',
          src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
        },
        {
          title: '2',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '3',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '4',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '5',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '6',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '7',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '8',
          src: require('@/assets/Sam.webp')
        }
      ],
      WIDTH: null,
      HEIGHT: null,
      scale: 0,
      zoom: 1,
      url: require('@/assets/Sam.webp')
    }
  },
  created() {
  },
  mounted() {
    this.tool = new paper.Tool()
    this.tool.onMouseDown = (e) => {
      console.log('点击事asdasdasdasd件--->')
    }
    console.time('test-spendtime')
    // this.initWorld()
    // this.drawPic()
    console.timeEnd('test-spendtime')
  },
  beforeDestroy() {
  },
  methods: {
    handleOnwheel() {

    },
    initWorld() {
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.view.setCenter(0, 0)
    },
    drawPic() {
      const raster = new paper.Raster(this.url)
      raster.onLoad = () => {
        raster.fitBounds(this.paper.view.bounds, false)
      }
    },
    onwheel(e) {
      // 向下缩小，向上放大，即： dealtY > 0: 缩小，反之反之
      e.preventDefault()
      const currentProject = this.paper.project
      const view = currentProject.view
      if (e.ctrlKey) {
        // Pan up and down
        const delta = new paper.Point(0, 0.5 * e.deltaY)
        view.setCenter(view.center.add(delta))
      } else if (e.shiftKey) {
        // Pan left and right
        const delta = new paper.Point(0.5 * e.deltaY, 0)
        view.setCenter(view.center.add(delta))
      } else {
        const viewPosition = view.viewToProject(
          new paper.Point(e.offsetX, e.offsetY)
        )
        console.log('viewPosition>>', viewPosition)
        const transform = this.changeZoom(e.deltaY, viewPosition)
        console.log('transform>>', transform)
        // view.zoom = transform.zoom + Math.pow(Math.E, -6);

        view.zoom = transform.zoom
        view.center = view.center.add(transform.offset)
      }

      // return false;
    },
    // 计算鼠标滑动后的 zoom和 offset, 仅在 @onwheel 方法中用到
    // delta为鼠标滚轮的滚动量，p为触发滚轮事件的paper坐标系内的真是坐标点
    changeZoom(delta, p) {
      // let currentProject = this.paper.projects.filter((item) => item.name === this.title)[0]
      const currentProject = this.paper.project
      const view = currentProject.view
      const oldZoom = view.zoom
      const c = view.center
      const factor = 1 + this.zoom

      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      const beta = oldZoom / zoom
      const pc = p.subtract(c)
      const a = p.subtract(pc.multiply(beta)).subtract(c)

      return { zoom: zoom, offset: a }
    }
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
    justify-content: space-between;
    border: 1px solid gray;
    background: white;
    &-item {
      width: 24%;
      height: 400px;
      border: 1px solid grey;
      background: white;
    }
    .main_canvas {
      width: 100%;
      height: 100%;
      border: 1px solid grey;
    }
  }
}
</style>
