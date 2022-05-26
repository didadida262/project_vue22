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
      SIZE: 20,
      i: 0,
      j: 0
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
    onFrame() {
      console.log('真动')
      this.brick = new paper.Path.Rectangle(new paper.Point(this.i, 0), new paper.Size(this.SIZE,this.SIZE))
      this.brick.fillColor = getRandomColor()
      if (this.i + this.SIZE < this.XY.x / 2) {
        this.i = this.i + this.SIZE
      } else {
        this.i = 0
        this.j = this.j + this.SIZE
      }
      
    },
    // 铺砖函数
    drawBrick() {
      // for (let i = 0; i < this.XY.x / 2;) {
      //   for (let j = 0; j < this.XY.y / 2;) {
      //     this.brick = new paper.Path.Rectangle(new paper.Point(i, j), new paper.Size(this.SIZE,this.SIZE))
      //     this.brick.fillColor = getRandomColor()
      //     j = j + this.SIZE
      //   }
      //   i = i + this.SIZE
      // }
      
      

    },
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
      console.log('xy', this.XY)
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
  width: 100vw;
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
    .main_canvas {
      width: 90%;
      height: 90%;
      background: gray;
    }    
  }
}
</style>
