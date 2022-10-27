<template>
  <div class="csstest-st pd10">
    <commonTemplate title="CssTest" />
    <div class="content" />
  </div>
</template>
<script>
import CommonTemplate from '@/components/titleTemplate.vue'
export default {
  name: '',
  components: {
    CommonTemplate
  },
  data() {
    return {
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    async getData() {
    }
  }
}
</script>
<style scoped lang='scss'>
.csstest-st {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 90px);
  }
}
</style>
