/*
 * @Author: Hhvcg
 * @Date: 2022-06-11 13:08:23
 * @LastEditors: -_-
 * @Description: tool工具mixin
 */
export default {
  computed: {
  },
  created() {
    this.log('mixin组件--created')

  },
  mounted() {
    this.log('mixin组件----mounted！')

    
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
