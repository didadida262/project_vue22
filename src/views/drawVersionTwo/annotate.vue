<!--
 * @Author: Hhvcg
 * @Date: 2023-02-06 19:08:24
 * @LastEditors: -_-
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
        <div style="line-height: 45px; margin-right: 10px">
           <!-- <Button v-if="!!this.mask_png" :type="showMaskPng ? 'primary': 'default'" @click="changeShowMaskPng">查看像素</Button> -->
          <Button
            v-if="!!task_detail && task_detail.mark_pattern === 'COMPARE_PATTERN'"
           class="mgl5"
           @mouseup.native="hideCompare"
           @mouseleave.native="hideCompare"
           @mousedown.native="showCompare">查看对比图</Button>
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
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="bbox"
        />
<!--多边形组件-->
        <PolygonTool
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="polygon"
        />
<!--魔法工具-->
        <MagicWandTool
            v-show="false"
            v-model="activeTool"
            :width="image.raster_width"
            :height="image.raster_height"
            :image-data="image.data"
            @setcursor="setCursor"
            ref="magicwand"
        />
<!--圆形笔刷(多边形范畴)-->
        <!-- <BrushTool
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="brush"
        /> -->
<!-- 二代笔刷 -->
         <BrushToolNew
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="brush"
        />

<!--画线工具-->
          <LineTool
              v-model="activeTool"
              :scale="image.scale"
              @setcursor="setCursor"
              ref="line"
          ></LineTool>

<!--        橡皮擦(可以局部清除任何类型画框)-->
        <EraserTool
            v-model="activeTool"
            :scale="image.scale"
            @setcursor="setCursor"
            ref="eraser"
        />
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
          :metadata="image.metadata"
          :commands="commands"
          ref="settings"
      />
    </aside>

<!--    右侧类别标注区域-->
    <aside v-show="panels.show.right" class="right-panel">
      <div
        v-if="activePaperScope === 'Surface'"
       class="category-item-st">
        <span class="btext">{{ this.activePaperScope }}</span>
        <div :style="{'border-bottom': showTaskDetails ? '' : '1px solid #bebebe'}" v-show="!sampled_id">
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
                  </div>
              </task-card>
          </div>
        </div>
        <div>
          <div class="title-bar">
            <span>标注标签</span>
          </div>
          <!-- <div class="flex-ac show-tag-type mgt10" v-show="this.$parent.type == 'audit'">
              <span style="font-weight:700;color:#000;font-size:15px">展示维度</span>
              <Button :class="[currentShowType == 'label' ? 'type-tag-active' : '']" @click="onLabelClick">标注标签</Button>
              <Button :class="[currentShowType == 'label' ? '' : 'type-tag-active']" @click="onPersonClick">标注人员</Button>
          </div>

          <div class="add_label" style="padding:0 10px" v-show="this.projctLader">
            <Input v-model="addLabel" placeholder="标签ID" size="small" clearable></Input>
            <Input v-model="addLaname" class="mglr10" placeholder="标签名称" size="small" clearable></Input>
            <Button size="small" type="primary" @click="createTagLabel" style="font-size:12px">添加</Button>
          </div> -->
          <div style="width: 100%;text-align: center;color: grey; margin: 15px 0;">
            <span>根据图片内容，选择唯一标签</span>
          </div>

          <div
              class="category-container"
              :style="{'max-height': this.calcHeight()}"
              v-show="mode == 'segment'"
          >
            <div v-if="currentShowType == 'label'">
              <Category
                v-for="(category, index) in picViewsList[0].categories"
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
            <div v-if="currentShowType != 'label'">
              <Category
                v-for="(category, index) in newCategories"
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
                ref="personCategories"
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
      <div
        v-if="activePaperScope === 'PL'"
       class="category-item-st">
       <span class="btext">{{ this.activePaperScope }}</span>
        <div :style="{'border-bottom': showTaskDetails ? '' : '1px solid #bebebe'}" v-show="!sampled_id">
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
                  </div>
              </task-card>
          </div>
        </div>
        <div>
          <div class="title-bar">
            <span>标注标签</span>
          </div>

          <!-- <div class="flex-ac show-tag-type mgt10" v-show="this.$parent.type == 'audit'">
              <span style="font-weight:700;color:#000;font-size:15px">展示维度</span>
              <Button :class="[currentShowType == 'label' ? 'type-tag-active' : '']" @click="onLabelClick">标注标签</Button>
              <Button :class="[currentShowType == 'label' ? '' : 'type-tag-active']" @click="onPersonClick">标注人员</Button>
          </div>

          <div class="add_label" style="padding:0 10px" v-show="this.projctLader">
            <Input v-model="addLabel" placeholder="标签ID" size="small" clearable></Input>
            <Input v-model="addLaname" class="mglr10" placeholder="标签名称" size="small" clearable></Input>
            <Button size="small" type="primary" @click="createTagLabel" style="font-size:12px">添加</Button>
          </div> -->

          <div style="width: 100%;text-align: center;color: grey; margin: 15px 0;">
            <span>根据图片内容，选择唯一标签</span>
          </div>

          <div
              class="category-container"
              :style="{'max-height': this.calcHeight()}"
              v-show="mode == 'segment'"
          >
            <div v-if="currentShowType == 'label'">
              <Category
                v-for="(category, index) in picViewsList[1].categories"
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
            <div v-if="currentShowType != 'label'">
              <Category
                v-for="(category, index) in newCategories"
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
                ref="personCategories"
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

    </aside>

