<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <div class="articleForm-container">
    <el-form ref="articleForm" :model="articleForm" label-width="80px">
      <el-form-item label="文章标题">
        <el-input v-model="articleForm.name"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'createArticle',

  data() {
    return {
      articleForm: {}
    }
  },
  created() {

  },
  beforeDestroy() {
  },
  methods: {
    onSubmit() {
      console.log('提交表单--->', this.articleForm)
    }
  }
}
</script>

<style scoped lang="scss">
.articleForm-container {
}
</style>

