<template>
  <div ref="content" class="content" @wheel="onwheel">
    <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
  </div>
</template>

<script>
export default {
  name: 'Content',
  data() {
    return {
      mask_png: null
    }
  },
  methods: {
    onwheel(e) {
      this.$emit('shortCut', e)
    }
  },
  mounted() {
    console.log('this.mask_png:', this.mask_png)
  }
}
</script>

<style lang="scss" scoped>
.content {
  border: 1px solid gainsboro;
  width: calc(100% - 60px);
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  .main_canvas {
    width: 100%;
    height: 100%;
    background: gray;
  }
}
</style>
