<!--
 * @Author: Hhvcg
 * @Date: 2022-06-30 10:57:47
 * @LastEditors: -_-
 * @Description: 侧边栏组件，用于显示后端返回的歌曲，支持选中播放
-->
<template>
  <div>
    <div v-if="showFlag" class="music_songs_list">
      <div class="flex-cc mgb10">
        <el-input
          v-model="songName"
          placeholder="请输入内容"
          clearable
        />
        <el-button
          class="mgl10"
          @click="searchSong"
        >
          查询
        </el-button>
      </div>
      <div v-for="(item, index) in songsList" :key="index" @click="handleClick(index)">
        <song-item :data="item" :class="{'selected-song': currentSongIndex === index}" />
      </div>
    </div>
  </div>
</template>
<script lang="ts">

import songItem from './songItem.vue'
export default {
  name: 'Songlist',
  components: {
    songItem
  },
  props: {
    showFlag: {
      type: Boolean,
      required: true
    },
    songsList: {
      type: Array,
      required: true
    },
    // 当前歌曲index
    currentSongIndex: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      songName: ''
    }
  },
  watch: {
    currentSongIndex() {
      // if (this.currentSongIndex) {
      //   this.$emit('changeSong', this.currentSongIndex)
      // }
    }
  },
  created() {
  },
  mounted() {
  },

  beforeDestroy() {
  },
  methods: {
    searchSong() {
      this.$emit('searchSong', this.songName)
    },
    handleClick(index) {
      this.$emit('changeSong', index)
      // this.currentSongIndex = index
    },
    changeSong(index) {
      // this.currentSongIndex = index
      console.log('this.currentSongIndex--->', this.currentSongIndex)
    }

  }
}
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

