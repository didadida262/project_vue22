<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: 小飞机
-->
<template>
  <div class="container pd10">
    <commonTemplate title="Airplane" />
    <div class="Airplane-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons.js'
export default {
  name: 'Airplane',
  components: {
    commonTemplate
  },
  data() {
    return {

    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    removeItem(item) {
      if (item) {
        item.remove()
        item = null
      }
    },
    onFrame() {

    },
    init() {
      console.log('初始化世界!!!')
      const canvas = this.$refs.canvas
      this.paper = paper
      this.paper.setup(canvas)
      // 将视图的远点置于底部中间，方便后续炮塔等的向量计算
      this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.tool = new this.paper.Tool()
      this.tool.onKeyDown = (e) => {
        switch (e.key) {
          case 'space':
            this.rotateFlag = !this.rotateFlag
        }
      }
      this.tool.onMouseDown = (e) => {

      }
    }
  },
  beforeDestroyed() {
    console.log('销毁前')
    this.paper = null
  }

}
</script>
<style scoped lang="scss">
.container {
    width: 100%;
    height: 100%;
  .Airplane-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}

</style>
