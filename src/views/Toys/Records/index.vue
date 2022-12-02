<!--
 * @Author: Hhvcg
 * @Date: 2022-11-30 16:42:33
 * @LastEditors: -_-
 * @Description: records记录，存储后端json
-->

<template>
  <div class="Records-container pd10">
    <commonTemplate title="Records" />
    <div class="Records-container-content pd10">
      <el-input
       type="area"
       class="Records-container-content-input mgb10"
       v-model="content"></el-input>
      <el-button
       class="Records-container-content-btn"
       type="primary"
       @click="handleSubmit">Submit</el-button>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'

export default {
  name: 'Records',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'Records',
      content: ''
    }
  },
  computed: {
  },
  watch: {},
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    async handleSubmit() {
      const params = {
        content: this.content
      }
      console.log('提交数据>>', params)
      await this.$axios.subMitRecords(params).catch((err) => {
        this.$message.error(err)
      })
      this.$message.success('success！！！')
    }
  }
}
</script>
<style scoped lang="scss">
.Records-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    &-input {
      width: 100%;
    }
    &-btn {
      width: 100%;
    }
  }
}
</style>
