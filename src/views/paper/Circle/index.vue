<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: circle
-->
<template>
  <div class="Circlle-container pd10">
    <commonTemplate title="Circle" />
    <div class="Circlle-container-content">
      <review-circle
       :defectList="circleData.dotData"
       :waferInfo="circleData.waferInfo"
       :otherLayersInfo="otherLayersInfo"
       :typeList="circleData.dotClass"
      />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import ReviewCircle from '@/components/ReviewCircle.vue'
export default {
  name: 'Circlle',
  components: {
    commonTemplate,
    ReviewCircle
  },
  data() {
    return {
      title: 'Circlle',
      circleData: require('@/api/circleData'),
      otherLayersInfo: {
        chipImg: require('@/assets/map.png'),
        plImg: require('@/assets/map2.png'),
        bfImg: require('@/assets/map3.png')
      }
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
  .Circlle-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
  }
}
</style>