<!--    图片操作主区域-->
    <div class="flex-ca">
      <div
       class="center-panel" :style="{ cursor: cursor }">
        <!-- <Spin fix size="large" style="background-color: rgba(255, 255, 255,0)!important"> -->
        <Spin v-if="loading.image" fix size="large" style="background-color: rgba(255, 255, 255,0)!important">
          <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
          <div>加载中</div>
        </Spin>
        <v-touch @pinch="onpinch" @pinchstart="onpinchstart">
          <div id="frame" @wheel="onwheel" :class="[showImageList ? 'frame' : 'frame-full', activePaperScope === 'Surface'? 'activePaperScope-st': '']">
            <canvas
              :style="{'filter': `brightness(${image.brightness}) contrast(${image.contrast})`}"
              class="canvas"
              id="editor"
              resize
              hidpi="off"
            />
            <!-- 注意：最新版paper.js默认hidpi="on"，但是在高清屏幕上会有尺寸异常，因此需要关闭此功能 -->
          </div>
        </v-touch>
        <div class="button-slot">
          <slot name="button"></slot>
        </div>
      </div>
      <div
       class="center-panel" :style="{ cursor: cursor }">
        <Spin v-if="loading.image" fix size="large" style="background-color: rgba(255, 255, 255,0)!important">
          <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
          <div>加载中</div>
        </Spin>
        <v-touch @pinch="onpinch" @pinchstart="onpinchstart">
          <div id="frameSec" @wheel="onwheel" :class="[showImageList ? 'frame' : 'frame-full', activePaperScope === 'PL'? 'activePaperScope-st': '']">
            <canvas
              :style="{'filter': `brightness(${image.brightness}) contrast(${image.contrast})`}"
              class="canvasSec"
              id="editorSec"
              resize
              hidpi="off"
            />
            <!-- 注意：最新版paper.js默认hidpi="on"，但是在高清屏幕上会有尺寸异常，因此需要关闭此功能 -->
          </div>
        </v-touch>
        <div class="button-slot">
          <slot name="button"></slot>
        </div>
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
import '@/assets/tagsStyle.css'
import '@/assets/tooltip.css'
import 'vue-toastr-2/dist/vue-toastr-2.min.css'
import 'vue-loading-overlay/dist/vue-loading.css'

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

  },
  props: {

  },
  data() {
    return {

    }
  },
  methods: {

  },
  beforeRouteLeave(to, from, next) {

  },
  async mounted() {

  },
  created() {

  },
  beforeDestroy() {

  }

}
</script>

<style lang="scss" scoped>
.show-tag-type {
    justify-content: space-around;
}
.type-tag-active {
  // background: $themeColor;
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

.active_btn
{
  // background: $themeColor;
}
// 屏蔽层
.shield-st {
    position: absolute;
    top: 100px;
    left: 75px;
    width: calc(100vw - 320px - 75px );
    height: calc(100vh - 100px - 150px);
}
.center-panel {
  display: block;
  overflow: hidden;
  position: relative;
  width: 49%;
  .frame {
    margin: 100px 0 0 0;
    height: calc(100vh - 100px - 150px);
  }
  .frame-full {
    margin: 150px 0 0 0;
    height: calc(100vh - 155px);
    border: 3px solid red;
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
