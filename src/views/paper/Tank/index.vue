<template>
  <div class="page-container">
    <titleTemplate title="Tank" />
    <div class="view">
      <div class="operation flex-col">
        <div class="operation-info pd5">
          <p><strong>Some Informations</strong></p>
          <p>Role: 旅途图</p>
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
import titleTemplate from '@/components/titleTemplate.vue'
import { getRandomPoint, getRandomDirection } from '@/utils/paperWeaponTS.ts'

export default {
  mixins: [tools],
  components: {
    titleTemplate
  },
  data() {
    return {
      url: require('@/assets/tank_laiyin.jpg'),
      WIDTH: null,
      HEIGHT: null,
      title: 'tank',
      enemies: [],
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
    this.initEnemy()
    console.log('初始化坦克世界')
    console.log('this.paper>>>', this.paper)
  },
  computed: {
    currentProject() {
      return this.paper.projects.filter((_p) => _p.name === this.title)[0]
    }
  },
  methods: {
    random() {
      return paper.Point.random().multiply(this.WIDTH, this.HEIGHT)
    },
    initEnemy() {
      for (let i = 0; i < 6; i++) {
        const position = getRandomPoint(this.currentProject)
        // const end = new paper.Point(position.x, position.y - 50)
        this.enemies.push(new Tank(position, 'red'))
      }
    },
    initRole() {
      const position = getRandomPoint(this.currentProject)
      const end = getRandomDirection(position, 50)
      const direction = end.subtract(position)
      this.tank = new Tank(position, 'white', direction)
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
      console.log(e)
      // fire
      if (e.key === 'space') {
        this.tank.fire()
      } else {
        this.tank.handleChangePosition(e, this.WIDTH, this.HEIGHT)
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
      const vector = e.point.subtract(from).normalize(60)
      this.tank.direction = vector
      const vector_end = from.add(vector)
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
    },
    onFrame() {
      this.tank.AmmunitionDepo.forEach((ammunition) => {
        // 若越界，消除之
        let newP = ammunition.path.position.add(this.tank.direction)
        if (!this.judeBoundary(newP)) {
          ammunition.updateLocation(newP)
        } else {
          ammunition.path.remove()
          ammunition = null
        }
        newP = null
        // ammunition.position = new paper.Point(ammunition.position.x, ammunition.position.y - 10).clone()
      })

      this.enemies.forEach((enemy) => {
        enemy.autoRun(this.tank.path.position)
      })
    },
    judeBoundary(position) {
      if (position.x <= 0 || position.x >= this.WIDTH || position.y <= 0 || position.y >= this.HEIGHT) {
        return true
      } else {
        return false
      }
    }
  },
  beforeDestroy() {
    if (this.currentProject) {
      this.currentProject.remove()
    }
    if (this.paper) {
      this.paper = null
    }
  }
}
</script>
<style scoped lang="scss">
.page-container {
  width: 100%;
  height: 100%;
  .view {
    width: 100%;
    height: calc(100% - 80px);
    display: flex;
    justify-content: space-around;
    align-items: center;
    .operation {
      padding: 10px;
      height: 100%;
      width: 250px;
      border: 1px solid ghostwhite;
      &-info {
        height: calc(100% - 110px);
        border: 1px solid ghostwhite;
        box-shadow: 0px 0px 5px #888888;
        border-radius: 5px;
      }
      &-btn {
        height: 50px;
        border: 1px solid ghostwhite;
      }
    }
    .tank {
      background: black;
      height: 80vh;
      width: calc(100% - 260px);
    }
  }

}

</style>
