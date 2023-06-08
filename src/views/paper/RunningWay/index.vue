<!--
 * @Author: Hhvcg
 * @Date: 2023-02-22 17:39:55
 * @LastEditors: Hhvcg
 * @Description: runnigway--app
-->

<template>
  <div class="runningWay-container pd10">
    <commonTemplate title="Running-Way" />
    <div class="runningWay-container-content pd10">
      <!-- <div
        v-for="(pic, index) in picviewlist"
        :key="index"
        class="picview-item-st mgb5"
      >
        <paper-view
          :picInfo="pic"
        />
      </div> -->
      <canvas ref="canvas1" width="500px" height="500px">1</canvas>
        <canvas ref="canvas2" width="500px" height="500px">2</canvas>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import PaperView from './components/PaperView.vue'
import paper from 'paper'

export default {
  name: 'runningWay',
  components: {
    commonTemplate,
    PaperView
  },
  data() {
    return {
      title: 'runningWay',
      picviewlist: [
        {
          title: 'sur',
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'pl',
          src: require('@/assets/Sam.webp')
        }

      ]
    }
  },
  computed: {

  },
  watch: {},
  mounted() {
    const p1 = paper.setup(this.$refs['canvas1'])
    p1.name = 'p1'
    paper.setup(this.$refs['canvas2'])
    console.log('paper', paper)
  },
  beforeDestroy() {
  },
  methods: {
  }
}
</script>
<style scoped lang="scss">
.runningWay-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    display: flex;
    justify-content: space-around;
    align-content:space-around;
    flex-wrap: wrap;
    .picview-item-st {
      width: 33%;
      height: 200px;
    }
  }
}
</style>
