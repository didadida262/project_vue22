<!--
 * @Author: Hhvcg
 * @Date: 2023-04-13 14:42:45
 * @LastEditors: -_-
 * @Description: article-item comp
-->

<template>
  <div class="articleItem-container pd10">
    <span>{{ info.name }}</span>
  </div>
</template>

<script>

export default {
  name: 'articleItem',
  props: {
    info: {
      required: true,
      type: Object
    }
  },
  data() {
    return {
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
.articleItem-container {
  width: 100%;
  height: 100%;
}
.articleItem-container:hover {
  cursor: pointer;
  animation: jitter 0.5s linear infinite;
}

</style>
