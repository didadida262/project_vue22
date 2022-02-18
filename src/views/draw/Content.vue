<template>
  <div class="content">
    <canvas resize id="main-canvas" class="main-canvas" />
  </div>
</template>

<script>
import paper from 'paper'
export default {
  name: 'Content',
  data() {
    return {
      myPath: ''
    }
  },
  mounted() {
    this.ini()
  },
  methods: {
    ini() {
      paper.setup(document.getElementById('main-canvas'))
      const tool = new paper.Tool()
      tool.onMouseDown = (e) => {
        this.myPath = new paper.Path()
        this.myPath.strokeColor = 'red'
        this.myPath.strokeWidth = 20
        this.myPath.add(e.point)
      }
      tool.onMouseUp = () => {
        console.log('抬起')
      }
      tool.onMouseDrag = (e) => {
        this.myPath.add(e.point)
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.content {
  border: 1px solid gainsboro;
  width: calc(100% - 60px);
  height: 100%;
  .main-canvas {
    width: 100%;
    height: 100%;
    background: gray;
  }
}
</style>
