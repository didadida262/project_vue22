<!--
 * @Author: Hhvcg
 * @Date: 2022-07-06 17:59:06
 * @LastEditors: -_-
 * @Description: 模仿实现github首页大圆球
-->

<template>
  <div class="app-container">
  </div>
</template>

<script>
import paper from "paper";
// import {Boid} from './Boid.js'
import { Boid } from "./myBoid.js";
export default {
  data() {
    return {
      testData: [],
      boids: [],
      paper: null,
      // 心形图案
      heartPath: null,
      groupTogether: false,
      mypath: null,
      tool: null,
      svg: null,
    };
  },
  mounted() {
    this.initWorld();
    // this.tadpole();
    this.testTiger();
    // this.testPaper()
  },
  beforeDestroy() {
    this.paper = null;
  },
  methods: {
    test() {
      console.log('测试内存---->')
      this.testData.push(new Array(1000_0000))
    },
    testPaper() {
      this.head = new paper.Shape.Ellipse({
        center: [100, 100],
        size: [15, 10],
        fillColor: "orange",
      });
      // const head = new paper.Shape.Ellipse({
      //   center: [100, 200],
      //     size: [13, 8],
      //     fillColor: 'orange'
      // })
      // head.selected = true
      // console.log(this.paper)
      // const path = new paper.Path({
      //     strokeColor: 'green',
      //     strokeWidth: 2,
      //     strokeCap: 'round'
      // })
      // for (let i = 0; i < 10; i++) {
      //     path.add(new paper.Point())
      // }
      // path.selected = true
      // console.log('/////////////',path)
      const myRectangle = new paper.Rectangle(
        new paper.Point(450, 30),
        new paper.Point(720, 170)
      );
      const cornerSize = new paper.Size(10, 60);
      const d = new paper.Path.RoundRectangle(myRectangle, cornerSize);
      d.fillColor = "lightgreen";
    },
    initWorld() {
      console.log("$-_------------初始化世界---------------$-_-");
      const canvas = this.$refs.tadpole;
      // canvas的dom节点给到paper装载
      this.paper = paper;
      this.paper.setup(canvas);
      // 加装各类事件
      this.paper.view.onResize = this.onResize;
      this.paper.view.onFrame = this.onFrame;
      this.paper.view.onKeyDown = this.onKeyDown;
      this.paper.view.onMouseDown = this.onMouseDown;
    },
    testTiger() {
      console.log("测试老虎");
      console.log("this.paper:", this.paper);
      this.svg = this.paper.project.importSVG(document.getElementById("svg"));
      this.svg.visible = true; // Turn off display: none;
      this.svg.fitBounds(this.paper.view.bounds);
      console.log("this.svg:", this.svg);
    },
    // 生成画布内的随机坐标点，作为蝌蚪军团的出生点
    tadpole() {
      // this.heartPath = new paper.Path('M514.69629,624.70313c-7.10205,-27.02441 -17.2373,-52.39453 -30.40576,-76.10059c-13.17383,-23.70703 -38.65137,-60.52246 -76.44434,-110.45801c-27.71631,-36.64355 -44.78174,-59.89355 -51.19189,-69.74414c-10.5376,-16.02979 -18.15527,-30.74951 -22.84717,-44.14893c-4.69727,-13.39893 -7.04297,-26.97021 -7.04297,-40.71289c0,-25.42432 8.47119,-46.72559 25.42383,-63.90381c16.94775,-17.17871 37.90527,-25.76758 62.87354,-25.76758c25.19287,0 47.06885,8.93262 65.62158,26.79834c13.96826,13.28662 25.30615,33.10059 34.01318,59.4375c7.55859,-25.88037 18.20898,-45.57666 31.95215,-59.09424c19.00879,-18.32178 40.99707,-27.48535 65.96484,-27.48535c24.7373,0 45.69531,8.53564 62.87305,25.5957c17.17871,17.06592 25.76855,37.39551 25.76855,60.98389c0,20.61377 -5.04102,42.08691 -15.11719,64.41895c-10.08203,22.33203 -29.54687,51.59521 -58.40723,87.78271c-37.56738,47.41211 -64.93457,86.35352 -82.11328,116.8125c-13.51758,24.0498 -23.82422,49.24902 -30.9209,75.58594z')
      // // 创建蝌蚪军团
      for (let i = 0; i < 5; i++) {
        const rand = paper.Point.random();
        rand.x = rand.x * paper.view.size.width;
        rand.y = rand.y * paper.view.size.height;
        this.boids.push(new Boid(rand, 10, 0.05));
        console.log(this.boids);
      }
    },
    onResize() {
      console.log("窗口变化！！！");
      // this.heartPath.fitBounds(this.paper.view.bounds);
      // this.heartPath.scale(0.8);
    },
    // 帧数级别的执行run函数，即：让蝌蚪们动起来
    onFrame(event) {
      // console.log('帧动')
      for (var i = 0, l = this.boids.length; i < l; i++) {
        // 是否合拢
        if (this.groupTogether) {
          const length =
            (((i + event.count / 30) % l) / l) * this.heartPath.length;
          var point = this.heartPath.getPointAt(length);
          if (point) {
            this.boids[i].arrive(point);
          }
        }
        this.boids[i].run(this.boids, this.groupTogether);
      }
    },
    onKeyDown(e) {
      // 展示layer
      console.log("按键：", e);
      if (e.key === "space") {
        const layer = this.paper.project.activeLayer;
        layer.selected = !layer.selected;
        return false;
      }
    },
    // ⭐形合拢
    onMouseDown(e) {
      console.log("点击", e.point);
      this.groupTogether = !this.groupTogether;
    },
  },
};
</script>

<style scoped>
.tadpole {
  background: black;
  height: 80vh;
  width: 80vw;
}
</style>
