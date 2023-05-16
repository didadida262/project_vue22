<!--
 * @Author: Hhvcg
 * @Date: 2023-04-13 14:20:31
 * @LastEditors: Hhvcg
-->
<!-- blog-main -->
<template>
  <div class="blogMain-container pd10">
    <commonTemplate title="blogMain" />
    <div class="blogMain-container-content flex-cb">
      <div class="blogMain-container-content-cate">
        <div
         v-for="(item, index) in articleCateList"
         :key="index"
         >
          <Article-Item
            :info="item"
          />
        </div>

      </div>
      <div class="blogMain-container-content-articleContent"></div>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import ArticleItem from './components/ArticleItem/index.vue'

export default {
  name: 'blogMain',
  components: {
    commonTemplate,
    ArticleItem
  },
  data() {
    return {
      title: 'blogMain',
      articleCateList: [
        {
          name: 'Vue',
          key: 'vue'
        },
        {
          name: '性能优化',
          key: 'eff'
        },
        {
          name: 'Canvas',
          key: 'canvas'
        }
      ]
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

  }
}
</script>
<style scoped lang="scss">
.blogMain-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    &-cate {
      width: 200px;
      height: 100%;
    }
    &-articleContent {
      width: calc(100% - 210px);
      border: 1px solid rgba(118, 118, 122, 0.5);
      height: 100%;
    }
  }
}
</style>
