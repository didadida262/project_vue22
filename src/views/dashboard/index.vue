<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <div class="dashboard">
    <div class="dashboard-text flex-cc">
      <span>
        正弦波
      </span>
    </div>
    <div class="dashboard-container pd10 flex-cc">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paper from 'paper'
import {getRandomColor} from '../../weapons'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      paper: null,
      tool: null,
      // 存储画布容器宽高
      XY: {},
      SIZE: 100,
      snake: {
        x: null,
        y: null,
        direction: 1,
        respo: []
      },
      
    }
  },
  created() {
    
  },
  mounted() {
    this.initWorld()
    // this.drawXY()
    this.drawBrick()
  },


  methods: {
    // 绘制snake的step
    drawSnakeStep() {
      if (this.snake.x >= this.XY.x || this.snake.y >= this.XY.y) {
        this.snake.respo.forEach((brick) => {
        brick.fillColor = getRandomColor()
    console.log('this.paper--->', this.paper)
    console.log('this.snake.resp--->',this.snake.respo.length)

       })
      return
      }
      // 根据当前snake的xy绘制图形
      const brick = new paper.Path.Rectangle(new paper.Point(this.snake.x, this.snake.y), new paper.Size(this.SIZE,this.SIZE))
      brick.fillColor = getRandomColor()
      this.snake.respo.push(brick)
      
      if (Math.abs(this.snake.x + this.SIZE * this.snake.direction) <= this.XY.x) {
        this.snake.x += this.SIZE * this.snake.direction 
      } else {
        this.snake.y += this.SIZE
        this.snake.direction = -this.snake.direction
      }
    },
    onFrame() {
      // this.drawSnakeStep()
    },
    // 铺砖函数
    drawBrick() {

    },
onResize(event) {
    project.activeLayer.removeChildren();

    // Transform the raster so that it fills the bounding rectangle
    // of the view:
    raster.fitBounds(view.bounds, true);

    // Create a path that fills the view, and fill it with
    // the average color of the raster:
    new Path.Rectangle({
        rectangle: view.bounds,
        fillColor: raster.getAverageColor(view.bounds),
        onMouseMove: moveHandler
    });
}    
    // 绘制当前paperjs画布的坐标系
    drawXY() {
      this.X = new this.paper.Path()
      this.X.strokeColor = 'black'
      this.Y = new this.paper.Path()
      this.Y.strokeColor = 'black'
      for (let i = 0; i < this.XY.x / 2; i++) {
        this.X.add(new paper.Point(i, 0))
        this.X.add(new paper.Point(-i, 0))
      }
      for (let i = 0; i < this.XY.y / 2; i++) {
        this.Y.add(new paper.Point(0, i))
        this.Y.add(new paper.Point(0, -i))
      }
    },
    initWorld() {
      const canvas = this.$refs.main_canvas
      this.XY.x = canvas.clientWidth
      this.XY.y = canvas.clientHeight
      this.snake.x = -Math.floor(canvas.clientWidth / 2)
      this.snake.y = -Math.floor(canvas.clientHeight / 2)
      paper.setup(canvas)
      this.paper = paper
      this.paper.view.setCenter(0, 0);
      this.paper.view.onFrame = this.onFrame
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        console.log('点击事件--->', e.point)
      }
      // 初始化世界
    },
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  border: 1px solid gray;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 10px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  &-text {
    width: 100%;
    height: 100px;
    border: 1px solid ghostwhite;
  }
  &-container {
    height: calc(100% - 100px);
    width: 100%;
    border: 1px solid red;
    .main_canvas {
      width: 90%;
      height: 90%;
      background: gray;
    }    
  }
}
</style>
