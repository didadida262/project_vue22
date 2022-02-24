<template>
  <div class="draw-container">
    <Tool @changeRa="selectBrush" />
    <Content ref='Content' />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tool from './Tool'
import Content from './Content'
import paper from 'paper'

export default {
  name: 'Dashboard',
  components: {
    Tool,
    Content
  },
  data() {
    return {
      ra: 20
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  mounted() {
    this.ini()
  },
  methods: {
    selectBrush(ra) {
      this.ra = ra
    },
    ini() {
      const canvas = this.$refs.Content.$refs.main_canvas
      paper.setup(canvas)
      const tool = new paper.Tool()
      tool.onMouseDown = (e) => {
        console.log('click-down')
        this.myPath = new paper.Path()
        this.myPath.strokeColor = 'red'
        this.myPath.strokeWidth = this.ra
        this.myPath.add(e.point)
      }
      tool.onMouseUp = () => {
        console.log('抬起')
      }
      tool.onMouseDrag = (e) => {
        this.myPath.add(e.point)
      }
      tool.onKeyDown = (e) => {
        if (e.key === 'space') {
          const layer = paper.project.activeLayer
          layer.selected = !layer.selected
          return false
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.draw {
  &-container {
    margin: 30px;
  }
}
.draw-container {
  height: 80vh;
  display: flex;
  justify-content: space-between;
}
</style>
