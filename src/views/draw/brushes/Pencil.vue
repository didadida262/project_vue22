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
    content="铅笔"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'pencil' }, 'icon', icon]"
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
  name: "pencil",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  mixins: [tool],
  data() {
    return {
      icon: "el-icon-edit",
      path: null
    };
  },
  computed: {},
  watch: {
    // selected() {
    //   if (this.activated) {
    //     this.$message({
    //       message: `切换画笔至${e.target.id}`,
    //       type: "success",
    //     });
    //   }
    // },
  },
  mounted() {},
  methods: {
    changeBrush() {
      this.$emit('changeBrush', 'pencil')
    },
    onKeyDown(e) {
    },
    onMouseDown(e) {
      console.log('铅笔down')
      this.path = new paper.Path({
        strokeColor:  'black'
      })
      this.path.add(e.point)
    },
    onMouseDrag(e) {
      this.path.add(e.point)
    },
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
