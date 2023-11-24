<template>
  <div
    class="card cursor-pointer categoryItem-st"
    @click="onClick"
    :style="{
      'border-color': borderColor
    }"
    >
    <div class="card-header">
      <div class="flex-ac flex-jb" :style="{'background-color': hex2Rgb(color)}">
        <div :style="{'background-color': color}" class="flex-cc category-index">
          <span>{{category.index + 1}}</span>
        </div>

        <div class="flex"  style="font-size: 18px;">
          <Ellipsis tooltip	placement="bottom" :text="category.name" :length="7" />
          <span>{{`(${category.annotations.length})`}}</span>
        </div>
        <div @click.stop="onEyeClick">
          <i
              v-if="isVisible"
              class="fa fa-eye category-icon"
              :style="{ color: color }"
              aria-hidden="true"
          />
          <i v-else class="fa fa-eye-slash category-icon" aria-hidden="true" />
        </div>
      </div>
    </div>
    <ul v-show="showAnnotations" ref="collapse" class="list-group">
      <Annotation
        v-for="(annotation) in category.annotations"
        ref="annotation"
        :key="annotation.id"
        :annotation="annotation"
        :shapeOpacity="shapeOpacity"
        :currentAnnotation="currentAnnotation"
        @handleAnnotationEvent="handleAnnotationEvent"
      />
    </ul>
  </div>
</template>

<script>
import paper from "paper"
import { hex2Rgb, color16 } from '@/utils/detectionMore'
import Annotation from './Annotation.vue';
import { killItem } from '@/utils/paperWeaponTS';
import { readUserProfile } from '@/store/main/getters'

export default {
  name: "Category",
  components: { Annotation },
  props: {
    category: {
      type: Object,
      required: true
    },
    currentCategory: {
      type: Object,
    },
    shapeOpacity: {
      type: Number,
      required: true
    },
    currentAnnotation: {
      type: Object
    }
  },
  data: function() {
    return {
      isVisible: true,
      color: this.category.color,
      hex2Rgb: hex2Rgb,
      showAnnotations: true
    };
  },
  methods: {
    handleAnnotationEvent(info) {
      switch(info.type) {
        case 'deleteAnnotation':
          this.onAnnotationDelete(info.data)
          break
        case 'clickAnnotation':
          this.onAnnotationClick(info.data)
          break
      }
    },
    onAnnotationDelete(annotation) {
      const tragetIndex = this.category.annotations.findIndex((item) => item.id === annotation.id)
      if (tragetIndex === -1) return
      this.category.annotations.splice(tragetIndex, 1)
    },
    onAnnotationClick(annotation) {
      const info = {
        type: 'clickAnnotation',
        data: annotation
      }
      this.$emit('click', info)
    },
    addNewAnnotations(newAnnotations) {
      newAnnotations.forEach(item => {
        let annotationId = this.category.annotations.length
        // 唯一id生成规则: 类别id + 框索引
        let _id = parseInt("-" + String(this.category.id) + String(annotationId + 1))
        const annotation = {
            id: _id,
            color: item.color,
            creator: this.userProfile.full_name,
            channelKey: item.channelKey,
            paper_object: item.paper_object
          //   "category_id": this.category.id
        }
        this.category.annotations.push(annotation)
      })
    },
    onEyeClick() {
      console.log('onEyeClick>>>')
      this.isVisible = !this.isVisible;
      const annotationsRef = this.$refs['annotation']
      annotationsRef.forEach((item) => {
        item.isVisible = this.isVisible 
      })
    },
    onClick() {
      const info = {
        type: 'clickCategory',
        data: this.category
      }
      this.showAnnotations = !this.showAnnotations;
      this.$emit("click", info);
    },
    export() {
    },



  },
  computed: {
    userProfile() {
      return readUserProfile(this.$store) || { roles: [] }
    },
    isCurrent() {
      return this.currentCategory && this.currentCategory.id === this.category.id;
    },
    borderColor() {
      if (this.isCurrent) return "#59C3E1";
      return "#d1d1d1";
    },
  },
  watch: {
    
  },

  mounted() {
  }
};
</script>

<style lang='less' scoped>
.categoryItem-st {
    border-radius: 0 !important;
    border-width:3px;
  .card-header {
    display: block;
    margin: 0;
    padding: 0;
    .category-icon {
      display: block;
      float: left;
      margin: 0;
      padding: 5px 10px 5px 10px;
    }
    .category-index{
      width: 50px;
      height: 46px
    }
    .category-index span{
      font-weight: 700;
      font-size: 20px;
      color: white
    }
  }
}
</style>
