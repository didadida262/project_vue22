<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: 小飞机
-->
<template>
  <div class="container pd10">
    <commonTemplate title="Airplane" />
    <div class="Airplane-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from "paper";
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/weapons'
import tool from '@/components/tool'
// import { Ariplane } from './myAriplane'
export default {
  name: 'Airplane',
  mixins: [tool],
  components: {
    commonTemplate
  },
  data() {
    return {
      Ship: null,
      tool: null,
      myPath: null
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    onFrame() {
    },
    fire() {
    },
    onKeyDown(e) {
      switch (e.key) {
        case 'z':
          this.fire()
          break;
        case 'left':
          this.Ship.rotate(-10)
          break;
        case 'right':
          this.Ship.rotate(10)
          break;
        case 'up':
          this.Ship.position = this.Ship.position.subtract(new paper.Point(0, 5)).clone()
          break;
        case 'down':
          this.Ship.position = this.Ship.position.add(new paper.Point(0, 5)).clone()
          break;                    
      }
    },
    onMouseDown(e) {
      // console.log('view的鼠标点击事件---->', e)
    },
    // 挂了重来一次？
    showOperations() {
    },
    init() {
      const canvas = this.$refs.canvas;
      this.paper = paper;
      this.paper.setup(canvas);
      this.paper.view.setCenter(0, 0);
      this.paper.view.onFrame = this.onFrame;
      this.paper.view.onMouseDown = this.onMouseDown
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        // console.log('tool的鼠标点击事件---->', e)
        // const res = this.myPath.contains(e.point)
      }
      console.log("初始化世界!!!");
      // this.ari = new Ariplane()
      // this.myPath = new paper.Path.Rectangle(new paper.Point(-400,-400), new paper.Size(100))
      // this.myPath.strokeColor = getRandomColor()
      this.Ship = new paper.Path([0, 0], [20, 20],[16, 22], [11, 15], [8, 16], [4, 12], [0, 20], [-4, 12], [-8, 16], [-11, 15], [-16, 22], [-20, 20])
      this.Ship.strokeColor = getRandomColor()
      this.Ship.closed = true
      console.log('paperScope---', this.paper)
    },
  },
  beforeDestroyed() {
    console.log('销毁前')
    this.paper = null
  }


};
</script>
<style scoped lang="scss">
.container {
  width: 100%;
  height: 100%;
  .Airplane-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
