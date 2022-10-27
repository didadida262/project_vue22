<!--
 * @Author: Hhvcg
 * @Date: 2022-07-13 15:20:52
 * @LastEditors: -_-
 * @Description: 火柴人大乱斗
-->
<template>
  <div class="MatchStick-container pd10">
    <commonTemplate title="MatchStick-Man" />
    <div class="MatchStick-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from "paper";
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons.js'

export default {
  name: 'MatchStick',
  components: {
    commonTemplate
  },
  data() {
    return {
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    removeItem(item) {
      if (item) {
        item.remove()
        item = null
      }
    },
    onFrame() {
      if (this.rotateFlag) {
        this.role.rotate(10)
        this.respo.forEach((item) => {
          item.rotate(10)
          // item.rotate(10, new paper.Point(0,0))
        })
      }
    },
    init() {
      console.log("初始化世界!!!");
      const canvas = this.$refs.canvas;
      this.paper = paper;
      this.paper.setup(canvas);
      // 将视图的远点置于底部中间，方便后续炮塔等的向量计算
      this.paper.view.setCenter(0, 0);
      this.paper.view.onFrame = this.onFrame;
      this.tool = new this.paper.Tool();
      this.tool.onKeyDown = (e) => {
        switch (e.key) {
          case 'space':
            this.rotateFlag = !this.rotateFlag
        }
        
      }
      this.tool.onMouseDown = (e) => {
      };
    },
  },
  beforeDestroyed() {
    console.log('销毁前')
    this.paper = null
  }


};
</script>
<style scoped lang="scss">
.MatchStick-container {
    width: 100%;
    height: 100%;
  .MatchStick-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}

</style>
