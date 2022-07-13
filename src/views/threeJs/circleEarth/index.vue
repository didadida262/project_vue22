<!--
 * @Author: Hhvcg
 * @Date: 2022-07-06 17:59:06
 * @LastEditors: -_-
 * @Description: threejs相关特性探索
-->

<template>
  <div class="circleEarth-container flex-cc">
    <div id="container" ref="container" class="container"></div>
  </div>
</template>

<script>

import * as Three from 'three'
export default {
  data() {
    return {
      camera: null,
      scene: null,
      mesh: null,
      renderer: null,
      clock: null
    };
  },
  mounted() {
    this.initWorld()
    this.animated()
  },

  methods: {
    animated() {
      requestAnimationFrame(this.animated)
				this.mesh.rotation.x += 0.1;
				// this.mesh.rotation.y += 0.1;
				// this.mesh.rotation.z += 0.1;
        this.renderer.render(this.scene, this.camera)
    },

    initWorld() {
      this.clock = new Three.Clock()
      console.log('初始化世界---->')
      // 老版本球体
      const container = this.$refs['container']
      this.scene = new Three.Scene()
      // const geometry  = new Three.SphereBufferGeometry(60, 40, 40)
      const geometry  = new Three.BoxGeometry(60, 60, 60)
      const material  = new Three.MeshStandardMaterial({
        // color: 'black'
      })
      material.metalness = 0.7
      material.roughness = 0.2
      material.color = new Three.Color(0x292929)
      this.mesh = new Three.Mesh(geometry , material )
      this.scene.add(this.mesh)
      let width = container.clientWidth; //窗口宽度
      let height = container.clientHeight; //窗口高度
      // 光源设置
      // 点光
      let point = new Three.PointLight(0xffffff, 0.2)
      point.position.set(2,200,300)
      this.scene.add(point)
// 测试点
      let point2 = new Three.PointLight(0xffffff, 0.2)
      point2.position.set(100, 0, 0)
      this.scene.add(point2)
      // // 环境光
      let ambient = new Three.AmbientLight(0x444444);
      this.scene.add(ambient);
      let k = width / height; //窗口宽高比
      let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      this.camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200); //设置相机位置
      this.camera.lookAt(this.scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      this.renderer = new Three.WebGLRenderer();
      this.renderer.setSize(width, height);//设置渲染区域尺寸
      this.renderer.setClearColor(0x401230, 0.5); //设置背景颜色
      //执行渲染操作   指定场景、相机作为参数
      this.renderer.render(this.scene, this.camera);      
      container.appendChild(this.renderer.domElement); //body元素中插入canvas对象
    }
  },
};
</script>

<style scoped lang="scss">
.circleEarth-container {
  width: 100%;
  height: 100%;
  border: 1px solid ghostwhite;
  background-image: linear-gradient(120deg,#487399,#994515);
  .container {
    height: 80%;
    width: 80%;
  }
}
</style>
