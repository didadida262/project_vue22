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
        <el-input v-model="articleForm.title"></el-input>
      </el-form-item>
      <el-form-item label="内容">
        <el-input v-model="articleForm.content"
          type="textarea"
          :rows="15"
        ></el-input>
      </el-form-item>      
      <el-form-item label="创建时间">
        <el-date-picker
          v-model="articleForm.create_date"
          type="datetime"
          format="yyyy-MM-dd"
          placeholder="选择日期时间">
        </el-date-picker>
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
      articleForm: {
        title: null,
        content: null,
        create_date: null,
        iamge: '',
      }
    }
  },
  created() {

  },
  mounted() {
    console.log('mounted')
  },
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  beforeDestroy() {
  },
  methods: {
    onSubmit() {
      console.log('this.articleForm.create_date--->', this.articleForm.create_date)
      this.articleForm.create_date = this.$dayjs(this.articleForm.create_date).format('YYYY-MM-DD')
      console.log('提交表单--->', this.articleForm)
    }
  }
}
</script>

<style scoped lang="scss">
.articleForm-container {
}
</style>

