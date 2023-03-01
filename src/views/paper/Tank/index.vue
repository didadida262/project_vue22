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
// import { Bomb } from './Bomb'
import { Tank } from './Tank'
export default {
  data() {
    return {
      url: require('@/assets/tank_laiyin.jpg'),
      WIDTH: null,
      HEIGHT: null,
      title: 'tank',
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
    this.initTool()
    this.initRole()
    console.log('this.currentProject', this.currentProject)
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  methods: {
    initRole() {
      console.log('initRole>>>')
      const position = new paper.Point(this.WIDTH / 2, this.HEIGHT / 2)
      console.log('position>>>', position)
      this.tank = new Tank(position)
      console.log('tank>>>', this.tank)
    },
    // 绘制tank---图片
    initRolePic() {
      const raster = new paper.Raster({
        position: new paper.Point(this.WIDTH / 2, this.HEIGHT / 2),
        source: this.url
      })
      raster.onLoad = () => {
        console.log('加载完成')
        const rec = new paper.Rectangle({
          center: new paper.Point(this.WIDTH / 2, this.HEIGHT / 2),
          size: new paper.Size(100)
        })
        raster.fitBounds(rec, true)
        // raster.set({
        //   width: 300,
        //   heigth: 300
        // })
      }
    },
    handleKeyDown(e) {
      switch (e.key) {
        case 'left':
          this.tank.handleChangePosition('left')
          break
        case 'right':
          this.tank.handleChangePosition('right')
          break
        case 'up':
          this.tank.handleChangePosition('up')
          break
        case 'down':
          this.tank.handleChangePosition('down')
          break
        // fire
        case 'space':
          this.tank.fire()
      }
    },
    initTool() {
      this.tool = new this.paper.Tool()
      this.tool.onKeyDown = this.handleKeyDown
      this.tool.onMouseMove = (e) => {
        // const vector = e.point.subtract(this.role.gun.position).normalize();
      }
      this.tool.onMouseDown = (e) => {
        console.log('e.point---->', e.point)
        console.log('e.downPoint---->', e.downPoint)
      }
    },
    // 变更gun的火力(速度)
    changeSpeed(flag) {
      if (flag) {
        this.role.speed += 10
      } else {
        if (this.role.speed === 10) return
        this.role.speed -= 10
      }
    },
    init() {
      const canvas = this.$refs.tank
      this.WIDTH = canvas.clientWidth
      this.HEIGHT = canvas.clientHeight
      // canvas的dom节点给到paper装载
      this.paper = paper
      this.paper.setup(canvas)
      this.paper.project.name = this.title

      // 将视图的远点置于底部中间，方便后续炮塔等的向量计算
      this.paper.view.onFrame = this.onFrame
      console.log('初始化坦克世界')
    },
    onFrame() {
      this.tank.AmmunitionDepo.forEach((ammunition) => {
        ammunition.position = new paper.Point(ammunition.position.x, ammunition.position.y - 10).clone()
      })
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
