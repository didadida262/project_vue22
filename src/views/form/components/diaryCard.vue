<!--
 * @Author: Hhvcg
 * @Date: 2022-07-12 16:16:50
 * @LastEditors: -_-
 * @Description: diary-card，包含标题、内容省略、图片、日期
-->
<template>
  <div class="card-container mgb10">
    <div class="title">
      <span>标题：{{ info.title }}</span>
    </div>
    <div class="content">
      <span>内容：{{ info.content }}</span>
      <span>图片{{ info.image }}</span>
    </div>
    <div class="footer">
      <span>时间：{{ info.create_date }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'diray-card',
  props: {
    info: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      
    }
  },
  created() {
  },
  beforeDestroy() {
  }
}
</script>

<style scoped lang="scss">
.card-container {
  height: 120px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px #888888;
}
.card-container:hover {
  cursor: pointer;
  box-shadow: 0px 0px 10px #888888;
}
</style>

