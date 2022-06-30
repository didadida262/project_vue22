<!--
 * @Author: Hhvcg
 * @Date: 2022-06-30 10:57:47
 * @LastEditors: -_-
 * @Description: 侧边栏组件，用于显示后端返回的歌曲，支持选中播放
-->
<template>
  <div>
    <div class="music_songs_list" v-if="showFlag">
      <div v-for="(item, index) in songsList" :key="index">
        <song-item :data="item" :class="{'selected-song': target === index}" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import songItem from './songItem.vue'
export default {
  name: "songlist",
  components: {
    songItem
  },
  props: {
    showFlag: {
      type: Boolean,
      required: true  
    }
  },
  data() {
    return {
      songsList: [],
      target: null,
    }
  },
  created() {
    this.getSongs()
  },
  computed: {
    // isActive() {
    //   return this.target === index
    // }
  },
  mounted() {
    console.log('data--->', this.data)
  },
  methods: {
    changeSong(index) {
      this.target = index
      console.log('this.target--->',this.target)
    },
    async getSongs() {
      this.songsList = await this.$axios.getSongs()
      console.log('当前所有songs--->',this.songsList)
    },
  },

  beforeDestroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .music_songs_list{
    width: 400px;
    height: calc(100% - 110px);
    position: fixed;
    right: 0;
    top: 80px;
    animation-name: slideUp;
    animation-duration: 1s;
    animation-fill-mode: forwards;
    border-radius: 5px;
    box-shadow: 0 0 6px rgba(18, 180, 153, 0.8);
    padding: 10px;
    background-color: rgba(45, 45, 45, 0.8);
    @keyframes slideUp {
      0% {
        transform: translateX(200px);
        opacity: 0;
      }
      100% {
        transform: translateX(0);
        opacity: 1;
      }
    }    
    .selected-song {
      background-image: linear-gradient(120deg,#b0d2ee,#13ca75);
    }
  }  
</style>





