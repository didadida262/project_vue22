<template>
  <div class="app-container">
    <h1>Tank</h1>
    <canvas id="tank" ref="tank" resize class="tank" />
  </div>
</template>

<script>
import paper from "paper";
import { Bomb } from "./Bomb";
export default {
  data() {
    return {
      GUNWIDTH: 10,
      GUNHEIGHT: 100,
      BOTTOMWIDTH: 300,
      BOTTOMHEIGHT: 40,
      // 炮弹库
      bombs: [],
      paper: null,
      role: {
        name: "hhvcg",
        blood: "",
        // 底座300x100
        bottom: null,
        // 炮管50x100
        gun: null,
      },
      tool: null,
    };
  },
  watch: {},
  mounted() {
    this.init();
    console.log("this.role.gun", this.role.gun);
  },

  methods: {
    updateBottom(point) {
      this.role.bottom.position = this.role.bottom.position.add(point).clone();
      this.role.gun.position = this.role.gun.position.add(point).clone();
    },
    init() {
      const canvas = this.$refs.tank;
      // canvas的dom节点给到paper装载
      this.paper = paper;
      this.paper.setup(canvas);

      // 将视图的远点置于底部中间，方便后续炮塔等的向量计算
      this.paper.view.setCenter(0, -canvas.clientHeight / 2);

      this.paper.view.onFrame = this.onFrame;
      this.tool = new this.paper.Tool();
      this.tool.onKeyDown = (e) => {
        // console.log('-----',e)
        switch (e.key) {
          // fire！！！
          case "space":
            this.bombs.push(
              new Bomb(
                new this.paper.Point(
                  this.role.gun.position.x,
                  this.role.gun.position.y - this.GUNHEIGHT / 2 - 5
                ),
                10
              )
            );
            break;
          case "left":
            console.log("left");
            this.updateBottom(new paper.Point(-8, 0));
            break;
          case "right":
            console.log("right");
            this.updateBottom(new paper.Point(8, 0));
            break;
          case "up":
            console.log("up");
            break;
          case "down":
            console.log("down");
            break;
        }

        // if (e.key === 'space') {
        //   // 发射
        //   this.bombs.push(new Bomb(new this.paper.Point(this.role.gun.position.x, this.role.gun.position.y - this.GUNHEIGHT / 2 - 5), 10))
        // }
      };
      this.tool.onMouseMove = (e) => {
        const vector = e.point.subtract(this.role.gun.position).normalize();
        // console.log('vvvb-', vector)
        console.log('----------------->',this.role.gun.position.getAngle(e.point))
        console.log('--------getAngleInRadians--------->',this.role.gun.position.getAngleInRadians(e.point))
        
        // this.role.gun.rotate(
        //   1,
        //   // Math.abs(vector.angle),
        //   this.role.gun.position
        // );
      };
      this.tool.onMouseDown = (e) => {
        console.log("e.point---->", e.point);
        console.log("e.downPoint---->", e.downPoint);
      };
      console.log("初始化坦克世界");
      this.role.bottom = new this.paper.Path.Rectangle(
        -this.BOTTOMWIDTH / 2, - this.BOTTOMHEIGHT,      
        this.BOTTOMWIDTH,
        this.BOTTOMHEIGHT
      );
      this.role.bottom.fillColor = "green";
      this.role.gun = new this.paper.Path.Rectangle(
        this.role.bottom.position.x - this.GUNWIDTH / 2,
        this.role.bottom.position.y - this.GUNHEIGHT - this.BOTTOMHEIGHT / 2,
        this.GUNWIDTH,
        this.GUNHEIGHT
      );
      this.role.gun.fillColor = "red";
      console.log(".....", this.role.gun);
    },
    onFrame() {
      for (let bomb of this.bombs) {
        bomb.update();
      }
    },
  },
};
</script>
<style scoped>
.tank {
  background: black;
  height: 80vh;
  width: 80vw;
}
</style>
