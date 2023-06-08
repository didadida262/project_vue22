<!--
 * @Author: Hhvcg
 * @Date: 2023-02-06 19:08:24
 * @LastEditors: Hhvcg
 * @Description:
-->
<template>
  <div style="display: block; height: inherit;">
    <div class="tool-conf-bar" @mousemove="(e) => e.stopPropagation()">
      <!--      当前画笔的设置选项(根据每个画笔自动展示当前配置)-->
      <div v-show="mode == 'segment'" class="flex-cc">
        <div class="sidebar-title">{{ activeTool }}</div>
        <Divider type="vertical"/>
        <div class="tool-section">
          <div v-if="$refs.bbox != null">
            <BBoxPanel :bbox="$refs.bbox" />
          </div>
          <div v-if="$refs.polygon != null">
            <PolygonPanel :polygon="$refs.polygon" />
          </div>

          <div v-if="$refs.select != null">
            <SelectPanel :select="$refs.select" />
          </div>

          <div v-if="$refs.magicwand != null">
            <MagicWandPanel :magicwand="$refs.magicwand" />
          </div>

          <div v-if="$refs.brush != null">
            <BrushPanel :brush="$refs.brush" />
          </div>

          <div v-if="$refs.eraser != null">
            <EraserPanel :eraser="$refs.eraser" />
          </div>

          <div v-if="$refs.line != null">
            <LinePanel :line="$refs.line" />
          </div>
        </div>
      </div>
    </div>
<!--    左侧工具条区域-->
    <aside
      v-if="reloadTools"
      v-show="panels.show.left" class="left-panel">
      <div v-show="mode == 'segment'">
        <hr />

<!--        拖动组件(小手)-->
      <SelectTool
          v-model="activeTool"
          :scale="image.scale"
          @setcursor="setCursor"
          ref="select"
      />
      <hr />
<!--画框组件-->
      <BBoxTool
         :activePaperScope="activePaperScope"
          v-model="activeTool"
          :scale="image.scale"
          @setcursor="setCursor"
          ref="bbox"
      />
<!--画线工具-->
      <LineTool
          v-model="activeTool"
          :scale="image.scale"
          @setcursor="setCursor"
          ref="line"
      ></LineTool>
<!--多边形组件-->
        <!-- <PolygonTool
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="polygon"
        /> -->
<!--魔法工具-->
        <!-- <MagicWandTool
            v-show="false"
            v-model="activeTool"
            :width="image.raster_width"
            :height="image.raster_height"
            :image-data="image.data"
            @setcursor="setCursor"
            ref="magicwand"
        /> -->
<!--圆形笔刷(多边形范畴)-->
        <!-- <BrushTool
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="brush"
        /> -->
<!-- 二代笔刷 -->
         <!-- <BrushToolNew
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="brush"
        />        -->

<!--        橡皮擦(可以局部清除任何类型画框)-->
        <!-- <EraserTool
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="eraser"
        /> -->
      </div>
      <hr />
<!--        显示、隐藏所有标注-->

      <!-- <div v-show="mode == 'segment'">
        <ColorButton :image.sync="image" />
        <ShowAllButton
          v-if="this.type !== 'audit' && !showAllAnnotations"
          />
        <HideAllButton
          v-if="this.type !== 'audit' && showAllAnnotations"
          />
      </div> -->
      <hr>

<!--      图像居中按钮-->
      <CenterButton />
<!--      撤销按钮-->
      <!-- <UndoButton :style="{opacity: canBack ? 1 : 0.2}" ref="undo"/>
      <RepeatButton :style="{opacity: canGo ? 1 : 0.2}" ref="repeat"/> -->
      <hr />
      <SettingsButton
          ref="settings"
      />
    </aside>

<!--    右侧类别标注区域-->
    <aside v-show="panels.show.right" class="right-panel">
      <div
        v-for="(item, index) in picViewsList"
        :key="index"
        >
        <div
          v-show="activePaperScope === index"
          class="category-item-st">
          <div :style="{'border-bottom': showTaskDetails ? '' : '1px solid #bebebe'}">
          <div class="title-bar cursor-pointer" @click="showTaskDetails=!showTaskDetails">
            <span>详细信息</span>

            <div style="font-size: 25px;">
              <Icon v-show="!showTaskDetails" class="cursor-pointer" type="ios-arrow-down" />
              <Icon v-show="showTaskDetails" class="cursor-pointer" type="ios-arrow-up" />
            </div>
          </div>

            <div v-if="task_detail" v-show="showTaskDetails" style="padding: 10px 0">
                <task-card view="info" :item="task_detail">
                    <div slot="content">
                        <div class="task-details-row flex-ac">
                            <div class="label flex-ac">图片名称</div>
                            <div class="value flex-ac image-name">
                                <my-ellipsis :text="image.filename" fontSize="13px" tooltip></my-ellipsis>
                            </div>
                        </div>
                        <div class="task-details-row flex-ac">
                            <div class="label flex-ac">图片尺寸</div>
                            <div class="value flex-ac">{{ image.raster_width }} * {{image.raster_height}}</div>
                        </div>
                        <div class="task-details-row flex-ac">
                            <div class="label flex-ac">图片序号</div>
                            <div class="value flex-ac">{{ $parent.$refs['thumbnail-scroll'].absoluteIndex }}</div>
                        </div>
                    </div>
                </task-card>
            </div>
          </div>
          <div>
            <div class="title-bar">
              <span>标注标签</span>
            </div>

            <!-- <div class="add_label" style="padding:0 10px" v-show="this.projctLader">
              <Input v-model="addLabel" placeholder="标签ID" size="small" clearable></Input>
              <Input v-model="addLaname" class="mglr10" placeholder="标签名称" size="small" clearable></Input>
              <Button size="small" type="primary" @click="createTagLabel" style="font-size:12px">添加</Button>
            </div> -->
            <div style="width: 100%;text-align: center;color: grey; margin: 15px 0;">
              <span>根据图片内容，选择唯一标签</span>
            </div>

            <div
                class="category-container"
                :style="{'max-height': calcHeight()}"
                v-show="mode == 'segment'"
            >
              <div>
                <Category
                  v-for="(category, index) in item.categories"
                  :paperScopeItem="item"
                  :key="index + category.id + '-category'"
                  :simplify="simplify"
                  :categorysearch="search"
                  :category="category"
                  :all-categories="categories"
                  :opacity="shapeOpacity"
                  :hover="hover"
                  :index="index"
                  :currentShowType="currentShowType"
                  @click="onCategoryClick"
                  @auditAnnotationStatusChange="onAuditAnnotationStatusChange"
                  @auditAnnotationStatusChangeshow = "onAuditAnnotationStatusChangeshow"
                  @keypoints-complete="onKeypointsComplete"
                  :current="current"
                  :active-tool="activeTool"
                  :scale="image.scale"
                  ref="category"
                />
              </div>

            </div>
          </div>
          <div class="detectionConfig">
            <div class="title-bar cursor-pointer" @click="showAnnotatorConfig=!showAnnotatorConfig">
              <span>标注样式</span>
              <div style="font-size: 25px;">
                <Icon v-show="!showAnnotatorConfig" class="cursor-pointer" type="ios-arrow-down" />
                <Icon v-show="showAnnotatorConfig" class="cursor-pointer" type="ios-arrow-up" />
              </div>
            </div>

            <div v-show="showAnnotatorConfig">
              <div style="width: 100%;text-align: center;color: grey; margin: 15px 0;">
                <span>标注结果不透明度</span>
              </div>
              <div class="flex-cc mglr10 grey">
                <span style="width: 35px;">{{shapeOpacity}}</span>
                <Slider show-tip="never" style="width: 100%" v-model="shapeOpacity" :min="0" :max="0.5" :step="0.05"></Slider>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>

<!--    图片操作主区域-->
    <div class="pictureChannel-container flex-ca">
      <!-- <div
        v-for="(picChannel, index) in picViewsList"
        :key="index"
       class="center-panel"
       >
        <picChannel
          :cursor="cursor"
          :picInfo="picChannel"
          :activePaperScope='activePaperScope'
        />
      </div> -->
      <div
       class="center-panel" :style="{ cursor: cursor }">
        <Spin v-if="loading.image" fix size="large" style="background-color: rgba(255, 255, 255,0)!important">
          <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
          <div>加载中</div>
        </Spin>
        <v-touch @pinch="onpinch" @pinchstart="onpinchstart" style="width: 100%;height: 100%">
          <div id="frame" @wheel="onwheel" :class="['canvas-st', activePaperScope === 0? 'activePaperScope-st': '']">
            <canvas
              :style="{'filter': `brightness(${image.brightness}) contrast(${image.contrast})`}"
              class="canvas"
              id="editor"
              resize
              hidpi="off"
            />
          </div>
        </v-touch>
      </div>
      <div
       class="center-panel" :style="{ cursor: cursor }">
        <Spin v-if="loading.image2" fix size="large" style="background-color: rgba(255, 255, 255,0)!important">
          <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
          <div>加载中</div>
        </Spin>
        <v-touch @pinch="onpinch" @pinchstart="onpinchstart" style="width: 100%;height: 100%">
          <div id="frameSec" @wheel="onwheel" :class="['canvas-st', activePaperScope === 1? 'activePaperScope-st': '']">
            <canvas
              :style="{'filter': `brightness(${image.brightness}) contrast(${image.contrast})`}"
              class="canvasSec"
              id="editorSec"
              resize
              hidpi="off"
            />
          </div>
        </v-touch>
      </div>
    </div>
