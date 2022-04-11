<template>
  <div class="dashboard">
    <div class="dashboard-container">
      <el-button @click="test">测试内存</el-button>      
      <div style="border:1px solid red;width:800px;height:300px">
        <div class="inner">
          
        </div>
      </div>
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
      data: [],
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
    console.log('组件created')
    console.log('挂载监听')
    window.addEventListener("keydown", this.handleKey)
  },
  // beforeDestroy() {
  destroyed() {
    console.log('组件销毁')
	  window.removeEventListener("keydown", this.handleKey);
  },
    // window.addEventListener("keydown",(this.handleKeyDown = this.handleKeyDown.bind(this)))

  methods: {
    handleKey(e) {
      console.log('触发监听')
      console.log('e.keyCode', e.keyCode)
    },
    test() {
      this.data.push(new Array(1000_0000))
      console.log('this.data:', this.data[0])
    },
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
  border: 1px solid red;
  width: 100%;
  margin-bottom: 50px;
  height: 90vh;
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
    .inner {
      width:100px;
      background-color: red;
      height:100px;
      transform: scale(1,1)
    }
  }
}
</style>
