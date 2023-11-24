<!--
 * @Author: hhvcg 719713496@qq.com
 * @Date: 2023-10-10 15:38:20
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description: 
 * 
-->

<template>
  <div style="display: block; height: inherit;" class="annotate-st">
    <div class="tool-conf-bar" @mousemove="(e) => e.stopPropagation()">
      <!--      当前画笔的设置选项(根据每个画笔自动展示当前配置)-->
      <div class="flex-cc">
        <div class="sidebar-title">{{ activeTool }}</div>
        <Divider type="vertical"/>
        <div class="tool-section">
          <div v-if="$refs.bbox != null">
            <BBoxPanel :bbox="$refs.bbox" />
          </div>
          <div v-if="$refs.select != null">
            <SelectPanel :select="$refs.select" />
          </div>
        </div>
      </div>
    </div>
<!--    左侧工具条区域-->
    <aside
      class="left-panel">
      <div>
<!-- 拖动组件(小手)-->
      <SelectTool
        ref="select"
        v-model="activeTool"
        @setcursor="setCursor"
      />
      <hr />
      <BBoxTool
        ref="bbox"
        v-model="activeTool"
        @setcursor="setCursor"
        @addPath="addPath"
      />
      <!-- <LinePoly
          v-model="activeTool"
          :scale="scale"
          @setcursor="setCursor"
          ref="linepoly"
      ></LinePoly>
      <MeasureTool
        v-model="activeTool"
        @setcursor="setCursor"
        ref="measure"
      /> -->
      </div>
      <!-- <hr />
      <CenterButton
        ref="center_tool"
      />
      <hr />
      <SettingsButton
        ref="settings"
      /> -->
    </aside>
<!--    右侧类别标注区域-->
    <aside class="right-panel">
      <div class="title-bar cursor-pointer" @click="showTaskDetails=!showTaskDetails">
        <span>详细信息</span>
        <div style="font-size: 25px;">
          <Icon v-show="!showTaskDetails" class="cursor-pointer" type="ios-arrow-down" />
          <Icon v-show="showTaskDetails" class="cursor-pointer" type="ios-arrow-up" />
        </div>
      </div>
      <div v-show="showTaskDetails" style="padding: 10px 0">
        <task-card view="info" :item="taskDetail">
          <div slot="content">
            <div class="task-details-row flex-ac">
                <div class="label flex-ac">图片名称</div>
                <div class="value flex-ac image-name">
                  0000-0002_0034.png
                    <!-- <my-ellipsis :text="picViewsList[0].info.imgname" fontSize="13px" tooltip></my-ellipsis> -->
                </div>
            </div>
            <div class="task-details-row flex-ac">
                <div class="label flex-ac">图片尺寸</div>
                1024 * 1024
                <!-- <div class="value flex-ac">{{ picViewsList[0].info.imgwidth }} * {{picViewsList[0].info.imgheight}}</div> -->
            </div>
            <div class="task-details-row flex-ac">
                <div class="label flex-ac">图片序号</div>
                测试
                <!-- <div class="value flex-ac">{{ picViewsList[0].info.imgindex }}</div> -->
            </div>
          </div>
        </task-card>
      </div>
      <div class="title-bar">
        <span>标注标签</span>
      </div>
      <div style="width: 100%;text-align: center;color: grey; margin: 15px 0;">
        <span>根据图片内容，选择唯一标签</span>
      </div>
      <div
        class="category-container"
        :style="{'max-height': calcHeight()}"
      >
        <div v-if="imageData.length">
          <Category
            ref="category"
            v-for="(item, index) in imageData[0].categories"
            :key="index"
            :category="item"
            :currentCategory="currentCategory"
            :currentAnnotation="currentAnnotation"
            :shapeOpacity="shapeOpacity"
            @click="handleCategoryClickEvent"
          />
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
            <span style="width: 35px;">{{ shapeOpacity }}</span>
            <Slider show-tip="never" style="width: 100%" v-model="shapeOpacity" :min="0" :max="0.5" :step="0.05"></Slider>
          </div>
        </div>
      </div>
    </aside>
    <!--    操作提示符--> 
    <div class="operation_tip flex-cc" @mousemove="(e) => e.stopPropagation()">
      {{ operation_tip }}
    </div>
<!--    图片操作主区域-->
    <div class="pictureChannel-container flex-ca">
      <Spin v-if="annotateLoading" fix size="large" style="background-color: rgba(255, 255, 255,0)!important">
        <Icon type="ios-loading" size=24 class="demo-spin-icon-load"></Icon>
        <div>加载中</div>
      </Spin>
      <template
        v-else
      >
        <div
          v-for="(picChannel, index) in imageData"
          :key="index"
          :class="['center-panel', activePaperScope === index? 'activePaperScope-st': '']"
          :style="{ cursor: cursor, width: widthAuto, height: heightAuto }"
        >
          <picChannel
            :picInfo="picChannel"
            @handleChangePaperScope="handleChangePaperScope"
          />
        </div>
      </template>
    </div>
    <el-dialog
      title="选择通道"
      :visible.sync="channelModalFlag"
      :close-on-click-modal="false"
      :show-close="false"
      width="30%"
      >
      <el-checkbox-group v-model="channelSelected">
        <el-checkbox
          v-for="(channel, index) in imageData"
          :key="index"
          :label="channel.key">{{ channel.title }}</el-checkbox>
      </el-checkbox-group>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="confirmChannels">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import "@/assets/tagsStyle.css";
