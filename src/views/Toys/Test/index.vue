<template>
  <div class='test-st pd10'>
    <commonTemplate title='Test' />
        <div class='content'>
          <div
            class="flex-cc"
            style="width: 200px;height:200px"
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
export default {
  name: 'Test',
  components: {
    CommonTemplate,
    PaperPic
  },
  data() {
    return {
      picList: [
      {
          title: 'BF',
          url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        },
        {
          title: 'PL',
          url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        },
      ]

    }
  },
  created() {
    this.getData()
  },
  methods: {
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
  }
}
</style>