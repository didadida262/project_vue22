<!--
 * @Author: Hhvcg
 * @Date: 2022-05-31 15:42:55
 * @LastEditors: -_-
 * @Description: music盒子，该有的功能都得支持
-->
<template>
  <div class="music">
    <div class="music-player">
      <div class="info">
        <div class="left" style="color: gray">
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-sunglasses" viewBox="0 0 16 16">
              <path d="M4.968 9.75a.5.5 0 1 0-.866.5A4.498 4.498 0 0 0 8 12.5a4.5 4.5 0 0 0 3.898-2.25.5.5 0 1 0-.866-.5A3.498 3.498 0 0 1 8 11.5a3.498 3.498 0 0 1-3.032-1.75zM7 5.116V5a1 1 0 0 0-1-1H3.28a1 1 0 0 0-.97 1.243l.311 1.242A2 2 0 0 0 4.561 8H5a2 2 0 0 0 1.994-1.839A2.99 2.99 0 0 1 8 6c.393 0 .74.064 1.006.161A2 2 0 0 0 11 8h.438a2 2 0 0 0 1.94-1.515l.311-1.242A1 1 0 0 0 12.72 4H10a1 1 0 0 0-1 1v.116A4.22 4.22 0 0 0 8 5c-.35 0-.69.04-1 .116z"/>
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-1 0A7 7 0 1 0 1 8a7 7 0 0 0 14 0z"/>
            </svg>       
          </div>


        </div>
        <div class="center">
          <img
            src="@/assets/icon.png"
            width="80"
            height="80"
            id="logo"
            ref="logoRef"
          />
        </div>
        <div class="right" style="color: gray">
          <div @click="showList(true)" v-if="!musicBox.songsListFlag" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-in-left" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0v-2z"/>
              <path fill-rule="evenodd" d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3z"/>
            </svg>
          </div>
          <div @click="showList(false)" v-if="musicBox.songsListFlag" class="cursor-pointer">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" class="bi bi-box-arrow-right" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M10 12.5a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-9a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v2a.5.5 0 0 0 1 0v-2A1.5 1.5 0 0 0 9.5 2h-8A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-2a.5.5 0 0 0-1 0v2z"/>
              <path fill-rule="evenodd" d="M15.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L14.293 7.5H5.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3z"/>
            </svg>
          </div>
        </div>
        <!-- 进度条 -->
        <div class="progress" ref="progress" @click="changeProgress">
          <div class="jp-play-bar" ref="jp-play-bar" />
        </div>
      </div>
      <div class="controls">
        <div class="current">{{ musicBox.timer }}</div>
        <!-- operation -->
        <div class="play-controls">
          <a href="#" class="icon-back" @click="switchSong(-1)"></a>
          <a
           v-if="musicBox.status === 'paused'"
           href="#" 
           class="icon-play" 
           @click="playOrStopSong('playing')"></a>
          <a
            v-if="musicBox.status === 'playing'"
            href="#"
            class="icon-pause"
            @click="playOrStopSong('paused')"
          ></a>
          <a href="#" class="icon-next" @click="switchSong(1)"></a>
        </div>

        <div class="volume-level">
          <a href="#" class="icon-volume-down" @click="changeVol(-1)"></a>
          <div class="volume-progress" ref="volume-progress" @click="changeVolProgress">
            <span class="jp-volume-bar" ref="jp-volume-bar"></span>
          </div>
          <a href="#" class="icon-volume-up" @click="changeVol(1)"></a>
        </div>
      </div>
    </div>
    <songs-component
      :showFlag='musicBox.songsListFlag'
      :songsList="songsList"
      :currentSongIndex="musicBox.currentSongIndex"
      @changeSong="changeSong"
     />
    <audio
      ref="audio"
      class="audio"
      style="display: none"
      muted=“muted”
      loop
      @timeupdate="updateTime"
      :src="musicBox.url"
      controls="controls" />
      <!-- src="@/assets/诚如神之所说.mp3" -->
  </div>

</template>
<script lang="ts">

