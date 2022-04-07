<template>
  <div class="tool">
    <el-tooltip class="item" effect="dark" content="brush" placement="right">
      <div
        class="el-icon-brush icon"
        :class="{'is-active':isActive === 'brush'}"
        @click="changeBrush('brush')"
      />
    </el-tooltip>
    <el-divider />
    <el-tooltip class="item" effect="dark" content="pencil" placement="right">
      <div
        class="el-icon-edit icon"
        :class="{'is-active':isActive === 'pencil'}"
        @click="changeBrush('pencil')"
      />
    </el-tooltip>
    <el-divider />
    <el-tooltip class="item" effect="dark" content="fat_brush" placement="right">
      <div
        class="el-icon-full-screen icon"
        :class="{'is-active':isActive === 'fat_brush'}"
        @click="changeBrush('fat_brush')"
      />
    </el-tooltip>
    <el-divider />
    <el-tooltip class="item" effect="dark" content="broom_brush" placement="right">
      <div
        class="el-icon-ice-cream-round icon"
        :class="{'is-active':isActive === 'broom_brush'}"
        @click="changeBrush('broom_brush')"
      />       
    </el-tooltip>
  </div>
</template>

<script>

export default {
  name: 'Tool',
  data() {
    return {
      isActive: ''
    }
  },
  methods: {
    changeBrush(brush) {
      this.isActive = brush
      this.$emit('handleChange', brush)
    },
  },
  created() {
    console.log('this.info--->', this.info)
  },
}
</script>

<style lang="scss" scoped>
.tool {
  padding: 10px;
  padding-top: 20px;
  border: 1px solid gainsboro;
  width: 40px;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  .is-active {
    color: red;
  }
  .icon {
    margin-bottom: 10px;
  }
  .icon:hover {
    cursor: pointer;
  }
}
</style>
