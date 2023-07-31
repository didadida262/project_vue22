<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: Hhvcg
 * @Description:
-->
<template>
  <div class="dashboard-st">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paper from 'paper'
import bus from '@/api/eventBus'
import { getRandomColor } from '@/utils/weapons'
import child from './child.vue'
// import { getRandomColor, getCirclePoint } from '@/utils/weapons'

export default {
  name: 'Dashboard',
  components: {
    child
  },
  computed: {
    ...mapGetters([
      'name'
    ]),
    currentProject() {
      console.log('---Dashboard---computed--->')
      return paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  data() {
    return {
      circleData: require('@/api/circleData'),
      testData: {
        name: 'hhvcg',
        old: 15
      },
      respBlob: [],
      fileList: [],
      hitResult: null,
      title: 'dashBoard',
      scale: 0,
      zoom: 1,
      //
      ratio: 1.05,
      p: null,
      image: {
        raster: null
      },
      url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
      url2: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      tool: null,
      // 存储画布容器宽高
      WIDTH: null,
      HEIGHT: null,
      SIZE: 100,
      snake: {
        x: null,
        y: null,
        direction: 1,
        respo: []
      },
      hitOptions: {
        segments: true,
        stroke: true,
        fill: true,
        tolerance: 5
      },
      DOTNUMBER: 170 * 80
      // 2000个： update: 62ms. draw: 62ms
      // 10000个: update: 164ms. drag: 164ms
    }
  },
  created() {
    console.log('---Dashboard---created--->')
    console.log(window.performance)
    this.paper = null
    bus.$on('click', (data) => {
      console.log('dashboard---->', data)
    })
  },
  mounted() {
    // this.currentProject.remove()

    console.log('---Dashboard---mounted--->')

    this.initWorld()
    this.draw()
    this.testJSON()
    this.currentProject.view.update()
    console.time('test')
    console.timeEnd('test')
  },
  beforeDestroy() {
    this.currentProject.remove()
  },

  methods: {
    testJSON() {
      let line = new paper.Path.Line({
        selected: true
      })
      line.add(new paper.Point(100))
      line.add(new paper.Point(200))
      line.add(new paper.Point(300))
      const json = line.exportJSON({
        asString: false,
        precision: 6
      })
      line.remove()
      line = null
      console.log('json>>>', json)
      const newRec = new paper.Path().importJSON(json)
    },
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    draw() {
      console.time('draw')
      for (let i = 0; i < this.DOTNUMBER; i++) {
        const c = new paper.Path.Circle({
          center: this.random(),
          fillColor: getRandomColor(),
          radius: 5
        })
      }
      console.timeEnd('draw')
    },
    handleTestDrag(e) {
      e.stopPropagation()
      const target = this.currentProject.layers[0].children.filter((item) => item.name === 'test')[0]
      if (target) {
        // target.set({
        //   position: e.point
        // })
        // target.position = target.position.add(e.delta)
      }
      if (this.segment) {
        // const isCounterClock =
        //     this.segment.previous.point.x === this.segment.point.x
        // const prev = isCounterClock ? this.segment.previous : this.segment.next
        // const next = !isCounterClock
        //   ? this.segment.previous
        //   : this.segment.next

        // prev.point = new paper.Point(e.point.x, prev.point.y)
        // next.point = new paper.Point(next.point.x, e.point.y)
        const previous = this.segment.previous
        const next = this.segment.next
        if (this.segment.index === 1 || this.segment.index === 3) {
          previous.point = previous.point.add(e.delta.x, 0)
          next.point = next.point.add(0, e.delta.y)
        } else if (this.segment.index === 0 || this.segment.index === 2) {
          previous.point = previous.point.add(0, e.delta.y)
          next.point = next.point.add(e.delta.x, 0)
        }
        this.segment.point = this.segment.point.add(e.delta)
      }
    },
    handleTestDown(e) {
      console.log('hitResult>>', hitResult)

      e.stopPropagation()
      const hitResult = this.currentProject.hitTest(e.point, this.hitOptions)
      if (hitResult) {
        if (hitResult.type === 'segment') {
          console.warn('segment>>')
          this.segment = hitResult.segment
        } else if (hitResult.type === 'stroke') {
          // var location = hitResult.location
          // segment = path.insert(location.index + 1, event.point)
          // path.smooth()
        }
      }
    },
    handleFileChange(file, fileList) {
      console.log('handleFileChange>>', fileList)
      const bin = []
      bin.push(fileList[0].raw)
      const t = URL.createObjectURL(new Blob(bin))
      this.respBlob.push(t)
      console.log('respBlob>>>', this.respBlob)
      if (this.raster) {
        this.raster.set({
          source: t
        })
        return
      }
      this.raster = new paper.Raster({
        position: 0,
        source: t
      })
      // this.raster.onLoad = () => {
      //   this.raster.fitBounds(this.currentProject.view.bounds, false)
      // }
    },
    beforeAvatarUpload(file) {
      // console.log('beforeAvatarUpload>>', file)
      // const bin = []
      // bin.push(file)
      // const t = URL.createObjectURL(new Blob(bin))
      // this.respBlob.push(t)
      // const r = new paper.Raster({
      //   position: this.paper.projects[0].layers[0].children[this.i].position,
      //   source: t
      // })
      // r.kk = this.i
      // r.onLoad = () => {
      //   r.fitBounds(this.paper.projects[0].layers[0].children[r.kk].bounds, false)
      // }

      // console.log('t>>', t)
      // console.log('t>>', this.paper)
      // this.i++

      return false
    },
    t(e) {
      console.log('eeee', e)
    },

    initWorld() {
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      paper.setup(canvas)
      this.paper = paper
      this.paper.project.name = this.title
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.autoUpdate = false
      this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
      this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
      // this.paper.view.setCenter(0, 0)
      console.log('this.paper', this.paper)
      // console.log('ctx.gggg', ctx.getImageData(this.currentProject.view.bounds))
    },

    onFrame(e) {
      // this.currentProject.layers[0].children.forEach((_p) => {
      //   _p.rotate(3, new paper.Point(0))
      // })
    },
    onMouseDrag(e) {
      if (this.hitResult) {
        this.hitResult.set({
          position: e.point
        })
        // // 重新渲染矩形
        // this.hitResult.redraw()

        // // 更新视图，进行局部渲染
        this.currentProject.view.update()
      }
    },
    onMouseDown(e) {
      this.hitResult = this.currentProject.hitTest(e.point).item
    }

  }
}
</script>

<style lang="scss" scoped>
.dashboard-st {
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  .main_canvas {
      width: 100%;
      height: 100%;
      background: gray;
    }
}
</style>
