<template>
  <div class="content" ref="content">
    <canvas resize id="main_canvas" class="main_canvas" ref='main_canvas'/>
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      myPath: ''
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
  border: 1px solid gainsboro;
  width: calc(100% - 60px);
  height: 100%;
  .main_canvas {
    width: 100%;
    height: 100%;
    background: gray;
  }
}
</style>
