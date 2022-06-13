<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <el-tooltip class="item" effect="dark" content="铅笔" placement="right">
    <div
     :class="[{ 'is-active': selected === 'pencil' }, 'icon', icon]"
     @click="changeBrush">
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from "paper";

export default {
  name: "pencil",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      icon: "el-icon-edit",
      path: null,
      tool: null
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'pencil') {
        this.init()
      } else {
        this.tool = null
      }
    },
  },
  mounted() { },
  methods: {
    init() {
      this.log('初始化pencil--->')
      this.tool = this.$parent.tool
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
    },
  },

  created() {
    console.log('this.selected--->', this.selected)
  },
};
</script>

<style lang="scss" scoped>

</style>