import { _arrayBufferToBase64 } from '@/utils/index'
import songsComponent from './components/songsList.vue'
export default {
  name: "Music",
  components: {
    songsComponent
  },
  data() {
    return {
      songsList: [],
      musicBox: {
        timer: '00:00',
        status: 'paused',
        url: '',
        songsListFlag: false,
        currentSongIndex: 0
      },
      // imgUrl: ''
    }
  },
  async created() {
    console.warn('1')
    await this.getSongs()
    console.warn('2')
    await this.getMedia(this.musicBox.currentSongIndex)
    window.addEventListener("keydown", this.handleKeyDown)
  },
  async mounted() {
    // this.initMusic();
  },
  methods: {
    async getSongs() {
      this.songsList = await this.$axios.getSongs()
      this.musicBox.currentSongIndex = Math.floor(Math.random() * this.songsList.length)
      console.log('随机值--->', this.musicBox.currentSongIndex)
      console.log('当前所有songs--->',this.songsList)
    }, 
// 根据当前song的id获取音频资源
    async getMedia(index) {
      console.log('当前歌曲id--->', index)
      const res = await this.$axios.getMedia(index)
      let blob = new Blob([res], {type: 'mp3'})
      let url = URL.createObjectURL(blob)
      this.musicBox.url = url
      console.log('当前url--->', this.musicBox.url)
    },       
    async changeSong(index) {
      console.log('子组件传回来的值index---->', index)
      this.playOrStopSong('paused')
      this.musicBox.currentSongIndex = index
      await this.getMedia(index)
      this.initMusic()
      this.playOrStopSong('playing')
    },
    showList(flag) {
      this.musicBox.songsListFlag = flag
    },


    // 根据flag上下切歌，如没有，则返回随机值
    getNextSong(flag) {
      if (flag === 1) {
        if (this.musicBox.currentSongIndex + 1>= this.songsList.length) {
          this.musicBox.currentSongIndex = 0
        } else {
          this.musicBox.currentSongIndex++
        }
      } else if(flag === -1) {
        if (this.musicBox.currentSongIndex - 1< 0) {
          this.musicBox.currentSongIndex = this.songsList.length - 1
        } else {
          this.musicBox.currentSongIndex--
        }
      } else {
        this.musicBox.currentSongIndex = Math.ceil(Math.random() * this.songsList.length)
      }
    },
    // 切歌
    async switchSong(flag) {
      this.getNextSong(flag)
      console.log('this.musicBox.currentSongIndex--->',this.musicBox.currentSongIndex)
      this.musicBox.url = await this.$axios.getMedia(this.musicBox.currentSongIndex)
      console.log('music--->', this.musicBox.url)
      // this.playOrStopSong('paused')
      this.initMusic()
    },
    changeVolProgress(e) {
      const volDiv = this.$refs['volume-progress']
      const volInner = this.$refs['jp-volume-bar']
      this.$refs['audio'].volume =  e.offsetX / volDiv.clientWidth
      volInner.style.width = e.offsetX + 'px'
    },
    handleKeyDown(e) {
      console.log('执行handleKeyDown----', e)
      switch(e.code) {
        case 'Space':
          this.playOrStopSong(this.musicBox.status === 'playing'? 'paused': 'playing')
          break;
      }
    },
    changeProgress(e) {
      // 获取鼠标点击点到div的左边距
      const progressDom = this.$refs['progress']
      const jpplaybarDom = this.$refs['jp-play-bar']
      const ratio = e.offsetX / progressDom.clientWidth
      jpplaybarDom.style.width =  ratio + 'px'
      this.$refs['audio'].currentTime = ratio * this.$refs['audio'].duration 
    },
    updateTime() {
      // timer = 分:秒
      const total = this.$refs['audio'].duration
      const progressDom = this.$refs['progress']
      const jpplaybarDom = this.$refs['jp-play-bar']
      jpplaybarDom.style.width =  this.$refs['audio'].currentTime / total * progressDom.clientWidth + 'px'
      
      const min = Math.floor(this.$refs['audio'].currentTime / 60)
      let minl = ''
      const sec = (this.$refs['audio'].currentTime - (min * 60)).toFixed(0)
      let secl = ''
      if (min < 10) {
        minl = '0'
      }
      if (Number(sec) < 10) {
        secl = '0'
      }
      this.musicBox.timer = minl + min + ':' + secl + sec
    },     
    // 播放合暂停
    playOrStopSong(flag) {
      if (flag === 'playing') {
        this.$refs['logoRef'].style.animationPlayState = "running";
        this.$refs['audio'].play()
      } else if(flag === 'paused') {
        this.$refs['logoRef'].style.animationPlayState = "paused";
        this.$refs['audio'].pause()
      }
      this.musicBox.status = flag
    },
    // 音量控制
    changeVol(flag) {
      if (flag === 1) {
        this.$refs['audio'].volume = (this.$refs['audio'].volume + 0.1) >= 1?1: this.$refs['audio'].volume + 0.1
      } else if(flag === -1) {
        this.$refs['audio'].volume = (this.$refs['audio'].volume - 0.1) <= 0?0: this.$refs['audio'].volume - 0.1
      }
      const volDiv = this.$refs['volume-progress']
      const volInner = this.$refs['jp-volume-bar']
      volInner.style.width = this.$refs['audio'].volume * volDiv.clientWidth + 'px'
    },
    // 初始化播放器
    initMusic() {
      this.$refs['logoRef'].style.setProperty('transform', 'rotate(0deg)', "important") 
      console.log('??????', this.$refs['logoRef'].style)
      // this.$refs['logoRef'].transform = 'rotate(0)'
    }
  },
  beforeDestroy() {
    window.removeEventListener("keydown", this.handleKeyDown);
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.music {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-image: linear-gradient(120deg,#487399,#994515);
  .music-player {
    position: relative;
    width: 350px;
    height: 290px;
    border-radius: 10px;
    background: #222;
    overflow: hidden;
    /* logo图标设置 */
    #logo {
      position: absolute;
      top: 10px;
      left: 140px;
      animation: App-logo-spin infinite 20s linear;
      animation-play-state: paused
    }
    // .logo-pause {
    //   animation-play-state: paused !important;
    // }

    // .logo-play {
    //   animation-play-state: running !important;
    // }    

    @keyframes App-logo-spin {
      from {
        transform: rotate(0deg);
      }
      to {
        transform: rotate(360deg);
      }
    }    
    .progress {
      width: 100%;
      height: 5px;
      background: #000;
      position: absolute;
      bottom: 0px;
      cursor: pointer;
      .jp-play-bar {
        height: 100%;
        width: 0px;
        background-color: red;
      }
    }    
    .current {
      font-size: 48px;
      height: 90px;
      color: rgba(225, 225, 225, 0.4);
      padding: 15px 0 20px;
    }    
  }
}









.music-player .info {
  width: 100%;
  height: 100px;
  background: rgba(0, 0, 0, 0.8);
  text-align: center;
  position: relative;
}

.music-player .controls {
  text-align: center;
  width: 100%;
  height: 190px;
  background: rgba(47, 47, 47, 0.9);
}

.music-player .info .left {
  width: 25px;
  position: absolute;
  top: 30px;
  left: 30px;
}

.music-player .info .right {
  width: 25px;
  position: absolute;
  top: 30px;
  right: 30px;
}

.music-player .info [class^="icon-"] {
  margin: 0 0 10px;
}

[class^="icon-"] {
  width: 18px;
  height: 18px;
  display: block;
  cursor: pointer;
}

.icon-praise {
  background-image: url("../../../assets/praise.png") no-repeat center;
}

.icon-love {
  background: url("../../../assets/love.png") no-repeat center;
}

.icon-share {
  background: url("../../../assets/share.png") no-repeat center;
}

.icon-model {
  background: url("../../../assets/model.png") no-repeat center;
}

.music-player 
.music-player .progress span {
  position: relative;
  display: block;
  background: #ed553b;
  cursor: pointer;
  height: 100%;
}

.music-player .play-controls a {
  display: inline-block;
  width: 35px;
  height: 40px;
  margin: 0 30px;
}

.icon-back {
  background: url("../../../assets/back.png") no-repeat center;
}

.icon-next {
  background: url("../../../assets/next.png") no-repeat center;
}

.icon-pause {
  background: url("../../../assets/pause.png") no-repeat center;
}

.icon-play {
  background: url("../../../assets/play.png") no-repeat center;
}

.icon-hide {
  display: none;
}

.icon-volume-up {
  background: url("../../../assets/max-audio.png") no-repeat center;
}

.icon-volume-down {
  background: url("../../../assets/min-audio.png") no-repeat center;
}

.volume-level {
  width: 100%;
  height: 30px;
  position: relative;
}
.icon-volume-up {
  position: absolute;
  top: 20%;
  right: 62px;
  width: 19px;
}

.icon-volume-down {
  position: relative;
  top: 20%;
  left: 71px;
}

.music-player .volume-progress {
  width: 157px;
  height: 2px;
  /* border: 1px solid red; */
  background: #000;
  position: absolute;
  bottom: 13px;
  cursor: pointer;
  left: 98px;
}
.music-player .volume-progress span {
  position: relative;
  display: block;
  background: #ed553b;
  cursor: pointer;

  height: 100%;
}

.music-player .controls .current {
  font-size: 48px;
  color: rgba(225, 225, 225, 0.4);
  padding: 15px 0 20px;
}

.title_text {
  font-size: 40px;
  font-weight: 300;
  text-decoration: none;
  color: rgba(225, 225, 225, 0.4);
  position: relative;
  top: 26px;
  left: 1px;
}




</style>
