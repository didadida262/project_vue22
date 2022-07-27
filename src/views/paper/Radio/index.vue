<!--
 * @Author: Hhvcg
 * @Date: 2022-07-27 14:52:03
 * @LastEditors: -_-
 * @Description: radio-rainball
-->

<template>
  <div class="container pd10">
    <commonTemplate title="Radio--Dynamic light waves" />
    <div class="Radio-container-content">
      <canvas ref="canvas" resize class="canvas" hidpi="off" />
    </div>
  </div>
</template>

<script>
import paper from "paper";
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/weapons'
export default {
  name: 'Radio',
  components: {
    commonTemplate
  },
  data() {
    return {
      colors: [],
      cycles: 4,
      point: null,
      path: null,
      gradient: null,
      radius: null,
      gradientColor: null,
      grow: false,
      vector: null,
      mouseDown: false
    };
  },
  watch: {},
  mounted() {
    this.init();
    this.createRadio()
  },
  methods: {
    createColors() {
      for (let i = 0; i < 6; i++) {
          let brightness = 1 - (i / 6) * 1.5;
          let hue = i / 6 * this.cycles * 360;
          let color = {
              hue: hue,
              saturation: 1,
              brightness: brightness
          };
          this.colors.push(color);
      }
    },
    // 针对给定path，color，上梯度色
    colorFul() {
      this.gradient = new paper.Gradient(this.colors, true)
      this.radius = Math.max(paper.view.size.width, paper.view.size.height) * 0.75;
      this.path.fillColor = new paper.Color(this.gradient, this.point, this.point.add([this.radius, 0]));
    },
    createRadio() {
      this.point = paper.view.center
      this.createColors()
      this.path = new paper.Path.Rectangle(paper.view.bounds)
      this.path.strokeColor = 'red'
      this.path.strokeWidth = 5
      this.colorFul()
      this.gradientColor = this.path.fillColor;

    },
    onFrame() {
      for (let i = 0, l = this.gradient.stops.length; i < l; i++)
          this.gradient.stops[i].color.hue -= 20;
      if (this.grow && this.vector.length > 300) {
          this.grow = false;
      } else if (!this.grow && this.vector.length < 75) {
          this.grow = true;
      }
      if (this.mouseDown) {
          point = point + (mousePoint - point) / 10;
      } else {
          this.vector.length += (this.grow ? 1 : -1);
          this.vector.angle += 5;
      }
      this.gradientColor.highlight = this.mouseDown ? this.point : this.point.add(this.vector);
    },

    onKeyDown(e) {

    },
    onMouseDown(e) {
      // console.log('view的鼠标点击事件---->', e)
    },
    init() {
      this.grow = false;
      this.vector = new paper.Point(150, 0);
      console.log("初始化世界!!!");
      console.log('黑色死光启动------=====-_-')
      const canvas = this.$refs.canvas;
      this.paper = paper;
      this.paper.setup(canvas);
      this.paper.view.setCenter(0, 0);
      this.paper.view.onFrame = this.onFrame;
      this.paper.view.onMouseDown = this.onMouseDown
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        console.log('tool的鼠标点击事件---->', e)
      }
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

  .Radio-container-content {
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
