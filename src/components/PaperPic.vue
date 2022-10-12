<!--
 * @Author: Hhvcg
 * @Date: 2022-09-16 11:38:49
 * @LastEditors: -_-
 * @Description: 支持图片展示、拖拽、放大缩小功能
-->


<template>
  <canvas
    :id="picContainer"
    :ref="picContainer"
    resize
    class="picContainer"
    @wheel="onwheel"
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
        zoom: 1,       
        WIDTH: null,
        HEIGHT: null,
        // 拖动的初始点
        initPoint: null
      };

    },
    methods: {
      changeZoom(delta, p) {
        let view = this.currentProject.view;      
        let oldZoom = view.zoom;
        let c = view.center;
        let factor = 0.05 + this.zoom;

        let zoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
        let beta = oldZoom / zoom;
        // 计算当前点到当前视图中心点向量指向
        let pc = p.subtract(c);
        // a点目测是换算后的新p点
        let a = p.subtract(pc.multiply(beta)).subtract(c);

        return { zoom: zoom, offset: a };
      },       
      onwheel(e) {
        let view = this.currentProject.view;
        let viewPosition = view.viewToProject(
            new paper.Point(e.offsetX, e.offsetY)
        );
        let transform = this.changeZoom(e.deltaY, viewPosition);
        this.paper.projects.forEach((project) => {
          project.view.zoom = transform.zoom
          project.view.center = project.view.center.add(transform.offset);
        })
      },
      // 初始化画布，并确认相关参数初始值
      init() {
        const canvas = this.$refs[this.picContainer]
        this.WIDTH = canvas.clientWidth;
        this.HEIGHT = canvas.clientHeight;
        paper.setup(canvas);
        this.paper = paper;
        this.paper.project.name = this.picContainer
        this.paper.view.setCenter(0, 0);
        this.paper.view.onMouseDown = (e) => { this.onMouseDown(e) }
        this.paper.view.onMouseDrag = (e) => { this.onMouseDrag(e) }
        this.paper.view.onMouseUp = (e) => { this.onMouseUp(e) }
      },
      onMouseDown(e) {
        this.initPoint = e.point
        console.log('down!')
      },
      onMouseDrag(e) {
        let delta = this.initPoint.subtract(e.point)
        this.paper.projects.forEach(pro => {
          let newCenter = pro.view.center.add(delta)
          pro.view.setCenter(newCenter)
        });
      },
      onMouseUp(e) {
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
        return 'picContainer' + this.picInfo.title
      },
      currentProject() {
        return this.paper.projects.filter((item) => item.name === this.picInfo.title)[0]
      }
    },
    mounted () {
      this.init()
      this.drawPic()
      console.log('this.paper----', this.paper)
    },
    beforeDestroy() {
      let currentProject = this.paper.projects.filter((p) => p.name === this.picContainer)
      currentProject.remove()
    }
};
</script>


<style lang="scss" scoped>
.picContainer {
  width: 100%;
  height: 100%;
}

</style>