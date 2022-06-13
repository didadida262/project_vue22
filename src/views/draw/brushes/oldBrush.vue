<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="老笔刷"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'old_brush' }, 'icon', 'el-icon-brush']"
     @click="changeBrush"
     >
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from "paper";
import tool from "@/components/tool";

export default {
  name: "oldBrush",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  mixins: [tool],
  data() {
    return {
      brush: {
        readius: 10,
        path: null,
        color: 'black'
      },
      selection: null,
      tool: null
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'old_brush') {
        this.init()
      } else {
        this.tool = null
      }
    },
  },
  mounted() {},
  methods: {
    init() {
      this.tool = new paper.Tool()
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown    
      this.tool.onMouseDrag = this.onMouseDrag    
      this.tool.onMouseMove = this.onMouseMove    
      this.tool.onMouseUp = this.onMouseUp    
    },    
    changeBrush() {
      this.$emit('changeBrush', 'old_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {

    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        strokeColor: this.brush.color,
        strokeWidth: this.brush.radius
      })
      this.selection = this.selection.unite(this.brush.path).clone()
    },
    onMouseMove(e) {
      this.log('move')
      if (this.brush.path === null) {
        this.createBrush(e)
      }
      this.brush.path.bringToFront();
      this.brush.path.position = e.point
    },
    onMouseDrag(e) {
      this.seclection = this.selection.unite(this.brush.path).clone()
    },
    createBrush(e) {
      this.brush.path = new paper.Path.Circle({
        center: e.point,
        strokeColor: this.brush.color,
        radius: this.brush.radius
      })
    }
  },

  created() {
    this.log("pencile---created");
  },
};
</script>

<style lang="scss" scoped>
.item {
  .is-active {
    color: red;
  }
}
</style>
