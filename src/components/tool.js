/*
 * @Author: Hhvcg
 * @Date: 2022-06-11 13:08:23
 * @LastEditors: -_-
 * @Description: tool工具mixin
 */
import paper from 'paper'
export default {
  computed: {
  },
  created() {
    this.log('mixin组件--created')

  },
  mounted() {
    this.log('mixin组件----mounted！')
    this.tool = new paper.Tool()
    this.tool.onKeyDown = this.onKeyDown
    this.tool.onMouseDown = this.onMouseDown    
    this.tool.onMouseDrag = this.onMouseDrag    
    
    // In order to fix the click on menu on the ios device will trigger the mouseleave bug
    // https://github.com/PanJiaChen/vue-element-admin/issues/1135
  },
  methods: {
    removeItem(item) {
      if (item) {
        item.remove()
        item = null
      }
    },    
  }
}
