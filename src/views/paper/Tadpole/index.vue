<!--
 * @Author: Hhvcg
 * @Date: 2022-12-20 15:01:29
 * @LastEditors: Hhvcg
 * @Description:tadpole
-->

<template>
  <div class="tadpole-container pd10">
    <commonTemplate title="Tadpole" />
    <div class="tadpole-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import { Boid } from './myBoid.js'
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'
import tools from './tools'

export default {
  name: 'tadpole',
  mixins: [tools],
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'tadpole',
      WIDTH: null,
      HEIGHT: null,
      heartPath: null,
      boids: []
    }
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  watch: {},
  mounted() {
    this.init()
    this.drawLovePath()
    this.drawTadpole()
  },
  beforeDestroy() {
    if (this.currentProject) {
      this.currentProject.remove()
    }
  },
  methods: {
    // indexDB code
    // addTable() {
    //   console.log('this.db>>>', this.db)
    //   const req = this.db.transation(['person'], 'readwrite')
    //     .objectStore('person')
    //     .add({ id: 1, name: 'hhvcg', age: 15 })
    //   req.onsuccess = (e) => {
    //     console.log('write success')
    //   }
    // },
    // openDB() {
    //   const req = window.indexedDB.open('test', 3)
    //   req.onsuccess = (e) => {
    //     // database obj
    //     this.db = req.result
    //     this.addTable()
    //   }
    //   // 如果指定的版本号，大于数据库的实际版本号，就会发生数据库升级事件upgradeneeded
    //   req.onupgradeneeded = (e) => {
    //     this.db = e.target.result
    //   }
    //   req.onerror = (e) => {
    //     console.log('error')
    //   }
    // },
    // initIndexDB() {
    //   if (window.indexedDB) {
    //     this.openDB()
    //   }
    // },
    drawLovePath() {
      this.heartPath = new paper.Path('M514.69629,624.70313c-7.10205,-27.02441 -17.2373,-52.39453 -30.40576,-76.10059c-13.17383,-23.70703 -38.65137,-60.52246 -76.44434,-110.45801c-27.71631,-36.64355 -44.78174,-59.89355 -51.19189,-69.74414c-10.5376,-16.02979 -18.15527,-30.74951 -22.84717,-44.14893c-4.69727,-13.39893 -7.04297,-26.97021 -7.04297,-40.71289c0,-25.42432 8.47119,-46.72559 25.42383,-63.90381c16.94775,-17.17871 37.90527,-25.76758 62.87354,-25.76758c25.19287,0 47.06885,8.93262 65.62158,26.79834c13.96826,13.28662 25.30615,33.10059 34.01318,59.4375c7.55859,-25.88037 18.20898,-45.57666 31.95215,-59.09424c19.00879,-18.32178 40.99707,-27.48535 65.96484,-27.48535c24.7373,0 45.69531,8.53564 62.87305,25.5957c17.17871,17.06592 25.76855,37.39551 25.76855,60.98389c0,20.61377 -5.04102,42.08691 -15.11719,64.41895c-10.08203,22.33203 -29.54687,51.59521 -58.40723,87.78271c-37.56738,47.41211 -64.93457,86.35352 -82.11328,116.8125c-13.51758,24.0498 -23.82422,49.24902 -30.9209,75.58594z')
    },
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    // // 创建蝌蚪军团
    drawTadpole() {
      for (let i = 0; i < 50; i++) {
        const location = this.random()
        this.boids.push(new Boid(location, 10, 0.05))
      }
    },
    onFrame() {
      this.boids.forEach((boid) => {
        boid.run(this.boids, false)
      })
    },
    onMouseDown(e) {
    },
    init() {
      const canvas = this.$refs.canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.project.name = this.title
      this.paper.view.onFrame = this.onFrame
    }
  }
}
</script>
<style scoped lang="scss">
.tadpole-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}
</style>
