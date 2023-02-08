<template>
  <div class="draw-container">
    <!-- 所有笔刷 -->
    <el-button
      @click="changePaperScope"
    >
    切换scope
    </el-button>
    <div class="tool">
      <!-- <el-button
       type="primary"
       size="mini"
       @click="handleExport"
       >Export</el-button> -->
      <Pencil
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
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
      />
      <LineBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      /> -->
      <RectBrush
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
    </div>
    <!-- :class="[{'cursorpointerNone-st': activatedBrush !== 'pencil' && activatedBrush !== 'line' && activatedBrush !== 'rect_brush'}]" -->
    <div class="content flex-ca">
      <pic-mark
        class="contentItem-st"
        :class="[{'activeContentItem-st':currentActivePaperProject === item.title}]"
        v-for="(item, index) in picList"
        :key="index"
        :picInfo="item"
        :activatedBrush="activatedBrush"
        :activeScope="currentActivePaperProject"
       />
    </div>
  </div>
</template>

<script>
import PicMark from '@/components/PicMark.vue'

import { mapGetters } from 'vuex'
import Content from './Content'
import paper from 'paper'
import Pencil from './brushes/Pencil.vue'
import oldBrush from './brushes/oldBrush.vue'
import killBrush from './brushes/kill_brush.vue'
import killBrushNew from './brushes/kill_brush2.vue'
import broomBrush from './brushes/broomBrush.vue'
import LineBrush from './brushes/Line.vue'
import RectBrush from './brushes/RectBrush.vue'

export default {
  name: 'Dashboard',
  components: {
    PicMark,
    Content,
    Pencil,
    oldBrush,
    killBrush,
    broomBrush,
    LineBrush,
    RectBrush,
    killBrushNew
  },
  data() {
    return {
      currentActivePaperProject: 'Surface',
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

      ],

      url: '@/assets/rick.jpg',
      activatedBrush: '',
      image: {
        // url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
      }
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
    changePaperScope() {
      this.currentActivePaperProject = this.currentActivePaperProject === 'PL' ? 'Surface' : 'PL'
      this.$message.info(`切换至${this.currentActivePaperProject}视图`)
    },
    changeBrush(brush) {
      this.activatedBrush = brush
      this.$message.success(`切换至${brush}`)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/draw/index.scss'
</style>
