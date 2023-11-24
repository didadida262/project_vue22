<!--
 * @Author: hhvcg 719713496@qq.com
 * @Date: 2023-10-13 09:29:59
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description: 
 * 
-->

<script>
import tool from "../tool";

export default {
  name: "SelectTool",
  mixins: [tool],
  data() {
    return {
      icon: "fa-hand-pointer-o",
      name: "选择工具",
      shortcut: "字母 A",
      cursor: "pointer",
      initPoint: null,
      hitOptions: {
          segments: true,
          stroke: false,
          tolerance: 5
        },
    };
  },

  created() {
  },
  methods: {
    onMouseDown(event) {
      console.log(event)
      this.initPoint = event.point
    },
    onMouseDrag(event) {
      let delta_x = this.initPoint.x - event.point.x;
      let delta_y = this.initPoint.y - event.point.y;
      let center_delta = new paper.Point(delta_x, delta_y);
      let new_center = paper.view.center.add(center_delta);
      paper.projects.forEach((pro) => {
        pro.view.setCenter(new_center)
      })
    },

    onMouseUp(event) {
      this.initPoint = null
    },

    onMouseMove(event) {
      // this.hitOptions.tolerance = 5 / this.currentPicZoom()
      const activateProject = paper.projects.filter((pro) => pro.name === this.$parent.activePaperScope)[0]
      console.log('activateProject>>>', activateProject)
      let hitResult = activateProject.hitTest(
        event.point,
        this.hitOptions
      )
      // console.log('hitResult>>>', hitResult)
    },

  },
  watch: {

  },
  beforeDestroy() {
  }
};
</script>
