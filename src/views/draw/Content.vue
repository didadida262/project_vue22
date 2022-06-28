<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <div ref="content" class="content" @wheel="onwheel">
    <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
        <!-- <el-date-picker
      v-model="value1"
      type="datetime"
      placeholder="选择日期时间">
    </el-date-picker>  -->

  </div>
</template>

<script>
export default {
  name: 'Content',

  data() {
    return {
      mask_png: null,
      value1: null

    }
  },
  methods: {
    onwheel(e) {
      this.$emit('shortCut', e)
    },
  },
  created() {
  },
  mounted() {
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