<!--    操作提示符-->
    <div class="operation_tip flex-cc" @mousemove="(e) => e.stopPropagation()">
        {{ operation_tip }}
    </div>
    <auditModal
      @changeAnnotation="AuditModalEvent"
      :selectToolsPosition="selectToolsPosition"
      :annotationsInfo="annotationsInfo"
      :isShowAuditModal.sync="isShowAuditModal"
      :labelType="currentShowType"
    ></auditModal>
  </div>
</template>

<script>
import PicChannel from './components/PicChannel.vue'
// dividing====
// dividing====
// dividing====
import '@/assets/tagsStyle.css'
import '@/assets/tooltip.css'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import 'vue-loading-overlay/dist/vue-loading.css'
import auditModal from '@/components/annotator/toolsVersionSecond/auditModal.vue'

import paper from 'paper'
import axios from '@/plugins/request'

import PolygonTool from '@/components/annotator/toolsVersionSecond/PolygonTool'
import BBoxTool from '@/components/annotator/toolsVersionSecond/BBoxTool'
import SelectTool from '@/components/annotator/toolsVersionSecond/SelectTool'
import EraserTool from '@/components/annotator/toolsVersionSecond/EraserTool'
import LineTool from '@/components/annotator/toolsVersionSecond/LineTool'
import BrushToolNew from '@/components/annotator/toolsVersionSecond/BrushToolNew'
import SettingsButton from '@/components/annotator/toolsVersionSecond/SettingsButton'
import CenterButton from '@/components/annotator/toolsVersionSecond/CenterButton'

import PolygonPanel from '@/components/annotator/panels/PolygonPanel'
import BBoxPanel from '@/components/annotator/panels/BBoxPanel'
import SelectPanel from '@/components/annotator/panels/SelectPanel'
import EraserPanel from '@/components/annotator/panels/EraserPanel'
import LinePanel from '@/components/annotator/panels/LinePanel'
import BrushPanel from '@/components/annotator/panels/BrushPanel'
import Category from '@/components/annotator/toolsVersionSecond/Category.vue'

import FileTitle from '@/components/annotator/FileTitle'
import Label from '@/components/annotator/Label'
import Annotations from '@/models/annotations'

import MagicWandTool from '@/components/annotator/tools/MagicWandTool'
import BrushTool from '@/components/annotator/tools/BrushTool'
import KeypointTool from '@/components/annotator/tools/KeypointTool'
import DEXTRTool from '@/components/annotator/tools/DEXTRTool'

import CopyAnnotationsButton from '@/components/annotator/tools/CopyAnnotationsButton'
import DownloadButton from '@/components/annotator/tools/DownloadButton'
import ModeButton from '@/components/annotator/tools/ModeButton'
import DeleteButton from '@/components/annotator/tools/DeleteButton'
import RepeatButton from '@/components/annotator/tools/RepeatButton'
import UndoButton from '@/components/annotator/tools/UndoButton'
import ColorButton from '@/components/annotator/tools/ColorButton'
import ShowAllButton from '@/components/annotator/tools/ShowAllButton'
import HideAllButton from '@/components/annotator/tools/HideAllButton'
import AnnotateButton from '@/components/annotator/tools/AnnotateButton'

import MagicWandPanel from '@/components/annotator/panels/MagicWandPanel'
import KeypointPanel from '@/components/annotator/panels/KeypointPanel'
import DEXTRPanel from '@/components/annotator/panels/DEXTRPanel'
import taskCard from '@/pages/tasks/component/taskCard'

import { mapMutations } from 'vuex'
import { readUserProfile } from '@/store/main/getters'
import MyEllipsis from '@/components/widget/MyEllipsis.vue'

const toolMap = {
  '选择工具': 'select',
  '矩形工具': 'bbox',
  '多边形工具': 'polygon',
  '笔刷工具': 'brush',
  '橡皮擦': 'eraser'
}

