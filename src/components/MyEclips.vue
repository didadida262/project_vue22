
<template>
  <el-tooltip style="width:100%" :content="text" placement="bottom-start" :disabled="!tooltip">
      <p :style="style" class="my-ellipsis">{{ text }}</p>
  </el-tooltip>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      type: String,
      default: ''
    },
    tooltip: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: String,
      default: '14px'
    },
    fontWeight: {
      type: String
    }
  },
  computed: {
    style() {
      const style = {}
      if (this.fontSize) {
        style['font-size'] = this.fontSize
      }
      if (this.fontWeight) {
        style['font-weight'] = this.fontWeight
      }
      return style
    }
  }
})
</script>

<style lang="scss" scoped>
.my-ellipsis {
  text-overflow: ellipsis;
  display: block;
  width: 100%;
  overflow: hidden;
  white-space: nowrap;
}
</style>
