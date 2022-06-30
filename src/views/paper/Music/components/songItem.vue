<!--
 * @Author: Hhvcg
 * @Date: 2022-06-30 10:57:47
 * @LastEditors: -_-
 * @Description: 侧边栏组件，用于显示后端返回的歌曲
-->
<template>
  <div class="song-item mgb10">
    <span>{{ data }}</span>
  </div>
</template>
<script lang="ts">

export default {
  name: "songItem",

  props: {
    data: {
      type: String,
      required: true  
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
  },

  beforeDestroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .song-item {
    width: 100%;
    height: 45px;
    border: 1px solid black;
  }

</style>





