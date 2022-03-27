<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <image-slider
        :imageList="imageList"
        @onClickItem="handleClickPic"
        @onEnd="loadNextPage"
        @onStart="loadPrevPage"
      />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import imageSlider from './components/ImageSliderVersionT.vue'

export default {
  name: 'Dashboard',
  components: {
    imageSlider
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      imageList: [
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 1
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 2
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 3
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 4
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 5
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 6
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 7
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 8
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 9
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 10
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 11
        },
        {
          img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
          img_id: 12
        }
      ]
    }
  },
  created() {
  },
  methods: {
    handleClickPic() {
      console.log('click')
    },
    loadNextPage() {
      const add = {
        img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        img_id: 100
      }
      this.imageList.push(add)

      console.log('下一页')
    },
    loadPrevPage() {
      const add = {
        img_thumbnail_url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
        img_id: 0
      }
      this.imageList.unshift(add)
      console.log('上一页')
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  border: 1px solid ghostwhite;
  width: 100%;
  margin-bottom: 50px;
  height: 100vh;
  padding: 10px;
  overflow: scroll;
  &-text {
    display: flex;
    justify-content: center;
    font-weight: bold;
    width: 100%;
    height: 45px;
    border: 1px solid gray;
    margin-bottom: 10px;
    position: sticky;
    top: 0;
  }
  &-container {
    width: 100%;
    height: 150px;
  }
}
</style>
