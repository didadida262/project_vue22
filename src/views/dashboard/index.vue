<template>
  <div class="dashboard">
    <div class="dashboard-text">
      <span>测试滚动组件</span>
    </div>
    <div class="dashboard-container">
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
      imageList: []
    }
  },
  methods: {
    handleClickPic() {
      console.log('click')
    },
    loadNextPage() {
      console.log('下一页')
    },
    loadPrevPage() {
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
  height: calc(100vh - 150px);
  padding: 10px;
  &-text {
    font-size: 30px;
    line-height: 46px;
    font-weight: bold;
    width: 100%;
    height: 45px;
    border: 1px solid gray;
    margin-bottom: 10px;
  }
  &-container {
    width: 100%;
    height: calc(100% - 45px);
    border: 1px solid green;
    
  }
}
</style>
