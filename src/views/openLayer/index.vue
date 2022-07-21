<!--
 * @Author: Hhvcg
 * @Date: 2022-07-20 16:42:36
 * @LastEditors: -_-
 * @Description: openlayer地图
-->
<template>
  <div class="openLayer-container pd10">
    <commonTemplate title="OpenLayer" />
    <div class="openLayer-container-content">
      <canvas ref="canvas" resize class="canvas" id="canvas"/>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import { Map, View } from 'ol'// 地图实例方法、视图方法
import Tile from 'ol/layer/Tile'// 瓦片渲染方法
import OSM from 'ol/source/OSM'// OSM瓦片【OSM不能在实际开发中使用，因为OSM里中国地图的边界有点问题！！！！】
import 'ol/ol.css'
export default {
  name: 'openLayer',
  components: {
    commonTemplate
  },
  data() {
    return {
      map: null
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      this.map = new Map({
        target: "canvas",
        layers: [
          new Tile({
            source: new OSM()
          })
        ],
        view: new View({
          projection: 'EPSG:4326',
          // 深圳坐标
          center: [114.064839, 22.548857],
          // 地图最小缩放比例
          minZoom: 10,
          // 地图缩放级别（打开页面时默认级别）
          zoom: 12
        })        
      })
      console.log(this.map)
    }
  },
  beforeDestroyed() {
  }


};
</script>
<style scoped lang="scss">
.openLayer-container {
    width: 100%;
    height: 100%;
  .openLayer-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
    }
  }
}

</style>
