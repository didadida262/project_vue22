<!--
 * @Author: Hhvcg
 * @Date: 2022-12-20 09:40:17
 * @LastEditors: -_-
 * @Description: lifetime-时间
-->

<template>
  <div class="lifeTime-container pd10">
    <commonTemplate title="Life-Time" />
    <div class="lifeTime-container-content">
      <div>
        <span class="lifeTime-container-content-timeTitle">Time:</span>
        <span class="lifeTime-container-content-timeContent">{{ currentTime }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons'

export default {
  name: 'lifeTime',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'lifeTime',
      currentTime: null
    }
  },
  computed: {

  },
  watch: {},
  created() {
    this.updateTime()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    updateTime() {
      cancelAnimationFrame(this.RAF)
      this.RAF = requestAnimationFrame(() => {
        this.currentTime = (new Date()).toLocaleString()
        this.updateTime()
      })
    }
  }
}
</script>
<style scoped lang="scss">
.lifeTime-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    &-timeTitle {
      color: #000;
      font-weight: bold;
      font-family: consolas;
      font-size: 30px;
    }
    &-timeContent{
      font-weight: bold;
      font-family: consolas;
      font-size: 30px;
      color: #650D65;
    }
  }
}
</style>
