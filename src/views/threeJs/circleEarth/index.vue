<!--
 * @Author: Hhvcg
 * @Date: 2022-07-06 17:59:06
 * @LastEditors: -_-
 * @Description: threejs相关特性探索
-->

<template>
  <div id="container" ref="container" class="container" />
</template>

<script>

import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
export default {
  data() {
    return {
      // threejs四大件
      camera: null,
      scene: null,
      mesh: null,
      renderer: null,
      containerWidth: null,
      containerHeight: null,
      axesHelper: null
    }
  },
  mounted() {
    this.initWorld()
    this.animated()
  },

  methods: {
    // 按帧数执行
    animated() {
      requestAnimationFrame(this.animated)
      // this.mesh.rotation.x += 0.1;
      // this.mesh.rotation.y += 0.1;
      this.mesh.position.x += 0.01
      this.mesh.rotation.z += 0.01
      this.renderer.render(this.scene, this.camera)
    },

    initWorld() {
      console.log('初始化世界---->')
      const container = this.$refs['container']
      this.containerWidth = container.clientWidth // 窗口宽度
      this.containerHeight = container.clientHeight // 窗口高度
      this.scene = new Three.Scene()
      this.setGoem()
      // this.moveGeo()
      this.setPoint()
      // // // 环境光
      // let ambient = new Three.AmbientLight(0x444444);
      // this.scene.add(ambient);
      this.setCamera()
      this.setRender()
      this.setOrbit()
      this.setAxes()
    },
    moveGeo() {
      this.mesh.position.set(0, 0, 0)
      console.log(this.mesh)
    },
    // 添加坐标轴
    setAxes() {
      this.axesHelper = new Three.AxesHelper(500)
      this.axesHelper.setColors('red', 'green', 'orange')
      this.scene.add(this.axesHelper)
    },
    // 设置轨道,实现鼠标拖动效果
    setOrbit() {
      this.orbit = new OrbitControls(this.camera, this.renderer.domElement)
    },
    setPoint() {
      // 光源设置
      // 点光
      const point = new Three.PointLight(0xffffff, 2)
      point.position.set(2, 200, 300)
      this.scene.add(point)
      // 测试点
      const point2 = new Three.PointLight(0xffffff, 2)
      point2.position.set(100, 0, 0)
      this.scene.add(point2)
    },
    setGoem() {
      // const geometry  = new Three.SphereBufferGeometry(60, 40, 40)
      const geometry = new Three.BoxGeometry(60, 60, 60)
      const material = new Three.MeshStandardMaterial()
      // const material  = new Three.MeshBasicMaterial({})
      material.metalness = 0.7
      material.roughness = 0.2
      material.color = new Three.Color('red')
      this.mesh = new Three.Mesh(geometry, material)
      this.scene.add(this.mesh)
    },
    setCamera() {
      // 创建相机对象
      const k = this.containerWidth / this.containerHeight // 窗口宽高比
      const s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      this.camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      // this.camera = new Three.OrthographicCamera();
      // this.camera = new Three.PerspectiveCamera(-s * k, s * k, s, -s, 1, 1000);
      this.camera.position.set(200, 300, 200) // 设置相机位置
      this.camera.lookAt(this.scene.position) // 设置相机方向(指向的场景对象)
    },
    // render函数
    setRender() {
      /**
       * 创建渲染器对象
       */
      this.renderer = new Three.WebGLRenderer()
      this.renderer.setSize(this.containerWidth, this.containerHeight)// 设置渲染区域尺寸
      // this.renderer.setClearColor('blue', 0.5); //设置背景颜色
      // 执行渲染操作   指定场景、相机作为参数
      this.renderer.render(this.scene, this.camera)
      container.appendChild(this.renderer.domElement) // body元素中插入canvas对象
    }
  }
}
</script>

<style scoped lang="scss">
// .circleEarth-container {
//   width: 100%;
//   height: 100%;
//   border: 1px solid ghostwhite;
//   background-image: linear-gradient(120deg,#487399,#994515);
  .container {
    height: 100%;
    width: 100%;
  }
// }
</style>
