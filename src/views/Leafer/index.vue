
<template>
  <div class="LeaferJS-container pd10">
    <commonTemplate title="LeaferJS" />
    <div class="LeaferJS-container-content">
      <canvas id="canvasLeaf"></canvas>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import { Leafer, Debug } from 'leafer-ui'
import { RectsCase } from './Case.js'

export default {
  name: 'LeaferJS',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'LeaferJS'
    }
  },
  computed: {
  },
  watch: {},
  mounted() {
    this.initLeaf()
    this.draw()
  },
  beforeDestroy() {

  },
  methods: {
    draw() {
      const startTime = Date.now()

      Debug.enable = true
      Debug.filter = 'RunTime'

      new RectsCase(this.leafer, 100) // 100万个

      console.log(`创建100万个矩形用时：`, Date.now() - startTime, '毫秒')
      console.log('this.leafer>>>', this.leafer)
    },
    initLeaf() {
      this.leafer = new Leafer(
        {
          view: 'canvasLeaf'
        })
    }
  }
}
</script>
<style scoped lang="scss">
.LeaferJS-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(236, 75, 11, 0.5);
  }
}
</style>
