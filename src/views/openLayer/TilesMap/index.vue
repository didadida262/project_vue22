<!--
 * @Author: Hhvcg
 * @Date: 2022-12-02 17:16:13
 * @LastEditors: -_-
 * @Description: 模仿搞得的瓦片加载， 实现“视图感知”demo版
-->

<template>
  <div class="tiles-container pd10">
    <commonTemplate title="tiles" />
    <div class="tiles-container-content">
      <PaperPicVerisonTwo
        :picInfo="picInfo"
      />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'
import PaperPicVerisonTwo from '@/components/PaperPicVerisonTwo.vue'

export default {
  name: 'tiles',
  components: {
    commonTemplate,
    PaperPicVerisonTwo
  },
  data() {
    return {
      title: 'tiles',
      WIDTH: null,
      HEIGHT: null,
      picInfo: {
        title: 'Sam',
        src: require('@/assets/Sam.webp')
      }
    }
  },
  watch: {},
  mounted() {
  },

  methods: {

  }
}
</script>
<style scoped lang="scss">
.tiles-container {
  width: 100%;
  height: 100%;
  &-content {
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