export default {
  name: 'Annotator',
  components: {
    PicChannel,
    LinePanel,
    Category,
    BBoxTool,
    SelectTool,
    BBoxPanel,
    CenterButton,

    // dividing====
    // dividing====
    // dividing====
    FileTitle,
    CopyAnnotationsButton,
    CLabel: Label,

    PolygonTool,
    PolygonPanel,
    MagicWandTool,
    EraserTool,
    BrushTool,
    BrushToolNew,
    KeypointTool,
    LineTool,
    DownloadButton,
    SettingsButton,
    DeleteButton,
    SelectPanel,
    MagicWandPanel,
    BrushPanel,
    EraserPanel,
    ModeButton,
    UndoButton,
    RepeatButton,
    HideAllButton,
    ShowAllButton,
    ColorButton,
    KeypointPanel,
    AnnotateButton,
    DEXTRTool,
    DEXTRPanel,
    MyEllipsis,
    auditModal,

    taskCard
  },
  props: {
    activePaperScope: {
      type: Number,
      default: 1
    },
    // dividing---
    // dividing---
    // dividing---
    showImageList: {
      type: Boolean,
      default: true
    },
    canBack: {
      type: Boolean,
      default: true
    },
    canGo: {
      type: Boolean,
      default: true
    },
    snapshotLength: {
      type: Number
    },
    currentStep: {
      type: Number
    }
  },
  data() {
    return {
      picViewsList: [
        {
          id: null,
          index: 0,
          title: 'Surface',
          categories: [],
          url: ''
        },
        {
          id: null,
          index: 1,
          title: 'PL',
          categories: [],
          url: ''
        }
      ],
      // 保存当前标注的标签和标注序号
      current: {
        category: -1,
        annotation: -1,
        keypoint: -1
      },
      // dividing---
      // dividing---
      // dividing---
      // dividing---
      isShowAuditModal: false,
      annotationsInfo: {},
      selectToolsPosition: {},

      reloadTools: true,
      gradientColor: false,
      submitFlag: false,
      changeSnapshotFlag: false,
      annotationsInfo: {},
      projctLader: false,
      addLabel: '',
      addLaname: '',
      activeTool: '选择工具',
      // paper: null,
      shapeOpacity: 0.5,
      zoom: 0.2,
      cursor: 'move',
      mode: 'segment',
      simplify: 1,
      panels: {
        show: {
          left: true,
          right: true
        }
      },

      hover: {
        category: -1,
        annotation: -1,
        keypoint: -1
      },
      image: {
        raster_width: 0,
        raster_height: 0,
        scale: 0,
        metadata: {},
        ratio: 0,
        rotate: 0,
        id: null,
        url: '',
        dataset: 0,
        previous: null,
        next: null,
        filename: '',
        categoryIds: [],
        data: null,
        brightness: 1,
        contrast: 1
      },
      imageSec: {
        raster_width: 0,
        raster_height: 0,
        scale: 0,
        metadata: {},
        ratio: 0,
        rotate: 0,
        id: null,
        url: '',
        dataset: 0,
        previous: null,
        next: null,
        filename: '',
        categoryIds: [],
        data: null,
        brightness: 1,
        contrast: 1
      },
      text: {
        // topLeft: null,
        // topRight: null
      },
      categories: [],
      categoriesIndexMap: {},
      dataset: {
        annotate_url: ''
      },
      loading: {
        image: true,
        image2: true,
        data: true,
        loader: null
      },
      search: '',
      pinching: {
        old_zoom: 1
      },
      auditAnnotationChecked: [],
      auditAnnotationCheckedOrigin: null,
      showTaskDetails: false,
      showAnnotatorConfig: true,

      task_detail: null,
      isSave: false,
      isChange: false, // 如果标注没有改变, 则无需保存
      isAnnotateComplete: true,
      showList: [],
      showAllAnnotations: true,
      currentShowType: 'label',
      tempSaveCategory: {}
    }
  },
  methods: {
    clearImage() {
      if (this.image && this.image.raster) {
        this.image.raster.remove()
        this.image = {}
      }
      if (this.imageSec && this.imageSec.raster) {
        this.imageSec.raster.remove()
        this.imageSec = {}
      }
    },
    initSomeVariables() {
      Object.assign(this, {
        color: 'green',
        selfOpacity: 0.5,
        excludeCompoundPath: {
          children: []
        }
      })
    },
    // 将标注工具输出的Path和Annotation进行关联
    uniteCurrentAnnotation(compound, simplify = true, undoable = true, isBBox = false, isLine = false) {
      if (!this.isAnnotateComplete) return
      // sometimes currentAnnotation is null...
      const annotaitons = this.currentCategory.$refs['annotation']
      const targAn = annotaitons[this.current.annotation]
      if (this.currentAnnotation == null && targAn == null) return
      if (this.currentAnnotation) {
        if (this.validationAnnotationBounds(compound.bounds)) {
          this.$Message.warning('标注框不可超过图片边界!')
          this.deleteCurrentAnnotation(false)
        } else {
          this.currentAnnotation.unite(compound, simplify, undoable, isBBox, isLine)
        }
      } else if (targAn) {
        if (this.validationAnnotationBounds(compound.bounds)) {
          this.$Message.warning('标注框不可超过图片边界!')
        } else {
          targAn.unite(compound, simplify, undoable, isBBox, isLine)
        }
      }
    },
    getCategory(index) {
      if (index < 0 || index == null) return null
      const ref = this.$refs.category
      if (ref == null) return null
      if (ref.length < 1 || index >= ref.length / 2) return null
      return ref[index + this.activePaperScope * this.picViewsList[0].categories.length]
      // return ref[index];
    },
    selectLastEditorTool() {
      this.activeTool = localStorage.getItem('editorTool') || '选择工具'
    },
    // Dividing-----------
    // Dividing-----------
    // Dividing-----------
    // Dividing-----------
    // Dividing-----------
    // 设置鼠标光标样式
    setCursor(newCursor) {
      this.cursor = newCursor
    },
    AuditModalEvent(annotationId, dbClick, click, type) {
      this.$refs.category.forEach(category => {
        category.$refs.annotation && category.$refs.annotation.forEach((annotation, index) => {
          if (annotation.annotation.id == annotationId) {
            if (dbClick) {
              annotation.showSettingModal = true
            } else if (click) {
              annotation.$emit('changeIndices', index)
            } else {
              if (type === '删除') {
                annotation.deleteAnnotation()
              } else {
                annotation.onAnnotationClick()
              }
            }
          }
        })
      })
    },
    // 所有paperScope居中处理
    centerPaperScope() {
      this.fit()
      this.fitSec()
    },
    clearBBoxGuide() {
      this.$refs.bbox.clearGuidePath()
    },

    initGradientColor() {
      const colorObj = {
        gradient: {
          stops: new Array(20).fill(null).map((v, i) => i % 2 == 0 ? 'red' : 'blue')
        },
        origin: new paper.Point(-500, -500),
        destination: new paper.Point(500, -500)
      }
      this.gradientColor = colorObj
    },
    reloadToolsDom() {
      this.reloadTools = false
      const curTool = this.activeTool
      this.activeTool = ''
      this.$nextTick(() => {
        this.reloadTools = true
        this.$nextTick(() => {
          this.activeTool = curTool
        })
      })
    },
    // 隐藏或显示当前标注
    showOrHide(flag) {
      let annotation = null
      if (this.current.annotation !== -1) {
        annotation = this.$refs.category[this.current.category].$refs.annotation[this.current.annotation]
      }
      if (annotation) {
        annotation.compoundPath.fullySelected = !!flag
      }
    },
    ...mapMutations(['addProcess', 'removeProcess', 'resetUndo', 'setDataset']),

    reInitCheckedStatus(ref) {
      ref.forEach((category) => {
        category.$refs.annotation &&
          category.$refs.annotation.forEach((annotation) => {
            const isChecked = this.auditAnnotationChecked.indexOf(annotation.annotation.id) > -1
            annotation.setAuditBackgroundColor(isChecked)
            annotation.isVisible = isChecked
            annotation.compoundPath.fullySelected = isChecked
          })
      })
    },
    onLabelClick() {
      this.currentShowType = 'label'
      this.$nextTick(() => {
        this.reInitCheckedStatus(this.$refs.category)
        this.onCategoryClick({
          annotation: -1,
          category: -1,
          keypoint: this.current.keypoint
        })
      })
    },

    getLocalSnap() {
      let snapshotList = localStorage.getItem('snapshotList')
      if (snapshotList) {
        snapshotList = JSON.parse(snapshotList)
      } else {
        snapshotList = []
      }
      return snapshotList
    },
    changeStep(step) {
      this.$refs.category.forEach(category => {
        const refs = category.$refs.annotation
        refs && refs.forEach(item => {
          item.removeBorderCompoundPath()
          item.compoundPath && item.compoundPath.remove()
        })
      })
      const snapshotList = this.getLocalSnap()
      // 先去除当前选中annotation，索引问题会导致步数出错，后期再每步保存快照基础上
      // 加入onCategoryClick的快照，保存当前this.current
      this.changeSnapshotFlag = true
      this.onCategoryClick({
        annotation: -1,
        category: this.current.category,
        keypoint: this.current.keypoint
      })
      this.categories = [...snapshotList[step - 1]]
    },
    changeSnapshot() {
      let snapshotList = this.getLocalSnap()
      const data = []
      this.$refs.category.forEach(category => {
        const categoryData = category.export()
        categoryData.annotations.forEach(annotation => {
          annotation.status = this.auditAnnotationIsConfirmed(annotation)
          annotation.paper_object = annotation.compoundPath
          annotation.category_id = category.category.id
        })
        data.push(categoryData)
      })
      if (this.currentStep != snapshotList.length) {
        snapshotList = snapshotList.splice(0, this.currentStep)
      }
      snapshotList.length > 10 && snapshotList.shift()
      snapshotList.push(data)

      this.$emit('update:snapshotLength', snapshotList.length)
      this.$emit('update:currentStep', snapshotList.length)
      snapshotList = JSON.stringify(snapshotList)
      localStorage.setItem('snapshotList', snapshotList)
    },

    // 发现图像url，重新加载图像
    reinit() {
      if (this.imageId) {
        this.image.id = this.imageId
        this.image.url = '/api/v1/file/download?file_id=' + this.image.id
        // this.picViewsList[0].id = this.imageId
        // this.picViewsList[0].url = "/api/v1/file/download?file_id=" + this.image.id
        this.getData()
      }
    },
    getAllAnnotationsData() {
      // dadian
      const refs = this.$refs
      const data = {
        mode: this.mode,
        user: {
          bbox: this.$refs.bbox.export(),
          // polygon: this.$refs.polygon.export(),
          // eraser: this.$refs.eraser.export(),
          // brush: this.$refs.brush.export(),
          line: this.$refs.line.export(),
          // magicwand: this.$refs.magicwand.export(),
          select: this.$refs.select.export(),
          settings: {}
        },
        dataset: this.dataset,
        image: {
          id: this.image.id,
          metadata: {},
          settings: {
            selectedLayers: this.current
          },
          category_ids: []
        },
        settings: {
          activeTool: this.activeTool,
          zoom: this.zoom,
          tools: {},
          // TODO: @yangzongbin please check the default value.
          categoryId: this.currentCategory != null ? this.currentCategory.category.id : 1
        },
        categories: []
      }
      if (refs.category != null && this.mode === 'segment') {
        this.image.categoryIds = []
        refs.category.forEach(category => {
          const categoryData = category.export()
          data.categories.push(categoryData)
          if (categoryData.annotations.length > 0) {
            const categoryIds = this.image.categoryIds
            if (categoryIds.indexOf(categoryData.id) === -1) {
              categoryIds.push(categoryData.id)
            }
          }
        })
      }

      data.image.category_ids = this.image.categoryIds
      return data
    },

    // 标注数据保存到后端
    async save(callback, disableCheck, saveType = '') {
      const secId = this.imageSec.id
      const sec_url = this.interface_url_sec

      if (!this.isResultChange() && !disableCheck) {
        if (typeof callback === 'function') callback()
        return
      }
      const process = 'Saving'
      this.addProcess(process)
      const data = this.getAllAnnotationsData()
      const basicData = {
        ...data,
        categories: data.categories.slice(0, data.categories.length / 2)
      }
      console.log('基准图数据>>', basicData)
      const otherProjectData = {
        ...data,
        image: {
          ...data.image,
          id: secId
        },
        categories: data.categories.slice(data.categories.length / 2)
      }

      console.log('二通道数据>>>', otherProjectData)
      let uri = this.interface_url
      const taskId = this.task_id
      if (saveType == 'stageSubmit') {
        uri = `/api/v1/label/stage/submit/${taskId}/${this.image.id}?is_auditing=false`
      }
      if (saveType == 'taskSubmit') {
        uri = `/api/v1/label/task/submit/${taskId}`
      }
      const params = {
        task_id: taskId,
        coco_annotations: [
          basicData,
          otherProjectData
        ]
      }
      this.$Message.info('正在保存中...')
      let res = ''
      if (saveType !== 'taskSubmit') {
        res = await this.mutiChannelSaveData(taskId, params)
      } else {
        res = await this.mutiChannelSubmitData(params)
      }
      this.$Message.success('保存成功')
      console.log('res>>', res)
      if (location.hash.includes('todo')) {
        sessionStorage.removeItem('currentImgId')
      }
      // TODO: updateUser
      if (saveType == 'taskSubmit') {
        this.submitFlag = true
      }
      this.isSave = true
      if (typeof callback === 'function') callback()
      // 基准图片信息提交
      // await axios
      //     .post(uri, JSON.stringify(basicData), {headers: {'Content-Type': 'application/json'}})
      //     .then(() => {
      //       if (location.hash.includes('todo')) {
      //         sessionStorage.removeItem('currentImgId')
      //       }
      //       //TODO: updateUser
      //       if (saveType == "taskSubmit") {
      //         this.submitFlag = true
      //       }
      //       this.isSave = true
      //       if (typeof callback === 'function') callback();
      //       // 如果当前是淹没配置，支持每次save更新数据 ---->变更：掩膜配置保存即跳转
      //       // if (this.$route.name === 'detection-mask') {
      //       //   this.$parent.reloadAnnotate()
      //       // }
      //     })
      //     .finally(() => this.removeProcess(process));
      //     // 其他通道图片数据提交

      // await axios
      //     .post(sec_url, JSON.stringify(otherProjectData), {headers: {'Content-Type': 'application/json'}})
      //     .then(() => {
      //       if (location.hash.includes('todo')) {
      //         sessionStorage.removeItem('currentImgId')
      //       }
      //       //TODO: updateUser
      //       if (saveType == "taskSubmit") {
      //         this.submitFlag = true
      //       }
      //       this.$Message.success('保存成功');
      //       this.isSave = true
      //       if (typeof callback === 'function') callback();
      //     })
      //     .finally(() => this.removeProcess(process));
    },

    // 标注或审核内容是否有更新
    isResultChange() {
      return this.isChange
    },
    // unused
    onpinchstart(e) {
      e.preventDefault()
      if (!this.doneLoading) return
      this.pinching.old_zoom = this.paper.view.zoom
      return false
    },
    // unused
    onpinch(e) {
      // // console.warn("onpinch!", e)
      e.preventDefault()
      if (!this.doneLoading) return
      const view = this.paper.view
      const viewPosition = view.viewToProject(
        new paper.Point(e.center.x, e.center.y)
      )
      const curr_zoom = e.scale * this.pinching.old_zoom
      const beta = this.paper.view.zoom / curr_zoom
      const pc = viewPosition.subtract(this.paper.view.center)
      const a = viewPosition.subtract(pc.multiply(beta)).subtract(this.paper.view.center)
      const transform = { zoom: curr_zoom, offset: a }
      if (transform.zoom < 10 && transform.zoom > 0.01) {
        this.image.scale = 1 / transform.zoom
        this.paper.view.zoom = transform.zoom + Math.pow(Math.E, -6)
        this.paper.view.center = view.center.add(transform.offset)
      }
      return false
    },
    // 鼠标滑动事件, 缩小或放大图片
    onwheel(e) {
      e.preventDefault()
      if (!this.doneLoading) return

      const view = this.paper.view

      if (e.ctrlKey) {
        // Pan up and down
        const delta = new paper.Point(0, 0.5 * e.deltaY)
        this.paper.view.setCenter(view.center.add(delta))
        this.paperSec.view.setCenter(view.center.add(delta))
      } else if (e.shiftKey) {
        // Pan left and right
        const delta = new paper.Point(0.5 * e.deltaY, 0)
        this.paper.view.setCenter(this.paper.view.center.add(delta))
        this.paperSec.view.setCenter(this.paperSec.view.center.add(delta))
      } else {
        const viewPosition = view.viewToProject(
          new paper.Point(e.offsetX, e.offsetY)
        )
        const transform = this.changeZoom(e.deltaY, viewPosition)
        this.image.scale = 1 / transform.zoom
        this.imageSec.scale = 1 / transform.zoom
        this.paper.view.zoom = transform.zoom + Math.pow(Math.E, -6)
        this.paper.view.center = this.paper.view.center.add(transform.offset)
        this.paperSec.view.zoom = transform.zoom + Math.pow(Math.E, -6)
        this.paperSec.view.center = this.paperSec.view.center.add(transform.offset)
      }

      return false
    },
    zoomView(bounds) {
      this.paper.view.center = bounds.center
      const frame = document.getElementById('frame')
      this.paper.view.zoom = Math.min(
        frame.clientWidth / (bounds.width + Math.pow(Math.E, -6)),
        (frame.clientHeight - 100) / (bounds.height + Math.pow(Math.E, -6))
      ) + Math.pow(Math.E, -6)
      this.image.scale = 1 / this.paper.view.zoom
    },
    calcHeight() {
      const container = window.document.getElementById('app')
      if (container) {
        let other_height = 230
        if (this.showTaskDetails) other_height += 160
        if (this.showAnnotatorConfig) other_height += 87
        return String(container.clientHeight - other_height) + 'px'
      }
      return '500px'
    },
    // 使画布居中显示
    //
    fit() {
      // frame包裹着canvas
      const frame = document.getElementById('frame')
      if (!!this.paper.view && !!this.image) {
        const parentX = this.image.raster_width = this.image.raster.width
        const parentY = this.image.raster_height = this.image.raster.height

        this.paper.view.zoom = Math.min(
          frame.clientWidth / (parentX + Math.pow(Math.E, -6)),
          (frame.clientHeight - 100) / (parentY + Math.pow(Math.E, -6))
        ) + Math.pow(Math.E, -6)
        this.paper.view.setCenter(0, 0)
        this.image.scale = 1 / this.paper.view.zoom
      }
    },
    fitSec() {
      // frame包裹着canvas
      const frame = document.getElementById('frameSec')
      if (!!this.paperSec.view && !!this.imageSec) {
        const parentX = this.imageSec.raster_width = this.imageSec.raster.width
        const parentY = this.imageSec.raster_height = this.imageSec.raster.height

        this.paperSec.view.zoom = Math.min(
          frame.clientWidth / (parentX + Math.pow(Math.E, -6)),
          (frame.clientHeight - 100) / (parentY + Math.pow(Math.E, -6))
        ) + Math.pow(Math.E, -6)
        this.paperSec.view.setCenter(0, 0)
        this.imageSec.scale = 1 / this.paperSec.view.zoom
      }
    },
    // 计算鼠标滑动后的 zoom和 offset, 仅在 @onwheel 方法中用到
    changeZoom(delta, p) {
      const oldZoom = this.paper.view.zoom
      const c = this.paper.view.center
      const factor = 1 + this.zoom

      const zoom = delta < 0 ? oldZoom * factor : oldZoom / factor
      const beta = oldZoom / zoom
      const pc = p.subtract(c)
      const a = p.subtract(pc.multiply(beta)).subtract(c)

      return { zoom: zoom, offset: a }
    },

    // 调整画布的尺寸
    fitCanvas(activePaperScopeIndex) {
      // let frame = document.getElementById(this.picViewsList[activePaperScopeIndex].title + "frame")
      // let canvas = document.getElementById(this.picViewsList[activePaperScopeIndex].title +"editor")

      const frame = document.getElementById('frame')
      const canvas = document.getElementById('editor')

      /**
       * 注意：canvas默认宽高为300*150，只有两种正确方式来重设宽高
       * 1. 在<canvas width="100" height="100">元素上设置
       * 2. 使用如下方式设置
       * 如果通过css（class/style）来设置，会导致canvas的比例变形
      **/
      canvas.width = frame.clientWidth
      canvas.height = frame.clientHeight
      return canvas
    },
    fitSecCanvas() {
      const frame = document.getElementById('frameSec')
      const canvas = document.getElementById('editorSec')
      /**
       * 注意：canvas默认宽高为300*150，只有两种正确方式来重设宽高
       * 1. 在<canvas width="100" height="100">元素上设置
       * 2. 使用如下方式设置
       * 如果通过css（class/style）来设置，会导致canvas的比例变形
      **/
      canvas.width = frame.clientWidth
      canvas.height = frame.clientHeight
      return canvas
    },
    // 初始化画布, 加载图片
    initCanvas() {
      const process = 'Initializing canvas'
      this.addProcess(process)
      this.loading.image = true

      const canvas = this.fitCanvas(0)
      this.paper.setup(canvas)
      this.paper.activate()
      this.image.raster = new paper.Raster(this.image.url)
      this.image.raster.smoothing = false
      this.image.raster.onLoad = () => {
        if (this.image.raster.width) {
          const width = this.image.raster_width = this.image.raster.width
          const height = this.image.raster_height = this.image.raster.height
          this.gradientColor.origin = new paper.Point(-width, -height)
          this.gradientColor.destination = new paper.Point(width, -height)
          // 宽高为偶数时调节一下，否则会造成边缘像素异位
          this.image.raster.position.x = this.image.raster.position.y = 0
          if (width % 2 != 0) {
            this.image.raster.position.x = this.image.raster.position.x + 0.5
          }
          if (height % 2 != 0) {
            this.image.raster.position.y = this.image.raster.position.y + 0.5
          }
          this.image.raster.sendToBack()
          this.fit()
          this.image.ratio = (width * height) / 1000000
          this.removeProcess(process)

          const tempCtx = document.createElement('canvas').getContext('2d')
          tempCtx.canvas.width = width
          tempCtx.canvas.height = height
          tempCtx.drawImage(this.image.raster.image, 0, 0)
          this.image.data = tempCtx.getImageData(0, 0, width, height)
          const fontSize = width * 0.025

          const positionTopLeft = new paper.Point(
            -width / 2,
            -height / 2 - fontSize * 0.5
          )
          this.text.topLeft = new paper.PointText(positionTopLeft)
          this.text.topLeft.fontSize = fontSize
          this.text.topLeft.fillColor = 'white'
          // this.text.topLeft.content = this.image.filename;

          const positionTopRight = new paper.Point(
            width / 2,
            -height / 2 - fontSize * 0.4
          )
          this.text.topRight = new paper.PointText(positionTopRight)
          this.text.topRight.justification = 'right'
          this.text.topRight.fontSize = fontSize
          this.text.topRight.fillColor = 'white'
          // this.text.topRight.content = width + "x" + height;
          this.loading.image = false
          setTimeout(this.fit, 0)
        }
      }
    },
    initSecCanvas() {
      const process = 'Initializing canvas'
      this.addProcess(process)
      this.loading.image2 = true
      const canvas = this.fitSecCanvas()
      this.paperSec.setup(canvas)
      this.paperSec.activate()
      this.imageSec.raster = new paper.Raster({
        source: this.imageSec.url
      })
      this.imageSec.raster.smoothing = false
      this.imageSec.raster.onLoad = () => {
        if (this.imageSec.raster.width) {
          const width = this.imageSec.raster_width = this.imageSec.raster.width
          const height = this.imageSec.raster_height = this.imageSec.raster.height
          this.gradientColor.origin = new paper.Point(-width, -height)
          this.gradientColor.destination = new paper.Point(width, -height)
          // 宽高为偶数时调节一下，否则会造成边缘像素异位
          this.imageSec.raster.position.x = this.imageSec.raster.position.y = 0
          if (width % 2 != 0) {
            this.imageSec.raster.position.x = this.imageSec.raster.position.x + 0.5
          }
          if (height % 2 != 0) {
            this.imageSec.raster.position.y = this.imageSec.raster.position.y + 0.5
          }
          this.imageSec.raster.sendToBack()
          this.fitSec()
          this.imageSec.ratio = (width * height) / 1000000
          this.removeProcess(process)

          const tempCtx = document.createElement('canvas').getContext('2d')
          tempCtx.canvas.width = width
          tempCtx.canvas.height = height
          tempCtx.drawImage(this.imageSec.raster.image, 0, 0)
          this.imageSec.data = tempCtx.getImageData(0, 0, width, height)
          const fontSize = width * 0.025

          const positionTopLeft = new paper.Point(
            -width / 2,
            -height / 2 - fontSize * 0.5
          )
          this.text.topLeft = new paper.PointText(positionTopLeft)
          this.text.topLeft.fontSize = fontSize
          this.text.topLeft.fillColor = 'white'
          const positionTopRight = new paper.Point(
            width / 2,
            -height / 2 - fontSize * 0.4
          )
          this.text.topRight = new paper.PointText(positionTopRight)
          this.text.topRight.justification = 'right'
          this.text.topRight.fontSize = fontSize
          this.text.topRight.fillColor = 'white'
          // this.text.topRight.content = width + "x" + height;
          this.loading.image2 = false
          setTimeout(this.fitSec, 0)
        }
      }
    },
    // 设置各个标注组件的配置 (如线颜色, 圆角, 阈值, 展示方式等等)
    setPreferences(preferences) {
      const refs = this.$refs
      // TODO：mounted阶段时$refs获取不到左侧栏中的dom，需要等待一段时间再尝试获取（@wenshuoc）
      if (typeof (refs.bbox) === 'undefined') {
        setTimeout(() => {
          this.setPreferences(preferences)
        }, 100)
        return
      }

      refs.select.setPreferences(preferences.select || {})
      refs.bbox.setPreferences(preferences.bbox || preferences.polygon || {})
      // refs.polygon.setPreferences(preferences.polygon || {});
      // refs.magicwand.setPreferences(preferences.magicwand || {});
      // refs.brush.setPreferences(preferences.brush || {});
      // refs.eraser.setPreferences(preferences.eraser || {});
      // refs.line.setPreferences(preferences.line || {});
    },
    // 获取所有的标注框，未启用
    getAllAnnotations(get_ids = false) {
      const result = []
      this.categories.forEach(category_obj => {
        category_obj.annotations.forEach(annotation_obj => {
          if (get_ids) {
            result.push(annotation_obj.id)
          } else {
            result.push(annotation_obj)
          }
        })
      })
      return result
    },
    getAnnotationCheckIds() {
      this.categories.forEach(category_obj => {
        category_obj.annotations.forEach(annotation_obj => {
          if ((annotation_obj.status === 'OK' || annotation_obj.is_auto_selected) && annotation_obj.status !== 'LOST') {
            // 此处关联 Annotation组件 要改一起改
            this.auditAnnotationChecked.push(annotation_obj.id)
          }
        })
      })
      this.auditAnnotationCheckedOrigin = JSON.parse(JSON.stringify(this.auditAnnotationChecked))
    },

    // 加载用户上一次标注的配置
    loadSetting(settings) {
      if (settings.categoryId) {
        this.categoryIndexClick(this.categoriesIndexMap[settings.categoryId])
      }
      if (settings.activeTool) {
        this.activeTool = settings.activeTool
      }
    },
    assignmentOtherPaperProjects(data) {
      // data.forEach((item) => {
      // 当前只针对双通道，后续还有多通道，需遍历处理
      this.imageSec.id = data[0].image.id
      this.imageSec.url = '/api/v1/file/download?file_id=' + this.imageSec.id
      this.initSecCanvas()

      // this.picViewsList.forEach((item, index) => {
      //   if (index !== 0) {
      //     item.id = data[index].id
      //     item.url = "/api/v1/file/download?file_id=" + data[index].id
      //   }
      // })
      // })
    },
    // 获取当前图片的标注信息, 以及其他数据(下一张图片,类别列表等)
    getData(callback) {
      const process = 'Loading annotation data'
      this.addProcess(process)
      this.loading.data = true
      axios
        .get(this.interface_url)
        .then(response => {
          // 双视图需求，返回数据由对象改为数组
          // console.log('response>>>', response)
          const data = response[0]
          this.assignmentOtherPaperProjects(response.slice(1))
          this.initCanvas()
          sessionStorage.setItem('currentImgId', this.image.id)
          this.$emit('update:currentStep', 1)
          this.$emit('update:snapshotLength', 0)
          this.loading.data = false
          // Set image data
          this.image.metadata = data.image.metadata || {}
          this.image.filename = data.image.file_name
          this.image.next = data.image.next
          this.image.previous = data.image.previous
          this.image.categoryIds = data.image.category_ids || []
          this.image.img_router = data.image.img_router
          if (data.image.width && data.image.height) {
            this.image.raster_width = data.image.width
            this.image.raster_height = data.image.height
          }
          this.targetIndex = data.image.img_router ? data.image.img_router.current_index : 1

          // Set other data
          this.dataset = data.dataset
          this.categories = data.categories
          this.picViewsList.forEach((pic, index) => {
            pic.categories = JSON.parse(JSON.stringify(response[index].categories))
          })
          this.categories.forEach((item, index) => {
            this.categoriesIndexMap[item.id] = index
          })
          localStorage.setItem('snapshotList', JSON.stringify([data.categories]))

          // Update status
          this.setDataset(this.dataset)

          if (this.text.topLeft != null) {
            // this.text.topLeft.content = this.image.filename;
          }

          this.$nextTick(() => {
            const preferences = data.preferences
            this.setPreferences(preferences)
            this.loadSetting(data.settings)
          })

          if (callback != null) callback()
        })
        .catch((error) => {
          this.axiosReqestError(
            'Could not find requested image',
            'Redirecting to previous page.'
          )
          this.$router.go(-1)
        })
        .finally(() => this.removeProcess(process))
    },

    // 标签或某个标注项点击 (改变画框颜色, 画框线段样式)
    onCategoryClick(indices) {
      // dadian
      this.current.annotation = indices.annotation
      this.current.category = indices.category
      if (!indices.hasOwnProperty('keypoint')) {
        indices.keypoint = -1
      }
      if (indices.keypoint !== -1) {
        // console.log('exit--keypoint')
        this.current.keypoint = indices.keypoint
        const ann = this.currentCategory.category.annotations[this.current.annotation]
        const kpTool = this.$refs.keypoint
        const selectTool = this.$refs.select
        const category = this.$refs.category[this.current.category]
        const annotation = category.$refs.annotation[this.current.annotation]
        annotation.showKeypoints = true
        const keypoints = annotation.keypoints
        if (keypoints._labelled[indices.keypoint + 1]) {
          const indexLabel = String(this.current.keypoint + 1)
          const keypoint = keypoints._labelled[indexLabel]
          keypoint.selected = true
          this.activeTool = selectTool
          this.activeTool.click()
        } else {
          this.currentAnnotation.keypoint.next.label = String(indices.keypoint + 1)
          this.activeTool = kpTool
          this.activeTool.click()
        }
      }
    },
    onKeypointsComplete() {
      // // console.warn("onKeypointsComplete")
      this.currentAnnotation.keypoint.next.label = -1
      this.activeTool = this.$refs.select
      this.activeTool.click()
    },

    deleteCurrentAnnotation(undoable = true) {
      if (this.currentAnnotation) {
        if (this.$refs.brush && this.activeTool === this.$refs.brush.name &&
          this.currentAnnotation.compoundPath.children.length) return
        const currentKeypoint = this.currentAnnotation.getCurrentKeypoint()
        if (currentKeypoint) {
          this.currentAnnotation.keypoints.deleteKeypoint(
            currentKeypoint
          )
          this.currentAnnotation.tagRecomputeCounter++
          this.currentAnnotation.currentKeypoint = null
        } else {
          this.currentAnnotation.deleteAnnotation(undoable)
        }
      }
    },
    getCurrentImageInfo() {
      const activePaperScope = this.activePaperScope
      const res = activePaperScope === 0 ? this.image : this.imageSec
      return res
    },
    // 验证标注框包围盒是否越界 (图片)
    validationAnnotationBounds(bounds, delta_x = 0, delta_y = 0) {
      if (!bounds) { bounds = this.currentAnnotation.compoundPath.bounds }

      let left = 0; let right = 0; let top = 0; let bottom = 0
      if (delta_x > 0) { left = Math.abs(delta_x) }
      if (delta_x < 0) { right = Math.abs(delta_x) }
      if (delta_y > 0) { top = Math.abs(delta_y) }
      if (delta_y < 0) { bottom = Math.abs(delta_y) }

      const max_x = Math.max(
        Math.abs(bounds.left) + left,
        Math.abs(bounds.right) + right
      )
      const max_y = Math.max(
        Math.abs(bounds.top) + top,
        Math.abs(bounds.bottom) + bottom
      )
      const imgInfo = this.getCurrentImageInfo()

      let x_disable = false; let y_disable = false
      if (max_x > imgInfo.raster.width / 2) { x_disable = true }
      if (max_y > imgInfo.raster.height / 2) { y_disable = true }

      if (delta_x || delta_y) {
        return {
          x_disable: x_disable,
          y_disable: y_disable
        }
      }
      return x_disable || y_disable
    },

    //     ///新增标签方法
    // createTagLabel(){
    //   if(this.addLabel == ''){
    //         this.$Message.warning("新增标签id不能为空")
    //   }else if(this.addLaname == ''){
    //         this.$Message.warning("新增标签名称不能为空")
    //   }else{
    //       this.$axios.createTag({label_task_id:this.task_id,tag_key:this.addLabel,tag_name:this.addLaname}).then((res)=>{
    //       const categories = {
    //         color: res.color,
    //         id: res.id,
    //         deleted: false,
    //         name: res.tag_name,
    //         show: true,
    //         supercategory: "",
    //         visualize: false,
    //         metadata: {},
    //         keypoint_colors: [],
    //         keypoint_edges: [],
    //         keypoint_labels: [],
    //         annotations:[],
    //         creator: res.creator_id
    //       }
    //       this.categories.push(categories)
    // 	    let snapshotList = localStorage.getItem('snapshotList')
    //       if (snapshotList) {
    //         snapshotList = JSON.parse(snapshotList)
    //         snapshotList.forEach(item => {
    //           item.push(categories)
    //         })
    //         localStorage.setItem('snapshotList', JSON.stringify(snapshotList))
    //       }
    //       this.addLabel = '';
    //       this.addLaname = ''
    //        this.$Message.success('新增标签成功')
    //     })
    //   }
    // },
    // copy当前标注,未启用
    // copy() {
    //   const currentCategory = this.$refs.category[this.current.category];
    //   const annotaitonList = currentCategory.$refs.annotation;
    //   const haveChecked = annotaitonList && annotaitonList.some(item => item.isCurrent);
    //   const annotationId = currentCategory.category.annotations.length;
    //   const r = Math.floor(Math.random()*256);
    //   const g = Math.floor(Math.random()*256);
    //   const b = Math.floor(Math.random()*256);
    //   const maxX = this.image.raster.width / 2;
    //   const maxY = this.image.raster.height / 2;
    //   let len = this.image.scale * 20
    //   let currentAnnotation;

    //   if (!haveChecked) {
    //     this.$Message.warning("请选中需复制标签")
    //     return
    //   };
    //   annotaitonList.forEach(item => {
    //     if(item.isCurrent) currentAnnotation = item
    //   });

    //   let res = currentAnnotation.export();
    //   res.tag_id = currentCategory.category.id
    //   res.category_id = currentCategory.category.id
    //   res.id = parseInt("-" + String(currentCategory.category.id) + String(annotationId + 1));
    //   res.color = '#'+r.toString(16).padStart(2,'0')+g.toString(16).padStart(2,'0')+b.toString(16).padStart(2,'0');

    //   // 获取坐标集合中绝对值最大的X或Y坐标
    //   const getMaxCoordinate = (idx) => {
    //     return Math.max(...res.compoundPath[1].children.map(item => item[1].segments.map(i => Math.abs(i[idx]))).flat())
    //   }
    //   const segmentsListMaxX = getMaxCoordinate(0) // X轴最大值
    //   const segmentsListMaxY = getMaxCoordinate(1) // Y轴最大值
    //   const isBeyondXlimit = segmentsListMaxX + len >= maxX
    //   const isBeyondYlimit = segmentsListMaxY + len >= maxY
    //   // 偏移时存在几种边界情况：
    //   if (isBeyondXlimit && isBeyondYlimit) {
    //     // X轴Y轴都越界(不移动了)
    //     len = 0
    //   } else if (isBeyondXlimit) {
    //     // X轴越界（取X轴最小能动距离）
    //     len = maxX - segmentsListMaxX
    //   } else if(isBeyondYlimit) {
    //     // Y轴越界（取Y轴最小能动距离）
    //     len = maxY - segmentsListMaxY
    //   }
    //   res.compoundPath[1].children = res.compoundPath[1].children.map( item => item[1].segments.map(i => [i[0] + len, i[1] + len]))
    //   res.paper_object = res.compoundPath
    //   res.borderAllPoints = []
    //   res.undoable = false
    //   this.categories[this.current.category].annotations.push(res);
    // },
    // // 用于箭头快捷键
    // incrementCategory() {
    //   if (this.current.category >= this.categories.length - 1) {
    //     this.current.category = -1;
    //   } else {
    //     this.current.category += 1;
    //     if (this.currentKeypoint) {
    //       this.currentAnnotation.onAnnotationKeypointClick(this.current.keypoint);
    //     }
    //   }
    // },
    // 此方法没有被用到,未启用
    // subtractCurrentAnnotation(compound, simplify = true, undoable = true) {
    //   if (this.currentCategory == null) return;
    //   this.currentAnnotation.subtract(compound, simplify, undoable);
    // },

    // // 用于箭头快捷键
    // decrementCategory() {
    //   if (this.current.category === -1) {
    //     this.current.category = this.categories.length - 1;
    //     let annotationCount = this.currentCategory.category.annotations.length;
    //     if (annotationCount > 0) {
    //       this.current.annotation = annotationCount - 1;
    //     }
    //   } else {
    //     this.current.category -= 1;
    //   }
    // },
    // // 用于箭头快捷键
    // incrementAnnotation() {
    //   let annotationCount = this.currentCategory.category.annotations.length;
    //   if (this.current.annotation === annotationCount - 1) {
    //     this.incrementCategory();
    //     this.current.annotation = -1;
    //   } else {
    //     this.current.annotation += 1;
    //     if (this.currentAnnotation != null && this.currentAnnotation.showKeypoints) {
    //       this.current.keypoint = 0;
    //       this.currentAnnotation.onAnnotationKeypointClick(this.current.keypoint);
    //     } else {
    //       this.current.keypoint = -1;
    //     }
    //   }
    // },
    // // 用于箭头快捷键
    // decrementAnnotation() {
    //   let annotationCount = this.currentCategory.category.annotations.length;
    //   if (this.current.annotation === -1) {
    //     this.current.annotation = annotationCount - 1;
    //   } else if (this.current.annotation === 0) {
    //     this.decrementCategory();
    //   } else {
    //     this.current.annotation -= 1;
    //     if (this.currentAnnotation != null && this.currentAnnotation.showKeypoints) {
    //       this.current.keypoint = this.currentAnnotation.keypointLabels.length - 1;
    //       this.currentAnnotation.onAnnotationKeypointClick(this.current.keypoint);
    //     } else {
    //       this.current.keypoint = -1;
    //     }
    //   }
    // },
    // // 用于箭头快捷键
    // incrementKeypoint() {
    //   let keypointCount = this.currentAnnotation.keypointLabels.length;
    //   if (this.current.keypoint === keypointCount - 1) {
    //     this.incrementAnnotation();
    //   } else {
    //     this.current.keypoint += 1;
    //   }
    //   if (this.currentKeypoint != null) {
    //     this.currentAnnotation.onAnnotationKeypointClick(this.current.keypoint);
    //     // this.currentAnnotation.$emit("keypoint-click", this.current.keypoint);
    //   }
    // },
    // // 用于箭头快捷键
    // decrementKeypoint() {
    //   if (this.current.keypoint === 0) {
    //     this.decrementAnnotation();
    //   } else {
    //     this.current.keypoint -= 1;
    //   }
    //   if (this.currentKeypoint != null) {
    //     this.currentAnnotation.onAnnotationKeypointClick(this.current.keypoint);
    //     // this.currentAnnotation.$emit("keypoint-click", this.current.keypoint);
    //   }
    // },
    // // 快捷键-右箭头, 显示或隐藏某个标注框
    // stepIn() {
    //   if (this.currentCategory != null) {
    //     if (!this.currentCategory.isVisible) {
    //       this.currentCategory.isVisible = true;
    //       this.current.annotation = 0;
    //       this.currentAnnotation.showKeypoints = false;
    //       this.current.keypoint = -1;
    //     } else if (
    //         !this.currentCategory.showAnnotations &&
    //         this.currentAnnotationLength > 0
    //     ) {
    //       this.currentCategory.showAnnotations = true;
    //       this.current.annotation = 0;
    //       this.currentAnnotation.showKeypoints = false;
    //       this.current.keypoint = -1;
    //     } else if (
    //         !this.currentAnnotation.showKeypoints &&
    //         this.currentAnnotation.keypointLabels.length > 0
    //     ) {
    //       this.currentAnnotation.showKeypoints = true;
    //       this.current.keypoint = 0;
    //       this.currentAnnotation.onAnnotationKeypointClick(this.current.keypoint);
    //     }
    //   }
    // },
    // // 快捷键-左箭头, 显示或隐藏某个标注框
    // stepOut() {
    //   if (this.currentCategory != null) {
    //     if (
    //         this.currentAnnotation != null &&
    //         this.currentAnnotation.showKeypoints
    //     ) {
    //       this.currentAnnotation.showKeypoints = false;
    //       this.current.keypoint = -1;
    //     } else if (this.currentCategory.showAnnotations) {
    //       this.currentCategory.showAnnotations = false;
    //       this.current.annotation = -1;
    //     } else if (this.currentCategory.isVisible) {
    //       this.currentCategory.isVisible = false;
    //     }
    //   }
    // },
    // 快捷键 - 1到10的 标签选择
    categoryIndexClick(categoryIndex) {
      this.onCategoryClick({
        annotation: -1,
        category: categoryIndex,
        keypoint: -1 }
      )
    },
    scrollElement(element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center'
      })
    },
    // 显示所有标注框
    showAll() {
      this.showAllAnnotations = true
      if (this.$refs.category == null) return

      this.$refs.category.forEach(category => {
        category.isVisible = category.category.annotations.length > 0
      })
    },
    // 隐藏所有标注框
    hideAll() {
      this.showAllAnnotations = false
      if (this.$refs.category == null) return

      this.$refs.category.forEach(category => {
        category.isVisible = false
        category.showAnnotations = false
      })
    },
    // 根据名称查找类别
    findCategoryByName(categoryName) {
      const categoryComponent = this.$refs.category.find(
        category =>
          category.category.name.toLowerCase() === categoryName.toLowerCase()
      )
      if (!categoryComponent) return null
      return categoryComponent.category
    },
    // AnnotateButton的方法, 未启用
    addAnnotation(categoryName, segments, keypoints, isbbox = false) {
      // // console.warn("addAnnotation")
      segments = segments || []
      keypoints = keypoints || []

      if (keypoints.length == 0 && segments.length == 0) return

      const category = this.findCategoryByName(categoryName)
      if (category == null) return

      Annotations.create({
        image_id: this.image.id,
        category_id: category.id,
        segmentation: segments,
        keypoints: keypoints,
        isbbox: isbbox
      }).then(response => {
        const annotation = response.data
        category.annotations.push(annotation)
      })
    },
    // 给框更改类别
    updateAnnotationCategory(annotation, oldCategory, newCategoryName) {
      const newCategory = this.findCategoryByName(newCategoryName)
      if (!newCategory || !annotation) return
      const newAnnotation = {
        ...annotation,
        metadata: {},
        category_id: newCategory.id
      }

      if (newAnnotation) {
        oldCategory.annotations = oldCategory.annotations.filter(
          a => a.id !== annotation.id
        )
        newCategory.annotations.push(newAnnotation)
      }
    },

    auditAnnotationIsConfirmed(annotation) {
      const id = annotation.id
      // 如果在id在勾选列表, 返回true
      if (this.auditAnnotationChecked.indexOf(id) !== -1) {
        return 'OK'
      }
      if (annotation.is_auto_selected) {
        return 'LOST'
      }
      // return "WAIT"
      return 'LOST'
    },

    rmAuditCheckItem(annotation_id) {
      this.auditAnnotationChecked = this.auditAnnotationChecked.filter(item => item !== annotation_id)
    },

    onAuditAnnotationStatusChangeshow(annotation_component_obj) {
      const annotation_id = annotation_component_obj.annotation.id
      if (this.auditAnnotationChecked.indexOf(annotation_id) === -1) {
        this.auditAnnotationChecked.push(annotation_id)
        annotation_component_obj.setAuditBackgroundColor(true)
        annotation_component_obj.isVisible = true
        annotation_component_obj.compoundPath.fullySelected = true
      } else {
        this.auditAnnotationChecked = this.auditAnnotationChecked.filter(item => item !== annotation_id)
        annotation_component_obj.setAuditBackgroundColor(false)
        annotation_component_obj.isVisible = false
        annotation_component_obj.compoundPath.fullySelected = false
        this.current.annotation = -1
      }
    },

    // 点击标注框, 维护审核人员选择状态
    onAuditAnnotationStatusChange(annotation_component_obj, msg = true, changeSnapshotFlag) {
      if (this.currentShowType == 'person') {
        this.onLabelClick()
      } else {
        const annotation_id = annotation_component_obj.annotation.id
        if (this.auditAnnotationChecked.indexOf(annotation_id) === -1) {
          if (msg) { this.$Message.success('已选择') }
          this.auditAnnotationChecked.push(annotation_id)
          annotation_component_obj.setAuditBackgroundColor(true)
          annotation_component_obj.isVisible = true
          annotation_component_obj.compoundPath.fullySelected = true
        } else {
          if (msg) { this.$Message.info('已取消选择') }
          if (!changeSnapshotFlag) {
            this.auditAnnotationChecked = this.auditAnnotationChecked.filter(item => item !== annotation_id)
            annotation_component_obj.setAuditBackgroundColor(false)
            annotation_component_obj.isVisible = false
            annotation_component_obj.compoundPath.fullySelected = false
            this.current.annotation = -1
          } else {
            this.auditAnnotationChecked.push(annotation_id)
          }
        }
      }
    },
    async getTaskDetail() {
      this.task_detail = await this.$axios.getTask(this.task_id)
      // // console.log('annotate<>>>>>>', this.task_detail)
      if (this.task_detail.project_member_type == 'MANAGER' && this.task_detail.status == 'DOING' && this.task_detail.type != 'REJECT') {
        this.projctLader = true
      }
    },

    isInnerPath(newCompound) {
      const intersectPathAreaList = []
      if (newCompound.children && newCompound.children.length > 1) {
        const len = newCompound.children.length
        for (let idx = 0; idx < len; idx++) {
          const path = newCompound.children[idx]
          if (path.area <= 0) {
            intersectPathAreaList.push(path.id)
          }
        }
        return newCompound.children.filter(path => intersectPathAreaList.indexOf(path.id) == -1)
      }
      return [newCompound]
    },
    resetAnnotationBorderPixels(moveObject) {
      // // console.log('moveObject: ', moveObject);
      this.$refs.category.forEach(category => {
        category.$refs.annotation && category.$refs.annotation.forEach((annotation, index) => {
          if (annotation.annotation.id == moveObject.data.annotationId) {
            //  moveObject.children.map((item, idx) => {
            //   annotation.addPixelPath(item.segments, item, idx === moveObject.children.length - 1)
            // })
            annotation.excludeCompoundPath.children = annotation.isInnerPath(moveObject)
            // annotation.addPixelPathPre(annotation.excludeCompoundPath)
          }
        })
      })
    }
  },
  watch: {
    currentAnnotation(newElement) {
      if (newElement != null) {
        if (newElement.showAnnotations) {
          const element = newElement.$el
          this.scrollElement(element)
        }
      }
    },
    // 根据下标激活目标paperScope
    activePaperScope() {
      // 打点
      this.clearBBoxGuide()
      this.$Message.info(`切换至${this.activePaperScope}通道!!!!!!!`)
      if (this.activePaperScope === 1) {
        this.paper.tool = null
        this.paper.tools = []
        this.paperSec.activate()
      } else {
        this.paperSec.tool = null
        this.paperSec.tools = []
        this.paper.activate()
      }
      this.reloadToolsDom()
    },
    // dividing=====
    // dividing=====
    // dividing=====

    undoList(val) {
      val > 0 && this.changeSnapshot()
    },
    doneLoading(done) {
      if (done) {
        if (this.loading.loader) {
          this.loading.loader.hide()
        }
      }
    },
    currentCategory() {
      if (this.currentCategory != null) {
        if (
          this.currentAnnotation == null ||
            !this.currentCategory.showAnnotations
        ) {
          const element = this.currentCategory.$el
          this.scrollElement(element)
        }
      }
    },

    'current.category'(cc) {
      if (cc < -1) this.current.category = -1
      const max = this.categories.length
      if (cc > max) {
        this.current.category = -1
      }
    },
    'current.annotation'(ca) {
      if (ca < -1) this.current.annotation = -1
      if (this.currentCategory != null) {
        const max = this.currentAnnotationLength
        if (ca > max) {
          this.current.annotations = -1
        }
      }
    },
    'current.keypoint'(sk) {
      if (sk < -1) this.current.keypoint = -1
      if (this.currentCategory != null) {
        const max = this.currentAnnotationLength
        if (sk > max) {
          this.current.keypoint = -1
        }
      }
    },
    imageId(val) {
      this.reinit()
    },
    compareimageId() {
      return this.$route.params.compareimageId
    }
  },
  computed: {
    // currentActiveCategorys() {
    //   const target = this.picViewsList.filter((pic) => pic.title === this.activePaperScope)[0]
    //   if (target) {
    //     return target.categories
    //   } else {
    //     return []
    //   }
    // },

    undoList() {
      return this.$store.state.undo.length
    },
    // 任务ID
    task_id() {
      return this.$route.params.taskId
    },
    // 当前图片ID
    imageId() {
      if (this.$route.params.imageId) {
        return this.$route.params.imageId
      }
      return this.firstImageId
    },
    // 任务的第一张图片ID
    firstImageId() {
      if (this.task_detail) {
        let currentImgId = sessionStorage.getItem('currentImgId')
        if (currentImgId) {
          currentImgId = JSON.parse(currentImgId)
        }
        return currentImgId || this.task_detail.first_label_image_id
      }
    },
    userProfile() {
      return readUserProfile(this.$store) || { roles: [] }
    },
    operation_tip() {
      if (this.current.category === -1) {
        return '请先在右侧选择标签'
      }

      if (this.activeTool === '选择工具') {
        return '请选择标注工具进行标注'
      }
      if (!this.currentAnnotation) {
        return '您可以在上方配置标注工具的属性，然后在图片上进行标注'
      }
      if (!this.isSave) {
        if (this.$parent.isCurrentImageLast) {
          return '标注完成后，请提交标注（S）'
        } else {
          return '标注完成后，请保存标注（S），或使用（→）键保存并跳转下一张标注'
        }
      }
      if (this.$parent.isCurrentImageLast) {
        return '标注完成'
      }
      if (!this.showImageList) {
        return '标注完成'
      }
      return '标注完成，可使用（→）键跳转下一张标注'
    },
    doneLoading() {
      return !this.loading.image && !this.loading.data
    },
    currentAnnotationLength() {
      if (this.currentCategory == null) return null
      return this.currentCategory.category.annotations.length
    },
    currentKeypointLength() {
      if (this.currentAnnotation == null) return null
      return this.currentAnnotation.annotation.keypoints.length
    },
    // 获取当前的类别
    currentCategory() {
      return this.getCategory(this.current.category)
    },
    currentAnnotation() {
      if (this.currentCategory == null) {
        return null
      }
      return this.currentCategory.getAnnotation(this.current.annotation)
    },
    currentKeypoint() {
      if (this.currentCategory == null) {
        return null
      }
      if (this.currentAnnotation == null ||
          this.currentAnnotation.keypointLabels.length === 0 ||
          !this.currentAnnotation.showKeypoints) {
        return null
      }
      if (this.current.keypoint == -1) {
        return null
      }
      return {
        label: [String(this.current.keypoint + 1)],
        visibility: this.currentAnnotation.getKeypointVisibility(this.current.keypoint)
      }
    },
    user() {
      return this.$store.getters['user/user']
    },
    interface_url() {
      if (this.task_id) {
        // 任务维度 || 单张
        // return `/api/v1/label/${this.task_id}/${this.picViewsList[0].id}?is_auditing=false`
        return `/api/v1/label/${this.task_id}/${this.image.id}?is_auditing=false`
      }
    },
    interface_url_sec() {
      if (this.task_id) {
        // 任务维度 || 单张
        return `/api/v1/label/${this.task_id}/${this.imageSec.id}?is_auditing=false`
      }
    }
  },
  beforeRouteLeave(to, from, next) {
    this.current.annotation = -1
    next()
  },
  async mounted() {
    if (this.task_id) await this.getTaskDetail()
    this.setDataset(null)
    this.reinit()
  },
  created() {
    console.warn('annotate--created！！！')
    this.paper = new paper.PaperScope()
    this.paperSec = new paper.PaperScope()
    this.initSomeVariables()
    this.initGradientColor()
  },
  beforeDestroy() {
    !this.submitFlag && this.$route.name !== 'detection-mask' && this.save()
    if (this._erd_frame) {
      this._erd_listener && this.$erd.removeListener(this._erd_frame, this._erd_listener)
      this._erd_frame = null
    }
    this.resetUndo()
    this.text && (this.text.topLeft = this.text.topRight = null)
    if (this.paper) {
      this.paper.remove()
    }
    this.paper = null
    if (this.paperSec) {
      this.paperSec.remove()
    }
    this.paperSec = null
    window.View && typeof window.View._resetState === 'function' && window.View._resetState()
    sessionStorage.removeItem('currentImgId')
    this.clearImage()
  }

}
</script>

