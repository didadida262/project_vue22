<template>
  <div class="draw-container flex-cb">
    <!-- 所有笔刷 -->
    <div class="draw-container-tool">
      <SelectTool
        ref="select_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <RectBrush
        ref="rect_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
        />
      <Pencil
        ref="pencil_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
        @submitPath="submitPath"
      />
      <!-- <LineBrush
        ref="line_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      /> -->
      <MeasureTool
        ref="measure_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
      <LinePoly
        ref="linepoly_tool"
        class="cursor-pointer"
        :selected="activatedBrush"
        @changeBrush="changeBrush"
      />
    </div>
    <!-- :class="[{'cursorpointerNone-st': activatedBrush !== 'pencil' && activatedBrush !== 'line' && activatedBrush !== 'rect_brush'}]" -->
    <div class="draw-container-annotate flex-ca">
      <div class="paperView-item"
      :style="{ cursor: cursorPointor }"
      :class="[activateScope === index? 'activateScope-st': '']"
       v-for="(item, index) in picList"
       :key="index">
        <PicMark
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
import Pencil from './brushes/Pencil.vue'
// import FatPencil from './brushes/FatPencil.vue'
import RectBrush from './brushes/RectBrush.vue'
import SelectTool from './brushes/SelectTool.vue'
// import PicNew from '@/components/PicNew.vue'
import Category from './Category.vue'
import LineBrush from './brushes/Line.vue'
import PicMark from '@/components/PicMark.vue'
import MeasureTool from './brushes/MeasureTool.vue'
import LinePoly from './brushes/LinePoly.vue'
// import { autoDownURL } from '@/utils'
// import oldBrush from './brushes/oldBrush.vue'
// import killBrush from './brushes/kill_brush.vue'
// import killBrushNew from './brushes/kill_brush2.vue'
// import broomBrush from './brushes/broomBrush.vue'

export default {
  name: 'Dashboard',
  components: {
    PicMark,
    MeasureTool,
    Pencil,
    RectBrush,
    Category,
    LineBrush,
    SelectTool, // PaperNew,
    LinePoly

  },
  data() {
    return {
      model: 'watch',
      cursorPointor: 'default',
      picList: [
        {
          title: 'Surface',
          src: require('@/assets/bigPic.png'),
          key: 0
        },
        {
          title: 'PL',
          src: require('@/assets/bigPic2.png'),
          key: 1
        }
      ],
      paperScopePathData: [],
      activateScope: 0,
      url: '@/assets/rick.jpg',
      activatedBrush: 'select_tool'
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
    this.setKeyDownListener()
  },

  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyDown)
  },
  methods: {
    handleToolClick(brush) {

    },
    handleKeyDown(e) {
      console.log('外部事件捕获>>>')
      switch (e.key) {
        case 's':
          this.$refs['select_tool'].handleClickTool()
          break
        case 'r':
          this.$refs['rect_tool'].handleClickTool()
          break
        // case 'l':
        //   this.$refs['rect_tool'].handleClickTool()
        //   break
        case 'p':
          this.$refs['linepoly_tool'].handleClickTool()
          break
        case 'm':
          this.$refs['measure_tool'].handleClickTool()
          break
        default:
          break
      }
    },
    setKeyDownListener() {
      console.log('setKeyDownListener>>')
      window.addEventListener(
        'keydown',
        this.handleKeyDown,
        {
          capture: false
        }
      )
    },
    testUrl() {
      // const url = 'https://vdn6.vzuu.com/HD/5c401ac8-eef2-11ed-8a0c-16580e9236a2-v8_f1_t1_XQevL8y2.mp4?pkey=AAVewuo_5iVSIjJyz9_JcCjrXMHOrQMQErz6GUErQtaxDqQ9xeQ2ITYmytQ0XJbMnTXh8ci4_cdmonGXZ_Ec5vJ_&c=avc.8.0&f=mp4&pu=4e83193b&bu=http-4e83193b&expiration=1684814561&v=ks6&pf=Web&pt=ks'
      // autoDownURL(url)
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
      this.$refs['PaperView'][0].project.activate()
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

    changeBrush(brushInfo) {
      this.activatedBrush = brushInfo.key
      this.cursorPointor = brushInfo.cursor
    }
  }

}
</script>

<style lang="scss" scoped>
@import '@/styles/draw/index.scss'
</style>
