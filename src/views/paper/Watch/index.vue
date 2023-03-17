<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 11:15:36
 * @LastEditors: -_-
 * @Description:
-->

<template>
  <div class="pixel-container pd10">
    <commonTemplate title="pixel" />
    <div class="pixel-container-content flex-col-sc">
      <div class="pixel-container-content-pic">
        <PaperPic
          :picInfo="picInfo"
          @handlePicEvent="handlePicEvent"
        />
      </div>
      <div
       ref="pixelEcharts"
       class="pixel-container-content-echarts">
      </div>
    </div>

  </div>
</template>

<script>
import echarts from 'echarts'
import commonTemplate from '@/components/titleTemplate.vue'
import PaperPic from './components/PaperPic.vue'
import paper from 'paper'
export default {
  name: 'pixel',
  components: {
    commonTemplate,
    PaperPic
  },
  data() {
    return {
      title: 'pixel',
      picInfo: {
        src: require('@/assets/slogan.jpg'),
        title: 'PL'
      }
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
    this.initEcharts()
  },
  methods: {
    initEcharts() {
      console.log('echarts>>', echarts)
      // this.pixelEcharts = echarts.init(this.$refs.pixelEcharts)
    },
    handlePicEvent(event) {
      if (event.loadedSuccess) {
        this.test()
      }
    },
    test() {
    }
  },
  beforeDestroy() {

  }

}
</script>
<style scoped lang="scss">
.pixel-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid blue;
    &-pic {
      width: 100%;
      height: calc(100% - 580px);
      border: 1px solid rgb(118, 118, 122, 0.5);
    }
    &-echarts {
      width: 100%;
      height: 400px;
      border: 1px solid green;
    }
  }
}
</style>
