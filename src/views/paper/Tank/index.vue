<template>
  <div class="app-container">
    <h1>Tank</h1>
    <canvas id="tank" ref="tank" resize class="tank" />
  </div>
</template>

<script>
import paper from "paper";
import { Bomb } from './Bomb'
export default {

  data() {
    return {
      // 炮弹库
      bombs: [],
      paper: null,
      role: {
        name: 'hhvcg',
        blood: '',
        // 底座300x100
        bottom: null,
        // 炮管50x100
        gun: null
      },
      tool: null
    }
  },
  watch: {

  },
  mounted() {
    this.init()
  },

  methods: {
    init() {
      const canvas = this.$refs.tank;
      // canvas的dom节点给到paper装载
      this.paper = paper;
      this.paper.setup(canvas);   
      this.paper.view.onFrame = this.onFrame
      this.tool = new this.paper.Tool()
      this.tool.onKeyDown = (e) => {
        if (e.key === 'space') {
          // 发射
          this.bombs.push(new Bomb(new this.paper.Point(this.role.gun.position.x, this.role.gun.position.y - 55), 10))
          console.log('this.bombs',this.bombs)
        }
      }
      console.log('this.tool:', this.tool)
      console.log('初始化坦克世界')
      console.log('canvas',canvas)

      console.log(this.paper)
      this.role.bottom = new this.paper.Shape.Rectangle(this.paper.view.size.width / 2 - 150, this.paper.view.size.height - 100, 300, 100)
      this.role.bottom.fillColor = 'green'
      this.role.gun = new this.paper.Shape.Rectangle(this.paper.view.size.width / 2 - 25, this.paper.view.size.height - 200, 50, 100)
      this.role.gun.fillColor = 'red'
      console.log('this.role.gun:', this.role.gun)
    
    },
    onFrame () {
      console.log('震动')
      for (let bomb of this.bombs) {
        bomb.update()
      }
    }
  }
}
</script>
<style scoped>
.tank {
  background: black;
  height: 80vh;
  width: 80vw;
}
</style>
