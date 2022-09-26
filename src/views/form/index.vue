<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <div class="page-container">
    <div class="header flex-cb pd10 mgb10">
      <h1>Article List</h1>
      <el-button type="primary" @click="addArticle">Write</el-button>
    </div>
    <diary-card v-for="(item, index) in articleList" :key="index" :info="item"/>
  </div>
</template>

<script>
import diaryCard from './components/diaryCard.vue'
export default {
  name: 'Form',
  components: {
    diaryCard
  },
  data() {
    return {
      timer: null,
      articleList: [],
      // info: {
      //   title: '测试',
      //   image: '',
      //   content: '',
      //   create_date: '2022.10'
      // }
    }
  },
  created() {
    this.getData()
    // console.log('form....')
    // this.timer = setInterval(() => {
    //   console.log('来自轮询的伺候....')
    // }, 1000)
  },
  beforeDestroy() {
    // clearInterval(this.timer)
  },
  methods: {
    async getData() {
      const res = await this.$axios.getArticleList()
      console.log('文章数据--->', res)
      this.articleList = [
        ...res.data
      ]
    },
    addArticle () {
      console.log('新增文章')
      this.$router.push({name: 'createArticle'})
    }
  }
}
</script>

<style scoped lang="scss">
.page-container {
  .header {
    height: 50px;
  }
}
</style>

