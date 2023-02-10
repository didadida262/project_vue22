<!--
 * @Author: Hhvcg
 * @Date: 2023-02-10 14:52:27
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="draw-container">
    asdasd
    <div class="draw-container-header">
      顶部
    </div>
    <div class="draw-container-annotate">
      <annotate />
    </div>
  </div>
</template>

<script>
import annotate from './annotate.vue'
export default {
  name: 'Dashboard',
  components: {
    annotate
  },
  data() {
    return {
      picList: [
        {
          title: 'Surface',
          // src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
          // src: '@/assets/rick.jpg'
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'PL',
          src: require('@/assets/Sam.webp')
          // src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
          // src: '@/assets/rick.jpg'
        }

      ]

    }
  },
  computed: {
  },

  mounted() {
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
.draw-container {
  width: 100%;
  height: 100%;
  border: 1px solid red;
  &-header{
    width: 100%;
    height: 150px;
    border: 1px solid blue;
  }
  &-annotate {
    width: 100%;
    height: calc(100vh - 200px);
  }
}
</style>
