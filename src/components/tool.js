import paper from 'paper'
export default {
  computed: {
  },
  created() {
    this.tool = new paper.Tool()
    this.tool.onKeyDown = this.onKeyDown
    this.tool.onMouseDown = this.onMouseDown
  },
  mounted() {
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
