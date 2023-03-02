<template>
  <div class="page-container">
    <h1>Tank</h1>
    <div class="view">
      <div class="operation flex-col">
        <div class="operation-info pd5">
          <p><strong>Some Informations</strong></p>
          <p>Role: 朱永灵</p>
          <p>Old: 27</p>
          <p>血槽: 100</p>
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
import tools from './tools'
export default {
  mixins: [tools],
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
      }
    }
  },
  watch: {},
  mounted() {
    this.init()
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
      const position = new paper.Point(this.WIDTH / 2, this.HEIGHT / 2)
      this.tank = new Tank(position)
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
    onKeyDown(e) {
      // fire
      if (e.key === 'space') {
        this.tank.fire()
      } else {
        this.tank.handleChangePosition(e)
      }
    },
    onMouseDown(e) {
      this.tank.fire()
    },
    onMouseDrag(e) {

    },
    onMouseMove(e) {
      const from = this.tank.path.children['base'].position
      // const t = new paper.Path.Circle({
      //   center: from,
      //   radius: 10,
      //   fillColor: 'red'
      // })
      const to = e.point
      const vector = e.point.subtract(from).normalize(60)
      this.tank.direction = vector
      const vector_end = this.tank.position.add(vector)
      const new_turret = new paper.Path([this.tank.position, vector_end])
      const turret = this.tank.path.children['turret']
      turret.replaceWith(new paper.Path(
        {
          name: 'turret',
          segments: [from, vector_end],
          strokeWidth: 5,
          strokeColor: 'white',
          strokeCap: 'round'
        }
      ))

      console.log('this.this.tank.path>>', this.tank.path)
      console.log('vector>>', vector)
    },
    onMouseUp(e) {

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
        const newP = ammunition.position.add(this.tank.direction)
        ammunition.position = newP.clone()
        // ammunition.position = new paper.Point(ammunition.position.x, ammunition.position.y - 10).clone()
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
