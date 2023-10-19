<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description:
-->
<template>
  <div class="dashboard-st">
    <div style="width: 600px;height: 700px">
      <TransferComponent />
    </div>
  </div>
</template>

<script>
import TransferComponent from './TransferComponent.vue'
import { mapGetters } from 'vuex'
import paper from 'paper'
import bus from '@/api/eventBus'
import { getRandomColor } from '@/utils/weapons'
import child from './child.vue'
// import { getRandomColor, getCirclePoint } from '@/utils/weapons'

export default {
  name: 'Dashboard',
  components: {
    TransferComponent
  },
  computed: {
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },

  methods: {
  }
}
</script>

<style lang="scss" scoped>
.floatDiv {
  width: 500px;
  height: 500px;
  border: 1px solid red;
  position: absolute;
}
.dashboard-st {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  .main_canvas {
      width: 100%;
      height: 100%;
      background: gray;
    }
}
</style>
