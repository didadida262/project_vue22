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
          <div>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-emoji-smile-upside-down-fill" viewBox="0 0 16 16">
              <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zM7 9.5C7 8.672 6.552 8 6 8s-1 .672-1 1.5.448 1.5 1 1.5 1-.672 1-1.5zM4.285 6.433a.5.5 0 0 0 .683-.183A3.498 3.498 0 0 1 8 4.5c1.295 0 2.426.703 3.032 1.75a.5.5 0 0 0 .866-.5A4.498 4.498 0 0 0 8 3.5a4.5 4.5 0 0 0-3.898 2.25.5.5 0 0 0 .183.683zM10 8c-.552 0-1 .672-1 1.5s.448 1.5 1 1.5 1-.672 1-1.5S10.552 8 10 8z"/>
            </svg>
          </div>
        </div>
        <!-- 进度条 -->
        <div class="progress" ref="progress" @click="changeProgress">
          <div class="jp-play-bar" ref="jp-play-bar" />
        </div>
      </div>
      <div class="controls">
        <div class="current">{{ this.musicBox.timer }}</div>
        <!-- operation -->
        <div class="play-controls">
          <a href="#" class="icon-back" @click="switchSong(-1)"></a>
          <a
           v-if="musicBox.status === 'paused'"
           href="#" 
           class="icon-play" 
           @click="handleSong('playing')"></a>
          <a
            v-if="musicBox.status === 'playing'"
            href="#"
            class="icon-pause"
            @click="handleSong('paused')"
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
    <audio
      ref="audio"
      class="audio"
      style="display: none"
      muted=“muted”
      loop
      @timeupdate="updateTime"
      :src="musicBox.url"
      controls="controls"
    />
      <!-- src="@/assets/诚如神之所说.mp3" -->
  </div>

</template>
<script lang="ts">

import { _arrayBufferToBase64 } from '@/utils/index'
export default {
  name: "Music",
  data() {
    return {
      musicBox: {
        el: null,
        timer: '00:00',
        audioUrl: null,
        status: 'paused',
        url: '',
        songIndex: 0
      },
      // imgUrl: ''
    }
  },
  created() {
    this.getMedia()
    window.addEventListener("keydown", this.handleKeyDown)
  },
  mounted() {
    this.initMusic();
  },
  methods: {
    async getMedia() {
      this.musicBox.songIndex = Math.floor(Math.random() * 3)
      const res = await this.$axios.getMedia(this.musicBox.songIndex)
      console.log('res---->', res)
      let blob = new Blob([res], {type: 'mp3'})
      let url = URL.createObjectURL(blob)
      // url = url + _arrayBufferToBase64(res)
      this.musicBox.url = url
      console.log('blob--->', blob)
      console.log('url--->', url)
    },
    async switchSong(flag) {
      if (flag === 1) {
        console.log('下一首')
        // const music = await this.$axios.getMusic()
      } else {
        console.log('上一首')
      }
      this.handleSong('paused')
      this.initMusic()
      this.getMedia()
    },
    changeVolProgress(e) {
      const volDiv = this.$refs['volume-progress']
      const volInner = this.$refs['jp-volume-bar']
      this.musicBox.el.volume =  e.offsetX / volDiv.clientWidth
      volInner.style.width = e.offsetX + 'px'
    },
    handleKeyDown(e) {
      console.log('执行handleKeyDown----', e)
      switch(e.code) {
        case 'Space':
          this.handleSong(this.musicBox.status === 'playing'? 'paused': 'playing')
          break;
      }
    },
    changeProgress(e) {
      // 获取鼠标点击点到div的左边距
      const progressDom = this.$refs['progress']
      const jpplaybarDom = this.$refs['jp-play-bar']
      const ratio = e.offsetX / progressDom.clientWidth
      jpplaybarDom.style.width =  ratio + 'px'
      this.musicBox.el.currentTime = ratio * this.musicBox.el.duration 
    },
    updateTime() {
      // timer = 分:秒
      const total = this.musicBox.el.duration
      const progressDom = this.$refs['progress']
      const jpplaybarDom = this.$refs['jp-play-bar']
      jpplaybarDom.style.width =  this.musicBox.el.currentTime / total * progressDom.clientWidth + 'px'
      
      const min = Math.floor(this.musicBox.el.currentTime / 60)
      let minl = ''
      const sec = (this.musicBox.el.currentTime - (min * 60)).toFixed(0)
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
    handleSong(flag) {
      if (flag === 'playing') {
        console.log('放')
        this.$refs['logoRef'].style.animationPlayState = "running";
        this.musicBox.el.play()
      } else if(flag === 'paused') {
        this.$refs['logoRef'].style.animationPlayState = "paused";
        this.musicBox.el.pause()
        console.log('停')
      }
      this.musicBox.status = flag
    },
    // 音量控制
    changeVol(flag) {
      if (flag === 1) {
        this.musicBox.el.volume = (this.musicBox.el.volume + 0.1) >= 1?1: this.musicBox.el.volume + 0.1
      } else if(flag === -1) {
        this.musicBox.el.volume = (this.musicBox.el.volume - 0.1) <= 0?0: this.musicBox.el.volume - 0.1
      }
      const volDiv = this.$refs['volume-progress']
      const volInner = this.$refs['jp-volume-bar']
      volInner.style.width = this.musicBox.el.volume * volDiv.clientWidth + 'px'
    },
    // 初始化播放器
    initMusic() {
      this.$refs['logoRef'].style.animationPlayState = "paused";
      this.$refs['logoRef'].style.transform = "rotate(0deg)";
      this.musicBox.el = this.$refs['audio']
      this.musicBox.el.volume = 1
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
    box-shadow: 0 0 60px rgba(0, 0, 0, 0.8);
    border-radius: 10px;
    background: #222;
    overflow: hidden;
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

/* logo图标设置 */
#logo {
  position: absolute;
  top: 10px;
  left: 140px;
  animation: App-logo-spin infinite 20s linear;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.logo-pause {
  animation-play-state: paused !important;
}

.logo-play {
  animation-play-state: running !important;
}
</style>
