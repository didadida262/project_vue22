<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: -_-
 * @Description: 纯粹的图片展示, 支持自适应或者完全铺满
-->


<template>
  <canvas
    id="picContainer"
    :ref="picContainer"
    resize
    class="picContainer"
  />
</template>
<script>
  import paper from 'paper'
  export default {
    name: "paperpicsample",
    props: {
      picInfo: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        WIDTH: null,
        HEIGHT: null,
      };

    },
    methods: {
      // 初始化画布，并确认相关参数初始值
      init() {
        const canvas = this.$refs[this.picContainer]
        this.WIDTH = canvas.clientWidth;
        this.HEIGHT = canvas.clientHeight;
        paper.setup(canvas);
        this.paper = paper;
        this.paper.project.name = this.picInfo.title
        this.paper.view.setCenter(0, 0);
      },
      drawPic() {
        let raster = new paper.Raster(this.picInfo.src)
        raster.onLoad = () => {
          raster.fitBounds(this.paper.view.bounds, false)
        }
      },
    },
    computed: {
      picContainer() {
        return 'picContainer' + this.title
      }
    },
    mounted () {
      this.init()
      this.drawPic()
    },
    beforeDestroy() {
      let currentProject = this.paper.projects.filter((p) => p.name === this.picContainer)
      currentProject.remove()
      console.log('this.paper----', this.paper)
    }
};
</script>


<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
}

</style>