<template>
  <div
  class="annotation-st"
    :style="{'border': showBorder ? '2px solid rgb(64, 158, 255)' : ''}"
  >
  <!-- :style="{'background-color': hex2Rgb(color), 'border': showBorder ? '2px solid rgb(64, 158, 255)' : ''}" -->

  <!-- 标注页面标签 -->
    <li
      class="list-group-item btn btn-link btn-sm text-left"
      :style="{ 'background-color': backgroundColor, color: 'white'  }"
      @click.stop="onAnnotationClick"
    >
      <!--显示/隐藏 眼睛-->
      <div @click.stop="isVisible = !isVisible">
        <i
            v-if="isVisible"
            class="fa fa-eye annotation-icon"
            :style="{ float: 'left', 'padding-right': '10px', color: color }"
        />
        <i
            v-else
            class="fa fa-eye-slash annotation-icon"
            style="float: left; padding-right: 10px; color: gray"
        />
      </div>
      <!--标签信息-->
      <div
          class="btn btn-sm btn-link collapsed text-left annotation-text"
          :style="{
            float: 'left',
            color: isVisible ? '#1a1a1a' : 'gray'
          }"
          aria-expanded="false"
          :aria-controls="'collapse_keypoints' + annotation.id"
      >
        <span>{{ annotation.creator }}</span>
        <span style="color: #4e4e4e">{{isCurrent ? "(选中)" : ""}}</span>
      </div>

      <!--删除-->
      <i
          @click.stop="deleteAnnotation"
          class="fa fa-trash-o annotation-icon"
          style="float:right;color: grey"
      />
    </li>
  </div>
</template>

<script>
import paper from "paper";
import simplifyjs from "simplify-js";
// import { hex2Rgb } from '@/utils/detectionMore'
import { readUserProfile } from '@/store/main/getters'
import { addTargetLayerItemJson, killItem } from '@/utils/paperWeaponTS'
export default {
  name: "Annotation",
  components: {
  },
  props: {
    annotation: {
      type: Object,
      required: true
    },
    shapeOpacity: {
      type: Number,
      required: true
    },
    currentAnnotation: {
      type: Object
    }
  },
  data() {
    return {
      isVisible: true,
      color: this.annotation.color,
      showBorder: false,
      compoundPath: null
    }
  },
  created() {

  },
  methods: {
    showOrhiddenPath() {
      if (!this.compoundPath) return
      this.compoundPath.visible = this.isVisible
    },
    hex2Rgb(hex) { // 十六进制转为RGB
      var rgb = []; // 定义rgb数组
      if (/^\#[0-9A-F]{3}$/i.test(hex)) { // 判断传入是否为#三位十六进制数
        let sixHex = '#';
        hex.replace(/[0-9A-F]/ig, function(kw) {
          sixHex += kw + kw; // 把三位16进制数转化为六位
        });
        hex = sixHex; // 保存回hex
      }
      if (/^#[0-9A-F]{6}$/i.test(hex)) { // 判断传入是否为#六位十六进制数
        hex.replace(/[0-9A-F]{2}/ig, function(kw) {
          rgb.push(eval('0x' + kw)); // 十六进制转化为十进制并存如数组
        });
        return `rgba(${rgb.join(',')}, .3)`; // 输出RGB格式颜色
      } else {
        console.log(`Input ${hex} is wrong!`);
        return 'rgba(0,0,0, .3)';
      }
    },


    // 初始化标注
    initAnnotation() {
      this.$nextTick(() => {
        console.warn('initAnnotation', this.annotation)
        // 将后端数据绘制到目标通道上
        const targetProject = paper.projects.filter((pro) => pro.name === this.annotation.channelKey)[0]
        if (!targetProject) return
        this.compoundPath = addTargetLayerItemJson(targetProject, 'layerDefect',this.annotation.paper_object, 'get')
        this.compoundPath.opacity = this.shapeOpacity
      })
    },
    deleteAnnotation() {
      killItem(this.compoundPath)
      const info = {
        type: 'deleteAnnotation',
        data: this.annotation
      }
      this.$emit('handleAnnotationEvent', info)
    },
    onAnnotationClick() {
      console.log('this.annotation>>>',this.annotation)
      this.compoundPath.selected = true
      const info = {
        type: 'clickAnnotation',
        data: this.annotation
      }
      this.$emit('handleAnnotationEvent', info)
    },
    updatePathStatus() {
      if (!this.compoundPath) return
      this.compoundPath.selected = this.isCurrent
    },
    // destroyComponent() {
    //   this.$destroy()
    // }
  },
  watch: {
    isVisible() {
      this.showOrhiddenPath()
    },
    currentAnnotation() {
      this.updatePathStatus()
    },
    shapeOpacity() {
      if (!this.compoundPath) return
      this.compoundPath.opacity = this.shapeOpacity
    }
   
  },
  computed: {
    isCurrent() {
      if (JSON.stringify(this.annotation) === JSON.stringify(this.currentAnnotation)) return true
      return false;
    },
    userProfile() {
      return readUserProfile(this.$store) || { roles: [] }
    },
    backgroundColor() {
      // if (this.isHover && this.$parent.isHover) return "#646c82";
      // if (this.isCurrent) return "rgba(64,158,255, 0.8)";
      return this.hex2Rgb(this.color)
      
    },
  },
 
  mounted() {
    this.initAnnotation()
  },
  beforeDestroy() {
  }
};
</script>

<style lang="less" scoped>
.annotation-st {
  .list-group-item {
    height: 30px;
    font-size: 13px;
    padding: 2px;
    // background-color: #4b5162;
    border-radius: 0;
  }
  .annotation-icon {
    margin: 0;
    padding: 3px;
  }
  .annotation-text {
    padding: 0;
    margin: 0;
  }
}
</style>