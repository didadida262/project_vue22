<template>
  <div class="draw-container flex-cb">
    <!-- 所有笔刷 -->
<<<<<<< HEAD
    <div class="draw-container-tool">
      <el-button @click="handleSwitch">switch</el-button>
        <RectBrush
          class="cursor-pointer"
          :selected="activatedBrush"
          @changeBrush="changeBrush"
        />
        <Pencil
          class="cursor-pointer"
          :selected="activatedBrush"
          @changeBrush="changeBrush"
        />
=======
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
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
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
<<<<<<< HEAD

    </div>
    <!-- :class="[{'cursorpointerNone-st': activatedBrush !== 'pencil' && activatedBrush !== 'line' && activatedBrush !== 'rect_brush'}]" -->
    <div class="draw-container-annotate flex-cb">
      <div class="paperView-item"
      :class="[activateScope === index? 'activateScope-st': '']"
       v-for="(item, index) in picList"
       :key="index">
        <PaperView
          :picInfo="item"
          ref="PaperView"
        />
      </div>
    </div>
    <div class="draw-container-catefory">
      category
    </div>

=======
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
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
  </div>
</template>

<script>
<<<<<<< HEAD
=======
import PicMark from '@/components/PicMark.vue'

import { mapGetters } from 'vuex'
import Content from './Content'
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
import paper from 'paper'
import Pencil from './brushes/Pencil.vue'
import RectBrush from './brushes/RectBrush.vue'
import PaperView from '@/components/PaperView.vue'
// import oldBrush from './brushes/oldBrush.vue'
// import killBrush from './brushes/kill_brush.vue'
// import killBrushNew from './brushes/kill_brush2.vue'
// import broomBrush from './brushes/broomBrush.vue'
// import LineBrush from './brushes/Line.vue'

export default {
  name: 'Dashboard',
  components: {
<<<<<<< HEAD
=======
    PicMark,
    Content,
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
    Pencil,
    RectBrush,
    PaperView
    // oldBrush,
    // killBrush,
    // broomBrush,
    // LineBrush,
    // killBrushNew
  },
  data() {
    return {
<<<<<<< HEAD
      picList: [
      {
          title: 'Surface',
          src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
        },
        {
          title: 'PL',
          src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
        }
      ],
      activateScope: 0,
=======
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
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab

      url: '@/assets/rick.jpg',
      activatedBrush: '',
      image: {
        // url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
      }
    }
  },
  computed: {
<<<<<<< HEAD

    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === 'Draw')[0]
    }
  },

  mounted() {
    this.initDefaultScope()
=======
  },

  mounted() {
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
<<<<<<< HEAD
    initDefaultScope() {
      this.activePaperScope = this.$refs['PaperView'][0].paper
      this.activePaperScope.projects[0].activate()
=======
    changePaperScope() {
      this.currentActivePaperProject = this.currentActivePaperProject === 'PL' ? 'Surface' : 'PL'
      this.$message.info(`切换至${this.currentActivePaperProject}视图`)
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
    },
    handleSwitch() {
      this.activateScope = this.activateScope === 1? 0: 1
      this.activePaperScope.projects[this.activateScope].activate()
      
    },

    changeBrush(brush) {
      this.activatedBrush = brush
      this.$message.success(`切换至${brush}`)
<<<<<<< HEAD
    },

=======
    }
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/draw/index.scss'
</style>
