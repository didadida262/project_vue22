<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 11:15:36
 * @LastEditors: -_-
 * @Description:
-->

<template>
  <div class="test-container pd10">
    <commonTemplate title="test" />
    <div class="test-container-content">
      <PaperPic
        :picInfo="picInfo"
        @handlePicEvent="handlePicEvent"
       />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import PaperPic from './components/PaperPic.vue'
import paper from 'paper'
export default {
  name: 'test',
  components: {
    commonTemplate,
    PaperPic
  },
  data() {
    return {
      title: 'test',
      picInfo: {
        src: require('@/assets/Sam.webp'),
        title: 'PL'
      }
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
  },
  methods: {
    handlePicEvent(event) {
      if (event.loadedSuccess) {
        this.test()
      }
    },
    test() {
      const raster = paper.project.layers[0].children[0]
      console.log('paper>>>', paper)
      console.log('raster>>>', raster)
      const average = raster.getAverageColor()
      console.log('getAverageColor>>>', average)
      // const rect = new paper.Path.Circle({
      //   center: new paper.Point(0),
      //   radius: 0.5,
      //   strokeColor: 'green',
      //   strokeWidth: 0.1
      // })
      // raster.setPixel(new paper.Point(0), average)
      // const start = raster.bounds.topLeft
      // const width = raster.width
      // for (let i = 0; i < width; i++) {
      //   console.log('???????????')
      //   raster.setPixel(new paper.Point(start.x + i, start.y), average)
      // }
    }
  },
  beforeDestroy() {

  }

}
</script>
<style scoped lang="scss">
.test-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
  }
}
</style>
