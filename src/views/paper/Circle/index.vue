<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: circle
-->
<template>
  <div class="Circlle-container pd10">
    <commonTemplate title="Circle" />
    <div class="Circlle-container-content flex-cb pd5">
      <div class="Circlle-container-content-operateLayer">
        <slider-comp
         class="mgb20"
         v-for="(item, index) in sliderCompData"
         :key="index"
         :info="item"
         @handleSliderCompOperatiopn="handleSliderCompOperatiopn"
        />
      </div>
      <div class="Circlle-container-content-circle">
        <review-circle
          :defectList="circleData.dotData"
          :waferInfo="circleData.waferInfo"
          :otherLayersInfo="otherLayersInfo"
          :typeList="circleData.dotClass"
        />
    </div>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import ReviewCircle from '@/components/ReviewCircle.vue'
import sliderComp from './components/sliderComp.vue'
export default {
  name: 'Circlle',
  components: {
    commonTemplate,
    ReviewCircle,
    sliderComp
  },
  data() {
    return {
      title: 'Circlle',
      circleData: require('@/api/circleData'),
      otherLayersInfo: [
        {
          name: 'chipImg',
          url: require('@/assets/map.png')
        },
        {
          name: 'plImg',
          url: require('@/assets/map2.png')
        },
        {
          name: 'bfImg',
          url: require('@/assets/map3.png')
        }
      ],
      sliderCompData: [
        {
          title: 'Defect Map',
          checkBoxData: true,
          sliderData: 1,
          layer: 'layerData',
          loading: false
        },
        {
          title: 'Chip Result',
          checkBoxData: false,
          sliderData: 0.5,
          layer: 'layerChip',
          loading: false
        },
        {
          title: 'Haze Map',
          checkBoxData: false,
          sliderData: 0.5,
          layer: 'layerDestiny',
          loading: false
        },
        {
          title: 'Surface Image',
          checkBoxData: false,
          sliderData: 0.5,
          layer: 'layerBf',
          loading: false
        },
        {
          title: 'PL Image',
          checkBoxData: false,
          sliderData: 0.5,
          layer: 'layerPl',
          loading: false
        }
      ]
    }
  },
  // computed: {
  //   currentProject() {
  //     return this.paper.projects.filter((_p) => _p.name === this.title)[0]
  //   }
  // },
  watch: {},
  mounted() {
  },
  beforeDestroy() {
    this.currentProject.remove()
  },
  methods: {
    handleSliderCompOperatiopn(data) {
      console.log('收到数据>>', data)
    }
  },
  created() {
    console.log('this.circleData>>>', this.circleData)
  }
}
</script>
<style scoped lang="scss">
.Circlle-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    &-operateLayer {
      width: 300px;
      height: 100%;
    }
    &-circle {
      width: calc(100% - 320px);
      height: 100%;
      border: 1px solid rgb(118, 118, 122, 0.5);
    }
  }
}
</style>
