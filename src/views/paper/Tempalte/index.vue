<!--
 * @Author: Hhvcg
 * @Date: 2022-11-30 16:42:33
 * @LastEditors: -_-
 * @Description: records记录，存储后端json
-->

<template>
  <div class="Records-container pd10">
    <commonTemplate title="Records" />
    <div class="Records-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'Records',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Records',
      WIDTH: null,
      HEIGHT: null
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
.Records-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
  }
}
</style>