<style lang="scss" scoped>
.show-tag-type {
    justify-content: space-around;
}
.type-tag-active {
  background: $themeColor;
  color: #ffffff
}
.fa {
  font-size: 18px !important;
}

.tool-conf-bar {
  background-color: #fff;
  height: 45px;
  position: absolute;
  top: 56px;
  left: 75px;
  right: 320px;
  border-bottom: 1px solid rgba(0,0,0,.1);
  z-index: 12;
  display: flex;
  justify-content: space-between;
}

.alert {
  bottom: 0;
  width: 50%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

/* width */
::-webkit-scrollbar {
  width: 7px;
}

/* Track */
::-webkit-scrollbar-track {
  /*box-shadow: inset 0 0 5px grey;*/
  border-radius: 10px;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: white;
  border-radius: 10px;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: #9feeb0;
}

.left-panel {
  background-color: #fff;
  line-height: 43px;
  width: 75px;
  padding-top: 54px;
  float: left;
  height: calc(100% + 150px);
  text-align: center;
  border-right: 1px solid rgba(0,0,0,.1);
}

.right-panel {
  padding-top: 57px;
  background-color: #fff;
  width: 320px;
  height: calc(100% + 150px);
  float: right;
  border-left: 1px solid rgba(0,0,0,.1);

  .title-bar {
    width: 100%;
    height: 43px;
    /*background-color: rgba(117, 146, 254, 0.3);*/
    background-color: rgba(128, 128,128, 0.3);
    /*background-color: #808080;*/
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px;
    font-weight: 700;
    /*color: rgb(109, 109, 246);*/
    color: black;
    /*margin-bottom: 5px;*/
  }
}
.pictureChannel-container {
  padding-top: 150px;
  height: calc(100vh - 5px);
  .center-panel {
    width: 49%;
    height: 100%;
    position: relative;
    .canvas-st {
      height: 100%;
      width: 100%;
      border: 3px solid rgb(167, 162, 162);
      border-radius: 5px;
    }
    .activePaperScope-st {
      border: 3px solid rgb(89, 195, 225);
    }
    .button-slot {
      width:50px;
      height:30px;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      margin: 0 auto;
    }
  }
}

.active_btn
{
  background: $themeColor;
}
// 屏蔽层
.shield-st {
    position: absolute;
    top: 100px;
    left: 75px;
    width: calc(100vw - 320px - 75px );
    height: calc(100vh - 100px - 150px);
}

#image {
  position: absolute;
}

