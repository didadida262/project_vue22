<!--
 * @Author: Hhvcg
 * @Date: 2022-07-20 16:42:36
 * @LastEditors: -_-
 * @Description: openlayer地图
-->
<template>
  <div class="openLayer-container pd10">
    <commonTemplate title="GaodeMap" />
    <div class="openLayer-container-content">
			<baidu-map id="gdmap-view" class="bm-view" :center="markerPoint" :zoom="16" :dragging="true" :scroll-wheel-zoom="true" @ready="handler">
				<bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-map-type>
				<bm-marker :position="position" :dragging="false" animation="BMAP_ANIMATION_BOUNCE">
					<bm-info-window :show="show" style="font-size:13px"></bm-info-window>
				</bm-marker> 
			</baidu-map>      
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import AMapLoader from "@amap/amap-jsapi-loader";
// 设置安全密钥
window._AMapSecurityConfig = {
    securityJsCode: 'e21b9906598beb961deab212c6770779',
}
// openlayer配置
// import { Map, View } from 'ol'// 地图实例方法、视图方法
// import Tile from 'ol/layer/Tile'// 瓦片渲染方法
// import OSM from 'ol/source/OSM'// OSM瓦片【OSM不能在实际开发中使用，因为OSM里中国地图的边界有点问题！！！！】
// import 'ol/ol.css'
export default {
  name: 'GaodeMap',
  components: {
    commonTemplate
  },
  data() {
    return {
      // 119.969662,30.287883: company
      // 119.928106,30.244833: home
      map : null,
      mouseTool : null,
      overlays : [],
      auto : null,
      placeSearch : null, 
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {
      AMapLoader.load({
        "key": "b7bbacfcd8d806c94b31a0b60de94355", 
        "version": "2.0",   // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        "plugins": ['AMap.Scale', 'AMap.ToolBar'],           // 需要使用的的插件列表，如比例尺'AMap.Scale'等
        }).then((AMap)=>{
            // 初始化地图
            this.map = new AMap.Map('gdmap-view',{
                viewMode : "3D",  //  是否为3D地图模式
                zoom : 15,   // 初始化地图级别
                center : [119.928106,30.244833], 
                resizeEnable: true
            });
        }).catch(e => {
            console.log(e);
        });
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
    .bm-view {
      width: 100%;
      height: 100%;
    }
  }
}

</style>