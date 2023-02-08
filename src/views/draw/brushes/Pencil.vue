<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <el-tooltip class="item" effect="dark" content="铅笔" placement="right">
    <div
     :class="[{ 'is-active': selected === 'pencil' }]"
     @click="changeBrush">
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil" viewBox="0 0 16 16">
        <path d="M12.146.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1 0 .708l-10 10a.5.5 0 0 1-.168.11l-5 2a.5.5 0 0 1-.65-.65l2-5a.5.5 0 0 1 .11-.168l10-10zM11.207 2.5 13.5 4.793 14.793 3.5 12.5 1.207 11.207 2.5zm1.586 3L10.5 3.207 4 9.707V10h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.293l6.5-6.5zm-9.761 5.175-.106.106-1.528 3.821 3.821-1.528.106-.106A.5.5 0 0 1 5 12.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.468-.325z"/>
      </svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from 'paper'

export default {
  name: 'pencil',
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      icon: 'el-icon-edit',
      path: null,
      tool: null
    }
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'pencil') {
        this.init()
      } else {
        this.tool = null
      }
    }
  },
  mounted() { },
  methods: {
    init() {
      console.log('初始化pencil--->')
      if (!this.tool) {
        this.tool = new paper.Tool()
        this.tool.activate()
      }
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown
      this.tool.onMouseDrag = this.onMouseDrag
      this.tool.onMouseMove = this.onMouseMove
    },
    onMouseMove(e) {

    },
    changeBrush() {
      this.$emit('changeBrush', 'pencil')
    },
    onKeyDown(e) {
    },
    onMouseDown(e) {
      this.path = new paper.Path({
        strokeColor: 'black'
      })
      this.path.add(e.point)
    },
    onMouseDrag(e) {
      this.path.add(e.point)
    }
  },

  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
