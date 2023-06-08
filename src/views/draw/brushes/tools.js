/*
 * @Author: Hhvcg
 * @Date: 2023-02-12 13:58:05
 * @LastEditors: Hhvcg
 * @Description:
 */

import paper from 'paper'
export default {
  data() {
    return {
    }
  },
  created() {

  },
  mounted() {
    this.initTool()
  },
  methods: {
    handleClickTool() {
      this.$emit('changeBrush', this.name)
    },
    initTool() {
      this.tool = new paper.Tool()
      this.tool.onMouseDown = this.onMouseDown
      this.tool.onMouseDrag = this.onMouseDrag
      this.tool.onMouseMove = this.onMouseMove
      this.tool.onMouseUp = this.onMouseUp
    }
  },
  watch: {
    selected() {
      console.log('selected', this.selected)
      if (this.selected === this.name) {
        this.$message.success(`激活${this.name}工具`)
        this.tool.activate()
      }
    }
  }
}
