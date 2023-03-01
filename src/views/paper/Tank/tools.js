/*
 * @Author: Hhvcg
 * @Date: 2023-03-01 16:47:29
 * @LastEditors: -_-
 * @Description:  全能型适配paper的tool文件
 */

import paper from 'paper'
export default {
  mounted() {
    this.initTool()
  },
  methods: {
    initTool() {
      this.tool = new paper.Tool()
      this.tool.onMouseDown = this.onMouseDown
      this.tool.onMouseDrag = this.onMouseDrag
      this.tool.onMouseMove = this.onMouseMove
      this.tool.onMouseUp = this.onMouseUp
      this.tool.onKeyDown = this.onKeyDown
    }
  }
}
