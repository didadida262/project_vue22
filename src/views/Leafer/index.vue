
<template>
  <div class="LeaferJS-container pd10">
    <commonTemplate title="LeaferJS" />
    <div class="LeaferJS-container-content">
      <canvas id="canvasLeaf" ref="canvasLeaf" class="canvas"></canvas>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import { Leafer, Debug } from 'leafer-ui'
import { LeafsCase } from './Case.js'
import { PaperCase } from './Paperversion.js'
import paper from 'paper'

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
    // this.useLeaf()
    this.usePaper()
  },
  beforeDestroy() {

  },
  methods: {
    usePaper() {
      console.warn('usePaper>>>')
      const canvas = this.$refs['canvasLeaf']
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      new PaperCase(this.paper, 1) // 100万个
    },
    useLeaf() {
      this.leafer = new Leafer(
        {
          view: 'canvasLeaf'
        })
      new LeafsCase(this.leafer, 1) // 100万个
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
    .canvas {
      border: 1px solid black;
      width: 100%;
      height: 100%;
    }
  }
}
</style>
