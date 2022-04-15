<template>
  <div class="dashboard">
    <div class="dashboard-container" ref="cont">
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      tabs: null,
      divs: [],
      steps: 1000
    }
  },
  created() {
    this.tabs = this.fastSin(10)
  },
  mounted() {
    this.draw()
  },
  // beforeDestroy() {
  destroyed() {
    console.log('组件销毁')
  },

  methods: {
    draw() {
      const dom = this.$refs.cont
      for (let i = 0; i < 10; i++) {
        const top = this.tabs[i] >= 0 ? (1 - this.tabs[i]) : (1 + Math.abs(this.tabs[i]))
        const div = document.createElement('div')
        div.style.position = 'absolute'
        div.style.width = '10px'
        div.style.height = '40px'
        div.style.top = top * 100 + 'px'
        div.style.left = i * 100 + 'px'
        div.style.backgroundColor = 'black'
        this.divs.push(div)
      }
      setInterval(() => {
        for (const item of this.divs) {
          dom.appendChild(item)
        }
      }, 2000)
    },
    fastSin(steps) {
      const tabs = []
      let ang = 0
      let step = Math.PI * 2 / steps
      while (steps) {
        tabs.push(Math.sin(ang))
        steps--
        ang = ang + step
      }
      return tabs
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  border: 1px solid red;
  width: 100%;
  margin-bottom: 50px;
  height: 80vh;
  padding: 10px;
  overflow: scroll;
  display: flex;
  justify-content: center;
  align-items: center;
  &-text {
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 100%;
    height: 45px;
    border: 1px solid gray;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
  }
  &-container {
    width: 80%;
    height: 500px;
    border: 1px solid black;
    position: relative;
  }
}
</style>
