<!--
 * @Author: Hhvcg
 * @Date: 2022-09-02 16:28:27
 * @LastEditors: -_-
 * @Description: 本组件接受参数对象，包括title、图片url，handleOnwheel暴露滚轮数据信息，支持图片的展示缩放、缩放联动、拖动效果
-->


<template>
  <div
    @wheel="onwheel">
    <span class="label">
      {{ picInfo.title }}
    </span>
    <div class="paperpic-st-picContainer">
      <canvas
        id="picContainer"
        ref="picContainer"
        resize
        class="picContainer"
      />
    </div>
  </div>
</template>
<script>
  import paper from 'paper'
  export default {
    name: "paperpic",
    props: {
      picInfo: {
        type: Object,
        required: true
      }
    },
    data() {
      return {
        scale: 0,
        zoom: 1,        
        WIDTH: null,
        HEIGHT: null,
        transform: { zoom: null, offset: null }
      };
    },
    watch: {
      "picInfo.src"() {
        let project = this.paper.projects.filter((item) => item.name === this.picInfo.title)[0]
        project.activate()
        let layer = project.layers[0]
        layer.remove()
        let raster = new paper.Raster(this.picInfo.src)
        raster.onLoad = () => {
          raster.fitBounds(project.view.bounds, false)
        }
      }
    },
    methods: {
      drawAxis(){
        let layerAxis = new paper.Layer()
        layerAxis.name = this.picInfo.title + '-layerAxis'
        let axisX = new paper.Path.Line({
          form: new paper.Point(-this.WIDTH / 2, 0),
          to: new paper.Point(this.WIDTH / 2, 0),
          strokeColor: 'red'
        })
        let axisY = new paper.Path.Line({
          form: new paper.Point(0, -this.HEIGHT / 2,),
          to: new paper.Point(0, this.HEIGHT / 2),
          strokeColor: 'red'
        })
        let t = new paper.Path.Circle({
          center: new paper.Point(0),
          radius: 100,
          strokeColor: 'black'
        })
      },
      onwheel(e) {
        // console.log('onwheel>>>', e)
        // e.preventDefault();
        let currentProject = this.paper.projects.filter((item) => item.name === this.picInfo.title)[0]
        let view = currentProject.view;
        // if (e.ctrlKey) {
        //   // Pan up and down
        //   let delta = new paper.Point(0, 0.5 * e.deltaY);
        //   view.setCenter(view.center.add(delta));
        // } else if (e.shiftKey) {
        //   // Pan left and right
        //   let delta = new paper.Point(0.5 * e.deltaY, 0);
        //   view.setCenter(view.center.add(delta));
        // } else {
          let viewPosition = view.viewToProject(
              new paper.Point(e.offsetX, e.offsetY)
          );

          let transform = this.changeZoom(e.deltaY, viewPosition);
            view.zoom = transform.zoom
            view.center = view.center.add(transform.offset);
            this.transform = {
              ...this.transform,
              ...transform
            }
            this.$emit('handleOnwheel',{transform: this.transform, title: this.picInfo.title})
        // }

      },    
      changeZoom(delta, p) {
        let currentProject = this.paper.projects.filter((item) => item.name === this.picInfo.title)[0]
        let view = currentProject.view;      
        let oldZoom = view.zoom;
        let c = view.center;
        let factor = 1 + this.zoom;

        let zoom = delta < 0 ? oldZoom * factor : oldZoom / factor;
        let beta = oldZoom / zoom;
        let pc = p.subtract(c);
        let a = p.subtract(pc.multiply(beta)).subtract(c);

        return { zoom: zoom, offset: a };
      }, 
      // 初始化画布，并确认相关参数初始值
      init() {
        const canvas = this.$refs.picContainer;
        this.WIDTH = canvas.clientWidth;
        this.HEIGHT = canvas.clientHeight;
        paper.setup(canvas);
        this.paper = paper;
        this.paper.project.name = this.picInfo.title
        this.paper.view.setCenter(0, 0);
        this.paper.view.onMouseDown = (e) => {this.onMouseDown(e)}
        this.paper.view.onMouseMove = (e) => {this.onMouseMove(e)}
        this.paper.view.onMouseDrag = (e) => {this.onMouseDrag(e)}

      },
      drawPic() {
        let raster = new paper.Raster(this.picInfo.src)
        raster.onLoad = () => {
          raster.fitBounds(this.paper.view.bounds, false)
        }
      },
      onMouseDown(e) {
        if (e) {
          let currentPorject = this.paper.projects.filter((project) => project.name === this.picInfo.title)[0]
          let hitResult = currentPorject.hitTest(
            e.point,
          );   
        }
      },
      onMouseMove(e) {
        this.initPoint = e.point;
      },
      onMouseDrag(e) {
        if (e) {
          let delta_x = this.initPoint.x - e.point.x;
          let delta_y = this.initPoint.y - e.point.y;
          let center_delta = new paper.Point(delta_x, delta_y);
          let projects = this.paper.projects.filter((project) => project.name !== 'circle')
          projects.forEach((project) => {
            let new_center = project.view.center.add(center_delta);
            project.view.setCenter(new_center);
          })
        }
      },
    },
    created() {
    },
    mounted () {
      this.init()
      this.drawPic()
      // this.drawAxis()
    },
    beforeDestroy() {
      let project = this.paper.projects.filter((item) => item.name === this.picInfo.title)[0]
      project.remove()
    }
}
</script>


<style lang="scss" scoped>
.paperpic-st {
  width: 100%;
  height: 100%;
  position: relative;
  &-title {
    position: absolute;
    left: 0px;
    top: 0px;
    width: 100px;
    height: 40px;
    color: white;
    font-weight: bold;
    z-index: 10;
  }
  .paperpic-st-picContainer {
    width: 100%;
    height: 100%;
    position: relative;
    .picContainer {
      width: 100%;
      height: 100%;
    }

  }
}
.white{
  background: rgb(198, 198, 198);
  border: 1px solid black;
}
.black{
  background: rgb(83, 83, 83);
  border: 1px solid black;
}
</style>