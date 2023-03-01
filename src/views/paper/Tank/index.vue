<template>
  <div class="page-container">
    <h1>Tank</h1>
    <div class="view">
      <div class="operation flex-col">
        <div class="operation-info pd5">
          <p>Some Informations</p>
          <p>Role: ...</p>
          <p>Role: ...</p>
          <p>Role: ...</p>
          <p>Role: ...</p>
        </div>
        <div class="operation-btn flex-cb pd5">
          <el-button size="mini" @click="changeSpeed(true)">Speed_up!</el-button>
          <el-button size="mini" class="mgt" @click="changeSpeed(false)">Speed_down!</el-button>
        </div>
      </div>
      <canvas id="tank" ref="tank" resize class="tank" />
    </div>
  </div>
</template>

<script>
import paper from 'paper'
import { Bomb } from './Bomb'
export default {
  data() {
    return {
      title: 'tank',
      colors: ['#80FFA5'],
      GUNWIDTH: 10,
      GUNHEIGHT: 100,
      BOTTOMWIDTH: 300,
      BOTTOMHEIGHT: 40,
      // 炮弹库
      bombs: [],
      paper: null,
      role: {
        speed: 10,
        name: 'hhvcg',
        blood: '',
        // 底座300x100
        bottom: null,
        // 炮管50x100
        gun: null
      },
      tool: null
    }
  },
  watch: {},
  mounted() {
    this.init()
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  methods: {
    // 变更gun的火力(速度)
    changeSpeed(flag) {
      if (flag) {
        this.role.speed += 10
      } else {
        if (this.role.speed === 10) return
        this.role.speed -= 10
      }
    },
    updateBottom(point) {
      this.role.bottom.position = this.role.bottom.position.add(point).clone()
      this.role.gun.position = this.role.gun.position.add(point).clone()
    },
    init() {
      const canvas = this.$refs.tank
      // canvas的dom节点给到paper装载
      this.paper = paper
      this.paper.setup(canvas)

      // 将视图的远点置于底部中间，方便后续炮塔等的向量计算
      this.paper.view.setCenter(0, -canvas.clientHeight / 2)

      this.paper.view.onFrame = this.onFrame
      this.tool = new this.paper.Tool()
      this.tool.onKeyDown = (e) => {
        // console.log('-----',e)
        switch (e.key) {
          // fire！！！
          case 'space':
            this.bombs.push(
              new Bomb(
                new this.paper.Point(
                  this.role.gun.position.x,
                  this.role.gun.position.y - this.GUNHEIGHT / 2 - 5
                ),
                10,
                this.colors[0]
              )
            )
            break
          case 'left':
            console.log('left')
            this.updateBottom(new paper.Point(-8, 0))
            break
          case 'right':
            console.log('right')
            this.updateBottom(new paper.Point(8, 0))
            break
          case 'up':
            console.log('up')
            break
          case 'down':
            console.log('down')
            break
        }

        // if (e.key === 'space') {
        //   // 发射
        //   this.bombs.push(new Bomb(new this.paper.Point(this.role.gun.position.x, this.role.gun.position.y - this.GUNHEIGHT / 2 - 5), 10))
        // }
      }
      this.tool.onMouseMove = (e) => {
        // const vector = e.point.subtract(this.role.gun.position).normalize();
      }
      this.tool.onMouseDown = (e) => {
        console.log('e.point---->', e.point)
        console.log('e.downPoint---->', e.downPoint)
      }
      console.log('初始化坦克世界')
      this.role.bottom = new this.paper.Path.Rectangle(
        -this.BOTTOMWIDTH / 2, -this.BOTTOMHEIGHT,
        this.BOTTOMWIDTH,
        this.BOTTOMHEIGHT
      )
      this.role.bottom.fillColor = 'black'
      this.role.gun = new this.paper.Path.Rectangle(
        this.role.bottom.position.x - this.GUNWIDTH / 2,
        this.role.bottom.position.y - this.GUNHEIGHT - this.BOTTOMHEIGHT / 2,
        this.GUNWIDTH,
        this.GUNHEIGHT
      )
      this.role.gun.fillColor = this.colors[0]
    },
    onFrame() {
      this.role.gun.rotate(this.role.speed, this.role.gun.position)
      for (const bomb of this.bombs) {
        bomb.update(this.role.speed)
      }
    }
  },
  beforeDestroy() {
    const currentProject = this.paper.projects.filter((_p) => _p.name === this.title)[0]
    if (currentProject) {
      currentProject.remove()
    }
    if (this.paper) {
      this.paper = null
    }
  }
}
</script>
<style scoped lang="scss">
.page-container {
  .view {
    display: flex;
    justify-content: space-around;
    align-items: center;
    .operation {
      padding: 10px;
      height: 80vh;
      width: 10vw;
      border: 1px solid gray;
      &-info {
        height: calc(100% - 110px);
        border: 1px solid gray;
      }
      &-btn {
        height: 50px;
        border: 1px solid gray;
      }
    }
    .tank {
      background: black;
      height: 80vh;
      width: 80vw;
    }
  }

}

</style>
