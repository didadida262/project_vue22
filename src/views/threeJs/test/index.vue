<!-- 测试 -->
<template>
  <div id="container" ref="container" class="container" />
</template>

<script>

import * as Three from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader"
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
    this.animate()
  },

  methods: {
    animate() {
      requestAnimationFrame(this.animate)
      // mesh.rotation.x += 0.01
      // mesh.rotation.y += 0.02
      // const elapsedTime = clock.getElapsedTime()
      // Update objects
      // this.mesh.rotation.y = 0.5 * elapsedTime
      this.mesh.rotation.x += 0.01
      this.mesh.rotation.y += 0.01
      this.renderer.render(this.scene, this.camera)
    },
    initWorld() {
      // threejs三要素：相机、场景、渲染器
      console.log('初始化世界---->')
      const container = this.$refs['container']
      this.containerWidth = container.clientWidth // 窗口宽度
      this.containerHeight = container.clientHeight // 窗口高度
      this.scene = new Three.Scene()
      this.geometry = new Three.SphereBufferGeometry(60, 40, 40)
      this.material = new Three.MeshStandardMaterial({
        // color: 'black'
      })
      this.material.metalness = 0.7
      this.material.roughness = 0.2
      this.material.color = new Three.Color(0x292929)
      this.mesh = new Three.Mesh(this.geometry, this.material)
      this.scene.add(this.mesh)

      // 光源设置
      // 点光
      const point = new Three.PointLight(0xffffff, 0.2)
      point.position.set(2, 200, 300)
      this.scene.add(point)
      // 环境光
      const ambient = new Three.AmbientLight(0x444444)
      this.scene.add(ambient)
      /**
       * 相机设置
       */
      const width = container.clientWidth // 窗口宽度
      const height = container.clientHeight // 窗口高度
      const k = width / height // 窗口宽高比
      const s = 200 // 三维场景显示范围控制系数，系数越大，显示的范围越大
      // 创建相机对象
      this.camera = new Three.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000)
      this.camera.position.set(200, 300, 200) // 设置相机位置
      this.camera.lookAt(this.scene.position) // 设置相机方向(指向的场景对象)
      const axesHelper = new Three.AxesHelper(500)
      axesHelper.setColors('red', 'green', 'orange')
      this.scene.add(axesHelper)

      const dracoLoader = new DRACOLoader()
      // 导入模型
      // three/examples/js/libs/draco/gltf
      dracoLoader.setDecoderPath("./draco/gltf/")
      dracoLoader.preload()
      const loader = new GLTFLoader()
      console.log('dracoLoader>>',dracoLoader)
      loader.setDRACOLoader(dracoLoader)
      loader.load('./Pistol_Model.glb', (gltf) => {
        console.log('success!!!')
        const air = gltf.scene
        scene.add(air)
      })

      /**
       * 创建渲染器对象
       */
      this.renderer = new Three.WebGLRenderer()
      this.renderer.setSize(width, height)// 设置渲染区域尺寸
      this.renderer.setClearColor(0x401230, 1) // 设置背景颜色
      container.appendChild(this.renderer.domElement) // body元素中插入canvas对象
      // 执行渲染操作   指定场景、相机作为参数
      this.renderer.render(this.scene, this.camera)

      // 轨道
      const orbit = new OrbitControls(this.camera, this.renderer.domElement)
      // 设置控制器阻尼
      orbit.enableDamping = true

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
