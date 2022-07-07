<!--
 * @Author: Hhvcg
 * @Date: 2022-07-06 17:59:06
 * @LastEditors: -_-
 * @Description: 模仿实现github首页大圆球
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
      renderer: null
    };
  },
  mounted() {
    this.initWorld()
  },

  methods: {
    initWorld() {
      console.log('初始化世界---->')
      // 老版本球体
      const container = this.$refs['container']
      // this.camera = new Three.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.01, 10)
      // this.camera.position.z = 0.6
      // this.scene = new Three.Scene()
      // this.scene.add(this.camera)

      // const geometry = new Three.SphereBufferGeometry(0.2, 64, 64)
      // const material = new Three.MeshStandardMaterial()      
      // material.metalness = 0.7
      // material.roughness = 0.2
      // material.color = new Three.Color(0x292929)  

      // this.mesh = new Three.Mesh(geometry, material)
      // this.scene.add(this.mesh) 
      
      // this.renderer = new Three.WebGLRenderer({
      //   alpha: true
      //  })
      // this.renderer.setSize(container.clientWidth, container.clientHeight)
      // console.log('this.renderer.domElement--->', this.renderer.domElement)
      // container.appendChild(this.renderer.domElement)
      let scene = new Three.Scene()
      const geo = new Three.SphereGeometry(60, 40, 40)
      const mat = new Three.MeshLambertMaterial({
        color: 'black'
      })
      const mesh = new Three.Mesh(geo, mat)
      scene.add(mesh)

      // 光源设置
      // 点光
      let point = new Three.PointLight(0xffffff)
      point.position.set(400,200,300)
      scene.add(point)
      // 环境光
      let ambient = new Three.AmbientLight(0x444444);
      scene.add(ambient);
      /**
       * 相机设置
       */
      let width = container.clientWidth; //窗口宽度
      let height = container.clientHeight; //窗口高度
      let k = width / height; //窗口宽高比
      let s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
      //创建相机对象
      let camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
      camera.position.set(200, 300, 200); //设置相机位置
      camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
      /**
       * 创建渲染器对象
       */
      let renderer = new Three.WebGLRenderer();
      renderer.setSize(width, height);//设置渲染区域尺寸
      renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
      container.appendChild(renderer.domElement); //body元素中插入canvas对象
      //执行渲染操作   指定场景、相机作为参数
      renderer.render(scene, camera);      
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
    border: 1px solid black;
  }
}
</style>
