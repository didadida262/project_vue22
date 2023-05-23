<template>
  <div class="draw-container flex-cb">
    <!-- 所有笔刷 -->
    <!-- <el-button
      style="width: 80px;height: 100%;"
      type="primary"
      @click="handleSwitch">Switch</el-button> -->
    <div class="draw-container-tool">
      <!-- <el-button>矩形框</el-button>
      <el-button>线段</el-button> -->
      <PicSelf
          class="cursor-pointer"
          :selected="activatedBrush"
          @changeBrush="changeBrush"
        />
      <RectBrush
          class="cursor-pointer"
          :selected="activatedBrush"
          @changeBrush="changeBrush"
        />
      <Pencil
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
        @submitPath="submitPath"
      />
      <LineBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />

        <!-- <SelectTool
          class="cursor-pointer"
          :selected="activatedBrush"
          @changeBrush="changeBrush"
        />

        <fat-pencil
          class="cursor-pointer"
          :selected="activatedBrush"
          @changeBrush="changeBrush"
        /> -->
      <!-- <oldBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <broomBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <killBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <killBrushNew
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      /> -->

    </div>
    <!-- :class="[{'cursorpointerNone-st': activatedBrush !== 'pencil' && activatedBrush !== 'line' && activatedBrush !== 'rect_brush'}]" -->
    <div class="draw-container-annotate flex-ca">
      <div class="paperView-item"
      :class="[activateScope === index? 'activateScope-st': '']"
       v-for="(item, index) in picList"
       :key="index">
        <PicNew
          :picInfo="item"
          ref="PaperView"
          @handleChangePaperScope="handleChangePaperScope"
        />
      </div>
    </div>
    <div class="draw-container-category">
      <Category
        v-if="currentScopeCategory"
        :categoryData="currentScopeCategory"
      />
      <!-- <a href="https://vdn6.vzuu.com/HD/5c401ac8-eef2-11ed-8a0c-16580e9236a2-v8_f1_t1_XQevL8y2.mp4?pkey=AAVewuo_5iVSIjJyz9_JcCjrXMHOrQMQErz6GUErQtaxDqQ9xeQ2ITYmytQ0XJbMnTXh8ci4_cdmonGXZ_Ec5vJ_&c=avc.8.0&f=mp4&pu=4e83193b&bu=http-4e83193b&expiration=1684814561&v=ks6&pf=Web&pt=ks" download="https://vdn6.vzuu.com/HD/5c401ac8-eef2-11ed-8a0c-16580e9236a2-v8_f1_t1_XQevL8y2.mp4?pkey=AAVewuo_5iVSIjJyz9_JcCjrXMHOrQMQErz6GUErQtaxDqQ9xeQ2ITYmytQ0XJbMnTXh8ci4_cdmonGXZ_Ec5vJ_&c=avc.8.0&f=mp4&pu=4e83193b&bu=http-4e83193b&expiration=1684814561&v=ks6&pf=Web&pt=ks">文件下载</a> -->
    </div>

  </div>
</template>

<script>
import paper from 'paper'
import Pencil from './brushes/Pencil.vue'
import FatPencil from './brushes/FatPencil.vue'
import RectBrush from './brushes/RectBrush.vue'
import SelectTool from './brushes/SelectTool.vue'
import PicNew from '@/components/PicNew.vue'
import Category from './Category.vue'
import PicSelf from './brushes/PicSelf.vue'
import LineBrush from './brushes/Line.vue'
import { autoDownURL } from '@/utils'
// import oldBrush from './brushes/oldBrush.vue'
// import killBrush from './brushes/kill_brush.vue'
// import killBrushNew from './brushes/kill_brush2.vue'
// import broomBrush from './brushes/broomBrush.vue'

export default {
  name: 'Dashboard',
  components: {
    PicSelf,
    Pencil,
    RectBrush,
    PicNew,
    Category,
    LineBrush

    // PaperNew,
    // FatPencil,
    // SelectTool,
    // oldBrush,
    // killBrush,
    // broomBrush,
    // LineBrush,
    // killBrushNew
  },
  data() {
    return {
      picList: [
        {
          title: 'Surface',
          // src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
          src: require('@/assets/bigPic.png'),
          key: 0
        },
        {
          title: 'PL',
          src: require('@/assets/bigPic2.png'),
          key: 1
        }

        // {
        //   title: '3',
        //   src: require('@/assets/Sam.webp'),
        //   key: 2
        // },
        // {
        //   title: '4',
        //   src: require('@/assets/Sam.webp'),
        //   key: 3
        // }
      ],
      paperScopePathData: [],
      activateScope: 0,
      url: '@/assets/rick.jpg',
      activatedBrush: 'select_tool',
      image: {
        // url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
      }
    }
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === 'Draw')[0]
    },
    currentScopeCategory() {
      if (this.paperScopePathData[this.activateScope]) {
        return this.paperScopePathData[this.activateScope]
      }
      return []
    }
  },

  mounted() {
    this.initDefaultScope()
    this.initPaperScopePathData()
    this.testUrl()
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
    testUrl() {
      const url = 'https://vdn6.vzuu.com/HD/5c401ac8-eef2-11ed-8a0c-16580e9236a2-v8_f1_t1_XQevL8y2.mp4?pkey=AAVewuo_5iVSIjJyz9_JcCjrXMHOrQMQErz6GUErQtaxDqQ9xeQ2ITYmytQ0XJbMnTXh8ci4_cdmonGXZ_Ec5vJ_&c=avc.8.0&f=mp4&pu=4e83193b&bu=http-4e83193b&expiration=1684814561&v=ks6&pf=Web&pt=ks'
      autoDownURL(url)
    },
    initPaperScopePathData() {
      this.picList.forEach((pic, index) => {
        this.paperScopePathData[index] = []
      })
    },
    submitPath(path) {
      // const currentScopeCompoundPath = this.CompoundPathArray[this.activateScope]
      this.paperScopePathData[this.activateScope].push(path)
      console.log('接收到path', path)
      console.log(this.paperScopePathData)
    },
    initDefaultScope() {
      this.activePaperScope = this.$refs['PaperView'][0].paper
      this.activePaperScope.projects[0].activate()
    },
    // handleSwitch() {
    //   if (this.activateScope + 1 >= this.picList.length) {
    //     this.activateScope = 0
    //   } else {
    //     this.activateScope++
    //   }
    //   this.activePaperScope.projects[this.activateScope].activate()
    // },
    // 变更激活scope
    handleChangePaperScope(item) {
      this.activateScope = item.key
    },

    changeBrush(brush) {
      console.log('brush>>>', brush)
      this.activatedBrush = brush
      console.log('activatedBrush>>>', this.activatedBrush)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/draw/index.scss'
</style>
