<!--
 * @Author: Hhvcg
 * @Date: 2022-12-30 11:15:36
 * @LastEditors: -_-
 * @Description: 测试websockt-频道1
-->

<template>
  <div class="Channel-container pd10">
    <commonTemplate title="Channel" />
    <div class="Channel-container-content">
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'Channel',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Channel'
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
.Channel-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
  }
}
</style>
