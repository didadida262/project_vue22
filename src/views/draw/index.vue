<template>
  <div class="draw-container flex-cb">
    <!-- 所有笔刷 -->
    <!-- <el-button
      style="width: 80px;height: 100%;"
      type="primary"
      @click="handleSwitch">Switch</el-button> -->
    <div class="draw-container-tool">
        <SelectTool
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
          @unitePath="unitePath"
        />
        <fat-pencil
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

    </div>
    <!-- :class="[{'cursorpointerNone-st': activatedBrush !== 'pencil' && activatedBrush !== 'line' && activatedBrush !== 'rect_brush'}]" -->
    <div class="draw-container-annotate flex-ca">
      <div class="paperView-item"
      :class="[activateScope === index? 'activateScope-st': '']"
       v-for="(item, index) in picList"
       :key="index">
        <PaperMark
          :picInfo="item"
          ref="PaperView"
          @handleChangePaperScope="handleChangePaperScope"
        />
      </div>
    </div>
    <div class="draw-container-category">
      category
    </div>

  </div>
</template>

<script>
import paper from 'paper'
import Pencil from './brushes/Pencil.vue'
import FatPencil from './brushes/FatPencil.vue'
import RectBrush from './brushes/RectBrush.vue'
import SelectTool from './brushes/SelectTool.vue'
import PaperMark from '@/components/PicMark.vue'
// import oldBrush from './brushes/oldBrush.vue'
// import killBrush from './brushes/kill_brush.vue'
// import killBrushNew from './brushes/kill_brush2.vue'
// import broomBrush from './brushes/broomBrush.vue'
// import LineBrush from './brushes/Line.vue'

export default {
  name: 'Dashboard',
  components: {
    Pencil,
    RectBrush,
    PaperMark,
    FatPencil,
    SelectTool
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
          title: '1',
          // src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
          src: require('@/assets/Sam.webp'),
          key: 0
        },
        // {
        //   title: '2',
        //   src: require('@/assets/Sam.webp'),
        //   key: 1

        // },
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
    }
  },

  mounted() {
    this.initDefaultScope()
  },
  created() {
  },
  beforeDestroy() {
  },
  methods: {
    unitePath(path) {
      if (!this.CompoundPath) {
        this.CompoundPath = new paper.CompoundPath
      }
      console.log('接收到path',path)
      // this.CompoundPath.unite(path.clone())
      // console.log('>>>this.CompoundPath',this.CompoundPath)

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
