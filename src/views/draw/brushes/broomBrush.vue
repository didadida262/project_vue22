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
    content="broom_brush"
    placement="right"
  >
    <div
     :class="[{ 'is-active': selected === 'broom_brush' }]"
     @click="changeBrush"
     >
     <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-paint-bucket" viewBox="0 0 16 16">
      <path d="M6.192 2.78c-.458-.677-.927-1.248-1.35-1.643a2.972 2.972 0 0 0-.71-.515c-.217-.104-.56-.205-.882-.02-.367.213-.427.63-.43.896-.003.304.064.664.173 1.044.196.687.556 1.528 1.035 2.402L.752 8.22c-.277.277-.269.656-.218.918.055.283.187.593.36.903.348.627.92 1.361 1.626 2.068.707.707 1.441 1.278 2.068 1.626.31.173.62.305.903.36.262.05.64.059.918-.218l5.615-5.615c.118.257.092.512.05.939-.03.292-.068.665-.073 1.176v.123h.003a1 1 0 0 0 1.993 0H14v-.057a1.01 1.01 0 0 0-.004-.117c-.055-1.25-.7-2.738-1.86-3.494a4.322 4.322 0 0 0-.211-.434c-.349-.626-.92-1.36-1.627-2.067-.707-.707-1.441-1.279-2.068-1.627-.31-.172-.62-.304-.903-.36-.262-.05-.64-.058-.918.219l-.217.216zM4.16 1.867c.381.356.844.922 1.311 1.632l-.704.705c-.382-.727-.66-1.402-.813-1.938a3.283 3.283 0 0 1-.131-.673c.091.061.204.15.337.274zm.394 3.965c.54.852 1.107 1.567 1.607 2.033a.5.5 0 1 0 .682-.732c-.453-.422-1.017-1.136-1.564-2.027l1.088-1.088c.054.12.115.243.183.365.349.627.92 1.361 1.627 2.068.706.707 1.44 1.278 2.068 1.626.122.068.244.13.365.183l-4.861 4.862a.571.571 0 0 1-.068-.01c-.137-.027-.342-.104-.608-.252-.524-.292-1.186-.8-1.846-1.46-.66-.66-1.168-1.32-1.46-1.846-.147-.265-.225-.47-.251-.607a.573.573 0 0 1-.01-.068l3.048-3.047zm2.87-1.935a2.44 2.44 0 0 1-.241-.561c.135.033.324.11.562.241.524.292 1.186.8 1.846 1.46.45.45.83.901 1.118 1.31a3.497 3.497 0 0 0-1.066.091 11.27 11.27 0 0 1-.76-.694c-.66-.66-1.167-1.322-1.458-1.847z"/>
    </svg>
      <el-divider />
    </div>
  </el-tooltip>
</template>

<script>
import paper from "paper";
import { getRandomColor } from '@/utils/weapons.js'

// 色调         hue: Math.random() * 360,
// 饱和度    saturation: 1,
// 亮度       brightness: 1
export default {
  name: "broomBrush",
  props: {
    selected: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      lastPoint: null,
      brush: {
        radius: 10,
        path: null,
        color: 'black'
      },
      selection: null,
      tool: null,
      handle: null
    };
  },
  computed: {},
  watch: {
    selected() {
      if (this.selected === 'broom_brush') {
        this.init()
      } else {
        this.tool = null
      }
    },
  },
  mounted() {},
  methods: {
    addBrokenPath(_point) {
      if (this.selection && _point.getDistance(this.lastPoint) >= this.brush.radius * 2) {
        const vector = _point.subtract(this.lastPoint)
        for (let i = 1; i < vector.length;) {
          let newPoint = this.lastPoint.add(vector.normalize().multiply(i))
          let temp = null
          // if (this.brush.pathOptions.btype==='circle'){
            temp = new paper.Path.Circle(newPoint, new paper.Size(this.brush.radius))
          // } else {
          //   temp = new paper.Path.Rectangle({
          //     center: newPoint,
          //     size: new paper.Size(this.brush.pathOptions.radius * 2) 
          //   })
          // }
          
          let newSelection = this.selection.unite(temp);
          temp = null
          this.selection.remove();
          this.selection = newSelection;
          i = i + this.brush.radius / 2
        }
        this.lastPoint = _point
      }  

    },     
    init() {
      // this.log('初始化brush--->')
      this.tool = this.$parent.tool
      this.tool.onKeyDown = this.onKeyDown
      this.tool.onMouseDown = this.onMouseDown    
      this.tool.onMouseDrag = this.onMouseDrag    
      this.tool.onMouseMove = this.onMouseMove    
      this.tool.onMouseUp = this.onMouseUp
    },    
    changeBrush() {
      this.$emit('changeBrush', 'broom_brush')
    },
    onKeyDown(e) {
    },
    onMouseUp(e) {
      this.selection.closed = true
      this.selection.smooth()      
    },
    onMouseDown(e) {
      this.selection = new paper.Path({
        fillColor: getRandomColor()
      })
      this.selection.add(e.point)
    },
    onMouseDrag(e) {
      console.log('drag--->',e.point)
      this.moveBrush(e)
      const step = e.delta.divide(2)
      step.angle += 90

      const top = e.middlePoint.add(step)
      const bottom = e.middlePoint.subtract(step)
      this.selection.add(top)
      this.selection.insert(0, bottom)
      // }
      this.selection.smooth()
    },
    onMouseMove(e) {
      if (this.brush.path === null) {
        this.createBrush(e)
      }
      this.moveBrush(e)
      // this.brush.path.bringToFront();
    },
    moveBrush(e) {
      this.brush.path.position = e.point
    },
    createBrush(e) {
      this.brush.path = new paper.Path.Circle({
        center: e.point,
        strokeColor: this.brush.color,
        radius: this.brush.radius,
        strokeWidth: 3
      })
    }
  },

  created() {
  },
};
</script>

<style lang="scss" scoped>

</style>
