<!--
 * @Author: Hhvcg
 * @Date: 2022-06-10 15:44:29
 * @LastEditors: -_-
 * @Description: 见缝插针 
-->
<template>
  <div class="stickIn-container pd10">
    <commonTemplate title="见缝插针" />
    <div class="stickIn-container-content">
      <canvas ref="canvas" resize class="canvas" />
    </div>
  </div>
</template>

<script>
import paper from "paper";
import commonTemplate from '@/components/titleTemplate.vue'
import { getRandomColor } from '@/utils/weapons.js'
export default {
  name: 'StickIn',
  components: {
    commonTemplate
  },
  data() {
    return {
      title: 'stickin',
      rotateFlag: true,
      paper: null,
      tool: null,
      role: null,
      respo: []
    };
  },
  watch: {},
  mounted() {
    this.init();
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  methods: {
    removeItem(item) {
      if (item) {
        item.remove()
        item = null
      }
    },
    onFrame() {
      if (this.rotateFlag) {
        this.role.rotate(10)
        this.respo.forEach((item) => {
          item.rotate(10)
          // item.rotate(10, new paper.Point(0,0))
        })
      }
    },
    init() {
      console.log("初始化世界!!!");
      const canvas = this.$refs.canvas;
      this.paper = paper;
      this.paper.setup(canvas);
      // 将视图的远点置于底部中间，方便后续炮塔等的向量计算
      this.paper.view.setCenter(0, 0);
      this.paper.project.name = 'stickin'
      this.paper.view.onFrame = this.onFrame;
      this.tool = new this.paper.Tool();
      this.tool.onKeyDown = (e) => {
        switch (e.key) {
          case 'space':
            this.rotateFlag = !this.rotateFlag
        }
        
      }
      this.tool.onMouseDown = (e) => {
        let line = new paper.Path.Line(new paper.Point(0,0), e.point)
        line.strokeColor = getRandomColor()
        // line.strokeColor = 'white'
        this.respo.push(line.clone())
        this.removeItem(line)
      };
      this.role = new paper.Path.Rectangle({
        center: new paper.Point(0,0),
        size: new paper.Size(40)
      })
      this.role.fillColor = 'red'
      let textItem = new paper.PointText({
        content: 'Click and drag to draw a line.',
        point: new paper.Point(-canvas.clientWidth / 2 + 50, -canvas.clientHeight / 2 + 50),
        fillColor: 'orange',
      });
    },
  },
  beforeDestroy() {
    console.log('beforeDestroyed>>>radio')
    this.currentProject.remove()
  }


};
</script>
<style scoped lang="scss">
.stickIn-container {
    width: 100%;
    height: 100%;
  .stickIn-container-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    .canvas {
      width: 100%;
      height: 100%;
      background: black;
    }
  }
}

</style>
