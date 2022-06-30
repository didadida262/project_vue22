<!--
 * @Author: Hhvcg
 * @Date: 2022-06-30 10:57:47
 * @LastEditors: -_-
 * @Description: 侧边栏组件，用于显示后端返回的歌曲
-->
<template>
  <div class="song-item mgb10 cursor-pointer flex-cc">
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
    padding: 5px;
    width: 100%;
    height: 45px;
    border-radius: 2px;
    box-shadow: 0px 0px 6px rgba(109, 106, 106, 0.8);
    color: white;
  }
  .song-item:hover {
    background-image: linear-gradient(120deg,#b0d2ee,#13ca75);
    transform: scale(1.01);
  }

</style>





