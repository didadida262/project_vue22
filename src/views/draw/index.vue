<template>
  <div class="draw-container flex-cb">
    <!-- 所有笔刷 -->
    <div class="draw-container-tool">
      <el-button
        type="primary"
        @click="handleSwitch">switch</el-button>
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
        <PaperView
          :picInfo="item"
          ref="PaperView"
        />
      </div>
    </div>
    <div class="draw-container-catefory">
      category
    </div>

  </div>
</template>

<script>
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
      picList: [
        {
          title: 'Surface',
          // src: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg'
          src: require('@/assets/Sam.webp')
        },
        {
          title: 'PL',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '3',
          src: require('@/assets/Sam.webp')
        },
        {
          title: '4',
          src: require('@/assets/Sam.webp')
        }
      ],
      activateScope: 0,

      url: '@/assets/rick.jpg',
      activatedBrush: '',
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
    initDefaultScope() {
      this.activePaperScope = this.$refs['PaperView'][0].paper
      this.activePaperScope.projects[0].activate()
    },
    handleSwitch() {
      this.activateScope = this.activateScope === 1 ? 0 : 1
      this.activePaperScope.projects[this.activateScope].activate()
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
