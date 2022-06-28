<template>
  <div class="music">
    <div class="music-player">
      <div class="info">
        <div class="left">
          <a href="#" class="icon-praise"></a>
          <a href="#" class="icon-love"></a>
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
        <div class="right">
          <a href="#" class="icon-model"></a>
          <a href="#" class="icon-share"></a>
        </div>
        <!-- 进度条 -->
        <div class="progress" ref="progress">
          <div class="jp-play-bar" ref="jp-play-bar"></div>
        </div>
      </div>
      <div class="controls">
        <div class="current">{{ this.musicBox.timer }}</div>
        <!-- operation -->
        <div class="play-controls">
          <a href="#" class="icon-back"></a>
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
          <a href="#" class="icon-next"></a>
        </div>

        <div class="volume-level">
          <a href="#" class="icon-volume-down" @click="changeVol(-1)"></a>
          <div class="volume-progress">
            <span class="jp-volume-bar"></span>
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
      src="@/assets/诚如神之所说.mp3"
      controls="controls"
    />
  </div>

</template>
<script lang="ts">

import { log, e} from '@/utils/weapons'
export default {
  name: "Music",
  data() {
    return {
      musicBox: {
        el: null,
        timer: '00:00',
        audioUrl: null,
        status: 'paused'
      }
    }
  },
  created() {

  },
  mounted() {
    this.initMusic();
  },
    // const logoRef = ref<null | HTMLElement>(null);
    // const pauseRef = ref<null | HTMLElement>(null);
    // const playRef = ref<null | HTMLElement>(null);
    // const audioUrl = ref("");
    // const timer = ref<null | any>(null);
    // getMusic().then((music) => {
    //   audioUrl.value = "data:audio/mp3;base64," + _arrayBufferToBase64(music);
    // });
    // let musicBox = null as any;
    // const songs: any[] = [];
    // const addSong = (name: string) => {
    //   songs.push("./media/" + name);
    // };
    // const playSong = () => {
    //   musicBox.play();
    //   pauseRef.value.style.display = "inline-block";
    //   playRef.value.style.display = "none";
    //   logoRef.value.style.animationPlayState = "running";
    // };
    // const stopSong = () => {
    //   musicBox.pause();
    //   playRef.value.style.display = "inline-block";
    //   pauseRef.value.style.display = "none";
    //   logoRef.value.style.animationPlayState = "paused";
    // };

    methods: {
      updateTime() {
        // timer = 分:秒
        const total = this.musicBox.el.duration
        const progressDom = this.$refs['progress']
        const jpplaybarDom = this.$refs['jp-play-bar']
        // log('progressDom--->', progressDom)
        // log('jpplaybarDom--->', jpplaybarDom)
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
      changeVol(flag) {
        if (flag === 1) {
          console.log('加大音量')
        } else if(flag === -1) {
          console.log('减小音量')
        }

      },
      // 初始化播放器
      initMusic() {
        this.$refs['logoRef'].style.animationPlayState = "paused";
        // this.$refs.logoRef.valu
        this.musicBox.el = this.$refs['audio']
        // this.musicBox.el.src = '../../../assets/诚如神之所说.mp3'
        // log('this.musicBox', this.musicBox)

        // musicBox.src = audioUrl.value;
        // console.log("musicBox:", musicBox);
        // addSong('诚如神之所说.mp3')
        // addSong('小姐.mp3')
        // playSong(0)
      }
      // const addVol = () => {
      //   console.log(musicBox.volume);
      //   musicBox.vloume = musicBox.volume + 0.1;
      // };
      // const minusVol = () => {
      //   console.log(musicBox.volume);
      // }
      //   musicBox.vloume = musicBox.volume - 0.1;
    },



};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.music {
  // background: url("../../../assets/back-image.jpg") no-repeat center;
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
