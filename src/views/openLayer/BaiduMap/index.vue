<!--
 * @Author: Hhvcg
 * @Date: 2022-07-20 16:42:36
 * @LastEditors: Hhvcg
 * @Description: openlayer地图
-->
<template>
  <div class="openLayer-container pd10">
    <commonTemplate title="BaiduMap" />
    <div class="openLayer-container-content">
      <!-- <canvas ref="canvas" resize class="canvas" id="canvas"/> -->
      <baidu-map class="bm-view" :center="markerPoint" :zoom="16" :dragging="true" :scroll-wheel-zoom="true" @ready="handler">
        <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT" />
        <bm-marker :position="position" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
          <bm-info-window :show="show" style="font-size:13px" />
        </bm-marker>
      </baidu-map>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
// openlayer配置
// import { Map, View } from 'ol'// 地图实例方法、视图方法
// import Tile from 'ol/layer/Tile'// 瓦片渲染方法
// import OSM from 'ol/source/OSM'// OSM瓦片【OSM不能在实际开发中使用，因为OSM里中国地图的边界有点问题！！！！】
// import 'ol/ol.css'
export default {
  name: 'Map',
  components: {
    commonTemplate
  },
  data() {
    return {
      // 119.969662,30.287883: company
      // 119.928106,30.244833: home
      markerPoint: { lng: 119.928106, lat: 30.244833 },
      show: false,
      isBig: false,
      values: [],
      position: { lng: 119.928106, lat: 30.244833 }
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  methods: {
    init() {
      console.log(this.map)
    },
    handler({ BMap, map }) {
		  // console.log(BMap, map)
    }
  },
  beforeDestroyed() {
  }

}
</script>
<style scoped lang="scss">
.openLayer-container {
    width: 100%;
    height: 100%;
  .openLayer-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
    .bm-view {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
