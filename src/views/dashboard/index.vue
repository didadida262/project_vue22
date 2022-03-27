<template>
  <div class="dashboard">
    <div class="dashboard-text">
      组件区域
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
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/1,0145310ca7d13a?rend=1647325062941",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_0/2,01453380f50a14?rend=1647325062942",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/3,014535e3412f69?rend=1647325062942",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/3,014537254ab29c?rend=1647325062942",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/4,01453fa76e8d6a?rend=1647325062945",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/4,014541d86bb873?rend=1647325062946",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/4,0145438c8e7e0b?rend=1647325062946",
          img_id: 1
        },
        {
          img_thumbnail_url: "http://lic.gmface.tech:10444/file_1/4,0145454962dff2?rend=1647325062947",
          img_id: 1
        },                                             
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
      const add = this.imageList.slice(0, 3)
      this.imageList.push(...add)
      console.log('下一页')
    },
    loadPrevPage() {
      const add = this.imageList.slice(0, 3)
      this.imageList.push(...add)      
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
  }
}
</style>
