<template>
  <div class="tool">
    <div class="el-icon-brush icon"
      :class="{'is-active':isActive === 'brush'}"
      @click="brush"/>
    <el-divider />
    <div
     class="el-icon-edit icon"
     :class="{'is-active':isActive === 'brush_small'}"
     @click="brush_small"/>
    <el-divider />
  </div>
</template>

<script>

export default {
  name: 'Tool',
  data() {
    return {
      isActive: 'brush_small'
    }
  },
  methods: {
    brush() {
      this.isActive = 'brush'
      this.$emit('changeRa', 20)
    },
    brush_small() {
      this.isActive = 'brush_small'
      this.$emit('changeRa', 5)
    }
  }
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
