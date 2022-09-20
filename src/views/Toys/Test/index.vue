<!--
 * @Author: Hhvcg
 * @Date: 2022-09-20 09:54:00
 * @LastEditors: -_-
 * @Description: 
-->
<template>
  <div class='test-st pd10'>
    <commonTemplate title='Test' />
    <el-button @click="change">change</el-button>
        <div class='content'>
          <div
            style="width: 400px;height:400px"
            v-for="(pic, index) in picList"
            :key="index">
                <paper-pic
                  :title="pic.title"
                  :url="pic.url"
                />
          </div>
        </div>
  </div>
</template>
<script>
import CommonTemplate from '@/components/titleTemplate.vue'
import PaperPic from '@/components/PaperPic.vue'
import { textHeights } from 'ol/render/canvas'
export default {
  name: 'Test',
  components: {
    CommonTemplate,
    PaperPic
  },
  data() {
    return {
      url: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      picList: [
      {
          title: 'A',
          url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        },
        {
          title: 'B',
          url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        },
        {
          title: 'C',
          url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        },
        {
          title: 'D',
          url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        },                
      ]

    }
  },
  created() {
    this.getData()
  },
  methods: {
    change() {
      this.picList[1].url = this.url
    },
    async getData() {
    }
  },
  mounted() {
  },
  beforeDestroy() {
  }
}
</script>
<style scoped lang='scss'>
.test-st {
  width: 100%;
  height: 100%;
  .content {
    width: 100%;
    height: calc(100% - 90px);
    display: flex;
    flex-wrap: wrap;
  }
}
</style>