// import "@/assets/tooltip.css";
// import "vue-toastr-2/dist/vue-toastr-2.min.css";
// import "vue-loading-overlay/dist/vue-loading.css";
import paper from "paper"
import axios from '@/plugins/request'
import PicChannel from "./components/PicChannel.vue"
import SelectTool from "./components/brushes/SelectTool"
import BBoxTool from "./components/brushes/BBoxTool"
import SelectPanel from "./components/panels/SelectPanel"
import BBoxPanel from "./components/panels/BBoxPanel"
import { killItem, addTargetLayerItemJson } from '@/utils/paperWeaponTS.ts'
import taskCard from "@/pages/tasks/component/taskCard"

// import MeasureTool from "./components/MeasureTool";
// import LinePoly from "./components/LinePoly";
// import LinepPannel from "./components/LinepPannel";
// import CenterButton from "./components/CenterButton";
import Category from "./components/Category.vue"
// import SettingsButton from "./components/SettingsButton";

export default {
  name: "annotate",
  components: { Category, taskCard,PicChannel,SelectTool,SelectPanel,BBoxPanel,BBoxTool,
    // SettingsButton,
    // LinepPannel,
    // LinePoly,
    // CenterButton,
    // MeasureTool,
    // Category,
    // MyEllipsis,
  },
  props: {
    imageData: {
      type: Array,
      required: true
    },
    taskDetail: {
      type: Object,
      required: true
    },

  },
  data() {
    return {
      currentAnnotation: null,
      currentCategory: null,
      shapeOpacity: 0.5,
      showAnnotatorConfig: true,
      showTaskDetails: false,
      channelSelected: [0,1],
      channelModalFlag: false,
      cursor: "pointer",
      operation_tip: '请先在右侧选择标签',
      activeTool: "选择工具",
      activePaperScope: 0,
      annotateLoading: false,
    }
  },
  methods: {
    handleCategoryClickEvent(info) {
      switch (info.type) {
        case 'clickCategory':
          this.onCategoryClick(info.data)
          break
        case 'clickAnnotation':
          this.onAnnotationClick(info.data)
          break
      }
    },
    onCategoryClick(category) {
      this.currentCategory = category
    },
    onAnnotationClick(annotation) {
      this.currentAnnotation = annotation
    },
    calcHeight(){
      const container = window.document.getElementById('app')
      if(container){
        let other_height = 230
        if(this.showTaskDetails) other_height += 160
        return String(container.clientHeight - other_height) + "px"
      }
      return '500px'
    },
    confirmChannels() {
      killItem(this.newPathInfo.path)
      // 向目标category中新增绘制的annotation
      const targetCateRef = this.$refs['category'].filter((item) => item.isCurrent === true)[0]
      const newAnnotations = this.channelSelected.map((selectedChannel) => {
        return {
          channelKey: selectedChannel,
          paper_object: this.newPathInfo.json,
          color: this.newPathInfo.color
        }
      })
      targetCateRef.addNewAnnotations(newAnnotations)
      this.channelSelected = [0,1]
      this.channelModalFlag = false
    },
    addPath(data) {
      this.newPathInfo = data
      this.channelModalFlag = true
    },
    save() {

    },
    setCursor(newCursor) {
      this.cursor = newCursor
    },
    handleChangePaperScope(info) {
      if (info.type === 'changeActivateScope') {
        this.activePaperScope = info.data.key
      }
    },
  },
  watch: {

  },
  computed: {
    heightAuto() {
      const num = this.imageData.length 
      if ([0, 1, 2].includes(num)) {
        return '100%'
      } else if ([3,4].includes(num)){
        return '50%'
      }
    },
    widthAuto() {
      const num = this.imageData.length 
      if ([0, 1].includes(num)) {
        return '100%'
      } else if ([2, 3, 4].includes(num)){
        return '50%'
      }
    }
  },
  beforeRouteLeave(to, from, next) {

  },
  async mounted() {
  },
  created() {
    this.paper = paper
  },
  beforeDestroy() {

  },

}
</script>

<style lang="scss" scoped>
.annotate-st {
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
    position: relative;
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
    .category-container{
      overflow: scroll;
      padding: 0 0 30px 0;
    }
    .detectionConfig {
      position: absolute;
      right: 0;
      bottom: 0;
      width: 319px;
      background-color: white
    }
  }
  .pictureChannel-container {
    padding-top: 150px;
    height: calc(100vh - 6px);
    flex-flow: row wrap;
    .center-panel {
      width: 50%;
      height: 100%;
      position: relative;
      .canvas-st {
        height: 100%;
        width: 100%;
        border: 3px solid rgb(167, 162, 162);
        border-radius: 5px;
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
    .activePaperScope-st {
      border: 2px solid red;
      border-radius: 5px;
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


</style>
