<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <el-tooltip class="item" effect="dark" content="粗铅笔" placement="right">
    <div
     :class="[{ 'is-active': selected === 'fat_pencil' }]"
     @click="handleClickTool">
     <svg t="1677134075546" width="16" height="16" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3111"><path d="M863.99296 0c88.369433 0 160.00704 71.637607 160.00704 160.00704 0 36.0236-11.919122 69.261975-32.0096 96.00832l-63.99872 63.99872-224.00576-224.00576 63.99872-63.99872c26.746345-20.090478 59.98472-32.0096 96.00832-32.0096zM63.99872 735.99552l-63.99872 288.00448 288.00448-63.99872 591.98304-591.98304-224.00576-224.00576-591.98304 591.98304zM715.556889 363.574169l-447.99104 447.99104-55.151537-55.151537 447.99104-447.99104 55.151537 55.151537z" fill="#444444" p-id="3112"></path></svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from 'paper'
import tools from '../tools'
export default {
  name: 'fat_pencil',
  mixins: [tools],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: 'fat_pencil',
      icon: 'el-icon-edit',
      path: null
    }
  },
  computed: {},
  watch: {

  },
  mounted() {

  },
  methods: {
    onMouseMove(e) {
      console.log('drag')
    },
    onMouseDown(e) {
      console.log('this', e)
      console.log('活跃图层名称1', this.$parent.activePaperScope.project.name)
      console.log('活跃图层名称2', this.$parent.activateScope)
      console.log('down')
      this.path = new paper.Path({
        strokeColor: 'black',
        strokeWidth: 20
      })
      this.path.add(e.point)
    },
    onMouseDrag(e) {
      console.log('drag')
      this.path.add(e.point)
    }
  },
  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
