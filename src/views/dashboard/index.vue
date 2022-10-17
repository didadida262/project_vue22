<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description:
-->
<template>
  <div class="dashboard">
    <div class="dashboard-container pd10 flex-cc" @wheel="onwheel">
      <canvas id="main_canvas" ref="main_canvas" resize class="main_canvas" />
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import paper from 'paper'
import { getRandomColor, getCirclePoint } from '@/utils/weapons'
import { thisExpression, tSParenthesizedType } from '@babel/types'

export default {
  name: 'Dashboard',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data() {
    return {
      scale: 0,
      zoom: 1,
      // 
      ratio: 1.05,
      p: null,
      image: {
        raster: null
      },
      url: 'https://cms-assets.tutsplus.com/uploads/users/1251/posts/26530/image/BenderPaper.jpg',
      url2: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg',
      paper: null,
      tool: null,
      // 存储画布容器宽高
      WIDTH: null,
      HEIGHT: null,
      SIZE: 100,
      snake: {
        x: null,
        y: null,
        direction: 1,
        respo: []
      }

    }
  },
  created() {
    console.log('---Dashboard---加载完成--->')
    console.log(window.performance)
  },
  mounted() {
        console.time('1')
    this.initWorld()
    // this.drawXY()
    // this.drawWave()
    // // this.drawSnakeStep()
    // this.test()
    console.timeEnd('1')
    console.log('paperScope--->', this.paper)
  },

  methods: {
    onwheel(e) {
      console.log('onwheel>>>', e)
      // e.preventDefault();
      // let currentProject = this.paper.projects.filter((item) => item.name === this.title)[0]
      let currentProject = this.paper.project
      let view = currentProject.view;
      if (e.ctrlKey) {
        // Pan up and down
        let delta = new paper.Point(0, 0.5 * e.deltaY);
        view.setCenter(view.center.add(delta));
      } else if (e.shiftKey) {
        // Pan left and right
        let delta = new paper.Point(0.5 * e.deltaY, 0);
        view.setCenter(view.center.add(delta));
      } else {
        let viewPosition = view.viewToProject(
            new paper.Point(e.offsetX, e.offsetY)
        );

        let transform = this.changeZoom(e.deltaY, viewPosition);
          this.scale = 1 / transform.zoom;
          view.zoom = transform.zoom + Math.pow(Math.E, -6);
          view.center = view.center.add(transform.offset);
      }

      // return false;
    },    
    // 计算鼠标滑动后的 zoom和 offset, 仅在 @onwheel 方法中用到
    changeZoom(delta, p) {
      // let currentProject = this.paper.projects.filter((item) => item.name === this.title)[0]
      let currentProject = this.paper.project
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
    change() {
      this.raster.source = this.url2
      this.raster.onLoad = () => {
        console.log('change...Success!')
      }
    },
    mouseWheel(e) {
      // const view = this.paper.view
      console.log('mouseWheel>>>>',e)
      // // offsetX:事件触发点相对于div的边距
      // // 返回一个 double 值，该值表示滚轮的纵向滚动量。
      // console.log('触发点>>>', {x: e.offsetX, y: e.offsetY })
      // let p = new paper.Point(e.offsetX,e.offsetY)
      //   let direction = e.deltaY > 0? false: true
      // if (direction) {
      //   console.log('放大')
      //   view.zoom = Number((view.zoom * this.ratio).toFixed(3))
      //   p = p.multiply(view.zoom)
        
      // } else{
      //   console.log('缩小')
      //   view.zoom = Number((view.zoom / this.ratio).toFixed(3))
      //   p = p.divide(view.zoom)
      //   // let center = p.divide(view.zoom)
      //   // view.setCenter(center)
      // }
      // view.setCenter(p)
      // console.log('viwq>>', view.center)
      // console.log('zoom>>', view.zoom)
    },
    modifyHead() {
      let top = this.path.segments[3]
      let bot = this.path.segments[4]
      let v = top.point.subtract(bot.point).normalize()
      const vector = new paper.Point({
        angle: v.angle,
        length: Math.PI * 200 / 4
      })
      top.handleOut = vector.rotate(-90)
      bot.handleIn = vector.rotate(-90)
      
    },
    getCenter(p1, p2) {
      let v = p1.subtract(p2).divide(2)
      let c = p1.subtract(v)
      // c.selected = true
      let cc = new paper.Path.Circle({
        center: c,
        radius: 50,
      })
      
      let neww = this.path.unite(cc) 
      this.path.remove()
      this.path = neww
    },
    modifyTrail() {
      // let top = this.path.firstSegment
      // let bot = this.path.lastSegment
      let top = this.path.segments[0]
      let bot = this.path.segments[7]
      // top.previous = bot
      // bot.next = top
      console.log('top---', top)
      console.log('bot---', bot)
      let v = top.point.subtract(bot.point).normalize()
      const vector = new paper.Point({
        angle: v.angle,
        length: Math.PI * 200 / 4
      })
      top.handleOut = vector.rotate(90)
      bot.handleIn = vector.rotate(90)
    },     
    // 绘制三点波浪
    drawWave() {
      this.path = new paper.Path()
      for ( let i = 100; i < 500;) {
        this.path.add(new paper.Point(i, 100))
        this.path.insert(0, new paper.Point(i, 0))
        i = i + 100
      }
      // const vector = new paper.Point({
      //   angle: -90,
      //   length: Math.PI * 200 / 4
      // })
      console.log('this.path---', this.path)
      this.getCenter(this.path.firstSegment.point, this.path.lastSegment.point)

      // this.modifyHead()
      // this.path.closed = true

      // this.modifyTrail()
      // this.path.strokeCap = 'round'
      // this.path.strokeColor = 'red'
      this.path.selected = true

    },
    // 根据向量vector，用户都连接两点
    // getCir(index1, index2, vector, path) {
    //   console.log('this.path', this.path)
    //   path.segments[index1].handleOut = vector
    //   // path.segments[index1].handleIn = vector.rotate(180)
    //   // path.segments[index2].handleOut = vector.rotate(180)
    //   path.segments[index2].handleIn = vector
    //   path.closed = true
    //   // path.segments[0].selected = true
    //   // path.segments[1].selected = true
      
      
    //   // const d = Math.PI * 200 / 4
    //   // console.log('d---', d)
    //   // const handle1 = new paper.Point({
    //   //   angle: -90,
    //   //   length: Number(d.toFixed(0))
    //   // });
            
    //   // this.wave = new paper.Path({
    //   //   segments: [
    //   //     [new paper.Point(100, 0), handle1.rotate(180), handle1],
    //   //     [new paper.Point(300, 0), handle1, handle1.rotate(180)],
    //   //   ],
    //   //   selected: true,
    //   //   closed: true
    //   // })
    //   // this.wave.segments[0].selected = true
    //   // this.wave.segments[1].selected = true
    //   // this.cir = new paper.Path.Circle(new paper.Point(200, 0), 100)
    //   // this.cir.fillColor = 'red'

    // },
    test() {
      // 问题
      // this.p1 = new paper.Path.Circle(new paper.Point(0), new paper.Size(100))
      // this.p1.fillColor = 'black'
      // this.p2 = new paper.Path.Circle(new paper.Point(10), new paper.Size(10))
      // this.p2.fillColor = 'red'
      // console.log('////////////////',this.p2.intersects(this.p1))
      // this.path1 = new paper.Path.Rectangle(new paper.Point(20), new paper.Size(60));
      // this.path1.fillColor = 'pink';

      // this.path2 = new paper.Path.Rectangle(new paper.Point(20), new paper.Size(20));
      // this.path2.fillColor = 'yellow';
        this.p = new paper.Path.Circle({
          center: new paper.Point(0),
          radius: 100,
          fillColor: getRandomColor(),
          name: 'hhvcg',
        })
        this.p.on('click', (item) => {
          console.log('click?????', item.target.name)
        })

        

        let x = Math.sqrt(100 * 100 / 2)
        let top = getCirclePoint(-80, 100)
        console.log('>>>>>',(new paper.Point(-80, top)).subtract(new paper.Point(-x, x)).angle)
        const vector = new paper.Point({
          angle: (new paper.Point(-80, top)).subtract(new paper.Point(-x, x)).angle,
          length: 100,
        })
        console.log('xxx',x)
        this.pp = new paper.Path.Arc({
          from: new paper.Point(-x,x),
          through: vector,
          to: new paper.Point(-80,top),
          strokeColor: 'black',
        })
        console.log('this.pp',this.pp)
        // constructor(center: Point, points: number, radius1: number, radius2: number)

        // this.ppp = new paper.Path.Star({
        //   center: new paper.Point(0),
        //   points: 5,
        //   radius1:50,
        //   radius2:20,
        //   strokeColor: 'green'
        // }) 
        // this.l = new paper.Path.Line({
        //     from: new paper.Point(0, -this.HEIGHT / 2),
        //     to: new paper.Point(0, this.HEIGHT / 2),
        //     // fullySelected: true
        //     strokeColor: 'black'
        //   })
        console.log('this.paper', this.paper)
      
    },
    // 绘制snake的step
    drawSnakeStep() {
      if (this.snake.x >= this.XY.x && this.snake.y >= this.XY.y) {
        this.snake.respo.forEach((brick) => {
          brick.fillColor = getRandomColor()
          console.log('this.paper--->', this.paper)
          console.log('this.snake.resp--->', this.snake.respo.length)
        })
        return
      }
      // 根据当前snake的xy绘制图形
      const brick = new paper.Path.Rectangle(new paper.Point(this.snake.x, this.snake.y), new paper.Size(this.SIZE, this.SIZE))
      brick.fillColor = getRandomColor()
      this.snake.respo.push(brick)

      if (Math.abs(this.snake.x + this.SIZE * this.snake.direction) <= this.XY.x) {
        this.snake.x += this.SIZE * this.snake.direction
      } else {
        this.snake.y += this.SIZE
        this.snake.direction = -this.snake.direction
      }
    },
    onFrame() {
      // this.drawSnakeStep()
    },
    // 铺砖函数
    drawBrick() {

    },
    moveHandler() {

    },
    onResize(event) {
      this.paper.project.activeLayer.removeChildren()
      // Transform the raster so that it fills the bounding rectangle
      // of the view:
      raster.fitBounds(this.paper.view.bounds, true)

      // Create a path that fills the view, and fill it with
      // the average color of the raster:
      new paper.Path.Rectangle({
        rectangle: this.paper.view.bounds,
        fillColor: raster.getAverageColor(this.paper.view.bounds),
        onMouseMove: this.moveHandler
      })
    },
    // 绘制当前paperjs画布的坐标系
    drawXY() {
      this.lineX = new paper.Path.Line({
        from: new paper.Point(0, -this.HEIGHT / 2),
        to: new paper.Point(0, this.HEIGHT / 2),
        // fullySelected: true
        strokeColor: 'black'
      })
      this.lineY = new paper.Path.Line({
        from: new paper.Point(-this.WIDTH / 2, 0),
        to: new paper.Point(this.WIDTH, 0),
        // fullySelected: true
        strokeColor: 'black'
      })
    },
    onMouseMove(e) {
      console.log('move>>>>', e)
      console.log('xxxx>>>>', this.X)
      this.X.set({
        position: e.point,
        length: 10000
      })
    },
    initWorld() {
      // 获取
      const canvas = this.$refs.main_canvas
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      // this.snake.x = -Math.floor(canvas.clientWidth / 2)
      // this.snake.y = -Math.floor(canvas.clientHeight / 2)
      paper.setup(canvas)
      this.paper = paper
      // this.paper.view.setCenter(0, 0)
      this.paper.view.onFrame = this.onFrame
      this.paper.view.setCenter(0,0)
      this.paper.view.onMouseMove = (e) => { this.onMouseMove(e) }

      // this.image.raster.fitBounds(this.paper.view.bounds, false)
      this.tool = new paper.Tool()
      this.tool.onMouseDown = (e) => {
        console.log('点击事件--->', e.point)
      }
      // 初始化世界
     const from = new paper.Point(0)
     const to = new paper.Point(100, 0)
      this.X = new paper.Path.Line({
        from: from, 
        to: to, 
        strokeColor: '#650D65'
      })  
      console.log('>>>', this.X)
      
      // this.image.raster.onLoad = () => {
      //   this.image.raster.fitBounds(this.paper.view.bounds, false)
      
      // }
      let cir = new paper.Path.Circle({
        center: new paper.Point(0),
        radius: 100,
        strokeColor: 'black'
      }) 
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  border: 1px solid gray;
  width: 100%;
  height: calc(100vh - 50px);
  padding: 10px;
  display: flex;
  // justify-content: center;
  align-items: center;
  flex-direction: column;
  &-text {
    width: 100%;
    height: 100px;
    border: 1px solid ghostwhite;
  }
  &-container {
    height: calc(100% - 100px);
    width: 100%;
    .main_canvas {
      width: 90%;
      height: 90%;
      background: gray;
    }
  }
}
</style>
