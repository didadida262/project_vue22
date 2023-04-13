<!-- blog-main -->
<template>
  <div class="blogMain-container pd10">
    <commonTemplate title="blogMain" />
    <div class="blogMain-container-content">
      blog...main
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'blogMain',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'blogMain'
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
.blogMain-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
  }
}
</style>
