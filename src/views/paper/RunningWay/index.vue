<!--
 * @Author: Hhvcg
 * @Date: 2023-02-22 17:39:55
 * @LastEditors: -_-
 * @Description: runnigway--app
-->

<template>
  <div class="runningWay-container pd10">
    <commonTemplate title="Running-Way" />
    <div class="runningWay-container-content">
      <paper-view
        class="picview-item-st"
        v-for="(pic, index) in picviewlist"
        :key="index"
        :picInfo="pic"
      />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import PaperView from './components/PaperView.vue'

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
          title: 'pl',
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'pl',
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'pl',
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'pl',
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'pl',
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
    border: 1px solid rgb(118, 118, 122, 0.5);
    .picview-item-st {
      width: 30%;
      height: 200px;
      border: 1px solid red;
    }
  }
}
</style>
