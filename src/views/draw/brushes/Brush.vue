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
    };
  },
  computed: {},
  watch: {
  },
  mounted() {},
  methods: {
    changeBrush() {
      this.$emit('changeBrush', 'old_brush')
    },
    onKeyDown(e) {
    },
    onMouseDown() {
      console.log('老毕刷down')
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
