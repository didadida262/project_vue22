<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:34:09
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="header-notice">
    <!-- {{ showData }} -->
  </div>
</template>

<script>
export default {
  name: 'Header-Notice',
  computed: {
    showData() {
      return '初始化'
    }
  },
  create() {
    console.log('i am notice')
  }
}
</script>

<style scoped>
.header-notice{
  display: inline-block;
  width: 100px;
  height: 100%;
  text-align: center;
  padding: 10px;
}
</style>

