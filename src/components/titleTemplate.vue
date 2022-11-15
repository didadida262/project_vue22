<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: 标题组件
-->
<template>
  <div class="title-st flex-cc mgb10">
    <span style="font-weight: bold;font-size: 40px">{{ title }}</span>
  </div>
</template>

<script>
export default {
  name: 'titleTemplate',
  props: {
    title: {
      type: String,
      required: true
    }
  },
  data() {
    return {

    }
  },
  watch: {}

}
</script>
<style scoped lang="scss">
.title-st {
  margin: 5px auto;
  width: 100%;
  height: 72px;
  background: gray;
  border-radius: 4px;
}
.title-st:hover {
  box-shadow: 0px 0px 5px #888888;
  cursor: pointer;
}

</style>
