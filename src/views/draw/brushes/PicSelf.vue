<!--
 * @Author: Hhvcg
 * @Date: 2022-06-12 21:17:03
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <el-tooltip
    class="item"
    effect="dark"
    content="pic_self"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'pic_self' }]"
     @click="handleClickTool"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-textarea-resize" viewBox="0 0 16 16">
      <path d="M0 4.5A2.5 2.5 0 0 1 2.5 2h11A2.5 2.5 0 0 1 16 4.5v7a2.5 2.5 0 0 1-2.5 2.5h-11A2.5 2.5 0 0 1 0 11.5v-7zM2.5 3A1.5 1.5 0 0 0 1 4.5v7A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5v-7A1.5 1.5 0 0 0 13.5 3h-11zm10.854 4.646a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708l3-3a.5.5 0 0 1 .708 0zm0 2.5a.5.5 0 0 1 0 .708l-.5.5a.5.5 0 0 1-.708-.708l.5-.5a.5.5 0 0 1 .708 0z"/>
     </svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons.js'
import tools from './tools'
// 色调         hue: Math.random() * 360,
// 饱和度    saturation: 1,
// 亮度       brightness: 1
export default {
  name: 'pic_self',
  mixins: [tools],
  props: {
    selected: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      name: 'pic_self',
      selection: null,
      first: null,
      myPath: null,
      resp: [],
      colors: []
    }
  },
  computed: {},
  watch: {

  },
  mounted() {
    this.paper = paper
  },
  methods: {
    // 针对给定path，color，上梯度色
    colorFul(item) {
      console.log('item---->', item.bounds)
      this.gradient = new paper.Gradient(this.colors, false)
      this.radius = Math.max(item.bounds.width, item.bounds.height) * 0.75
      item.fillColor = new paper.Color(this.gradient, item.bounds.leftCenter, item.bounds.rightCenter.add(this.radius))
    },
    createColors() {
      for (let i = 0; i < 60; i++) {
        const brightness = 1 - (i / 60) * 1.5
        const hue = i / 60 * 4 * 360
        const color = {
          hue: hue,
          saturation: 1,
          brightness: brightness
        }
        this.colors.push(color)
      }
      console.log(this.colors)
    },
    onMouseUp(e) {
    },

    onMouseDown(e) {
      console.log('this.WIDTH>>>',this.WIDTH)
    },
    onMouseDrag(e) {

    },


  },

  created() {
  }
}
</script>

<style lang="scss" scoped>

</style>
