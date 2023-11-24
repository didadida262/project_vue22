<!--
 * @Author: hhvcg 719713496@qq.com
 * @Date: 2023-10-10 16:15:54
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description: 
 * 
-->
<script>
import paper from "paper";
import tool from "../tool";
import { mapMutations } from "vuex";
import { throttle } from 'lodash'
import { killItem, getRandomColor } from '@/utils/paperWeaponTS.ts'
import { color16 } from '@/utils/detectionMore'
export default {
  name: "BBoxTool",
  mixins: [tool],
  data() {
    return {
      icon: "fa-object-group",
      name: "矩形工具",
      shortcut: "字母 R",
      cursor: "copy",
      polygon: {
        guidance: true,
        pathOptions: {
          strokeColor: "white",
          strokeWidth: 1,
          color: null,
        }
      },
      firstPoint: null
    };
  },
  created() {
  },
  methods: {
    hasCategorySelected() {
      if (!this.$parent.currentCategory) {
        this.$message.warning('请选择标签！！！')
        return false
      }
      return true

    },
    deleteBbox() {
      killItem(this.selection)
    },
    export() {
      return {
        completeDistance: this.polygon.completeDistance,
        minDistance: this.polygon.minDistance,
        blackOrWhite: this.color.blackOrWhite,
        auto: this.color.auto,
        radius: this.color.radius,
        strokeColor: this.polygon.pathOptions.strokeColor,
      };
    },
    onMouseDown(e) {
      if (!this.hasCategorySelected()) return
      this.first = e.point
      this.polygon.pathOptions.color = color16()
    },

    onMouseMove(e) {
    },
    onMouseUp(e) {
      if (!this.selection) return
      // 确认需要绘制的通道
      const json = this.selection.exportJSON({
        asString: false,
        precision: 6
      });
      const params = {
        json: json,
        path: this.selection.clone(),
        color: this.polygon.pathOptions.color
      }
      this.$emit('addPath', params)
      // 输出path
      killItem(this.selection)
      
    },
    onMouseDrag(e) {
      killItem(this.selection)
      const width = e.point.x - this.first.x
      const height = e.point.y - this.first.y
      this.selection = new paper.Path.Rectangle(this.first.x, this.first.y, width, height)
      // this.selection.strokeColor = this.polygon.pathOptions.strokeColor
      this.selection.fillColor = this.polygon.pathOptions.color
    }
  },
  computed: {
  },
  watch: {
  },
  mounted() {
  },
  beforeDestroy() {
  }
};
</script>
