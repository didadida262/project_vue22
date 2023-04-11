<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="dashboard">
    <span>{{ info.name }}</span>
    <span>{{ info.old }}</span>
  </div>
</template>

<script>
export default {
  props: {
    info: {
      type: Object
    }
  },
  name: 'child',

  data() {
    return {
    }
  },
  created() {
  },
  mounted() {

  },
  beforeDestroy() {
  }

}
</script>

<style lang="scss" scoped>
.dashboard {

}
</style>
