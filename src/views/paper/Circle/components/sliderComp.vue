<!--
 * @Author: Hhvcg
 * @Date: 2022-09-07 15:04:24
 * @LastEditors: -_-
 * @Description: 针对largeview页面所需特制组件，包含checkbox、title及slider;handleSliderCompOperatiopn为出口

-->

<template>
  <div class="slidercomp-st">
    <div class="slidercomp-st-top">
        <el-checkbox v-model="info.checkBoxData" :disabled="info.loading" @change="checkBoxDataChange"/>
        <el-button type="text" :loading="info.loading">{{ info.title }}</el-button>
    </div>
    <div class="slidercomp-st-bot">
      <el-slider v-model="info.sliderData" @change="sliderDataChange" size="mini" :step="0.1" :min="0" :max="1"/>
    </div>
  </div>
</template>
<script>
export default {
  name: 'slidercomp',
  props: {
    info: {
      type: Object,
      required: true
    }

  },
  methods: {
    unifyExit(info) {
      this.$emit('handleSliderCompOperatiopn', info)
    },
    checkBoxDataChange(data) {
      this.unifyExit({
        layer: this.info.layer,
        data: this.info.checkBoxData ? this.info.sliderData : 0
      })
    },
    sliderDataChange(data) {
      this.unifyExit({
        layer: this.info.layer,
        data: this.info.checkBoxData ? data : 0
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.slidercomp-st {
  width: 100%;
  height: 50px;
  &-top {
    width: 100%;
    height: 50%;
  }
  &-bot {
    width: 100%;
    height: 50%;
  }
}
</style>
