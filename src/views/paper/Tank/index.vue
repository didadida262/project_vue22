<template>
  <div class="app-container">
    <h1>Tank</h1>
    <canvas id="tank" ref="tank" resize class="tank" />
  </div>
</template>

<script>
import paper from "paper";

export default {

  data() {
    return {
      paper: null,
      role: {
        name: 'hhvcg',
        blood: '',
        path: null
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
          console.log('Fire！！！！')
        }
      }
      console.log('this.tool:', this.tool)
      console.log('初始化坦克世界')
      console.log(this.paper)
      this.role.path = new this.paper.Path.Rectangle(300, 300, 300, 100)
      this.role.path.fillColor = 'green'
    
    },
    onFrame () {
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