.sidebar-section {
  width: 100%;
  padding-left: 5px;
  padding-right: 5px;
  overflow: auto;
}

.sidebar-title {
  color: black;
  width: 100px;
  padding-left: 20px;
}

/* Tool section */
.tool-section {
  margin-left: 10px;
  margin-right: 10px;
  font-size: 0.9em;
  color: #5a5a5a;
}

/* Categories/Annotations section */
.meta-input {
  padding: 3px;
  background-color: inherit;
  width: 100%;
  height: 100%;
  border: none;
}

.meta-item {
  background-color: inherit;
  height: 30px;
  border: none;
}

.status-icon {
  font-size: 150px;
  color: white;
  position: absolute;
  left: calc(50% - 75px);
  top: calc(50% - 75px);
}

.search {
  width: 100%;
  height: 18px;
  color: white;
  background-color: rgba(255, 255, 255, 0.1);
  border: none;
  text-align: center;
  border-radius: 4px;
}
.audit_active {
  border-color: blue !important;
}
.category-container{
  overflow: scroll;
  padding: 0 0 30px 0;
}
.operation_tip {
  background-color: rgba(246, 115, 30, 0.5);
  position: absolute;
  height: 44px;
  left: 75px;
  right: 320px;
  top: 100px;
  color: white;
  font-size: 20px;
}
.detectionConfig {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 319px;
  background-color: white
}

.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
      }
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}

.demo-spin-icon-load{
    animation: ani-demo-spin 1s linear infinite;
}
@keyframes ani-demo-spin {
    from {
      transform: rotate(0deg);
      }
    50%  { transform: rotate(180deg);}
    to   { transform: rotate(360deg);}
}

.showTan
{
  width: 100px;
  height: 100px;
  border:1px solid red;
  background: red;
  position: relative;
  top:45%;
  z-index: 1;
}

.add_label
{
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-top: 15px;
}
</style>
