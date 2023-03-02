/*
 * @Author: Hhvcg
 * @Date: 2023-03-01 14:11:32
 * @LastEditors: -_-
 * @Description: 坦克类
 */
import paper from 'paper'
import { Ammunition } from './AmmunitionDepo'
// import { getRandomColor } from '@/utils/weapons'
const SIZE = 50
export class Tank {
  constructor(position) {
    this.direction = null
    this.path = null
    this.position = position
    this.AmmunitionDepo = []
    this.ammunitionSize = 5
    this.step = 10
    console.log('asdasdasd>>>', this.position)
    this.init()
    this.initDirec()
  }
  initDirec() {
    const turret_end = new paper.Point(this.position.x, this.position.y - 60)
    this.direction = turret_end.subtract(this.position)
  }
  init() {
    console.log('execute>>>')
    this.path = new paper.Group({
      children: [
        new paper.Path.Rectangle({
          name: 'base',
          center: this.position,
          size: new paper.Size(SIZE),
          strokeColor: 'white'
        }),
        new paper.Path({
          name: 'turret',
          segments: [this.position, new paper.Point(this.position.x, this.position.y - 60)],
          strokeWidth: 5,
          strokeColor: 'white',
          strokeCap: 'round'

        }),
        new paper.Path.Circle({
          radius: SIZE / 4,
          center: this.position,
          fillColor: 'white'
        })
      ]
    })
  }
  judeBoundary(position, width, height) {
    if (position.x <= 0 || position.x >= width || position.y <= 0 || position.y >= height) {
      return true
    } else {
      return false
    }
  }
  // 根据方向命令改变tank位置
  handleChangePosition(e, width, height) {
    let newP = null
    if (e.key === 'left' || e.key === 'a') {
      newP = new paper.Point(this.path.position.x - this.step, this.path.position.y)
    } else if (e.key === 'right' || e.key === 'd') {
      newP = new paper.Point(this.path.position.x + this.step, this.path.position.y)
    } else if (e.key === 'up' || e.key === 'w') {
      newP = new paper.Point(this.path.position.x, this.path.position.y - this.step)
    } else if (e.key === 'down' || e.key === 's') {
      newP = new paper.Point(this.path.position.x, this.path.position.y + this.step)
    }
    if (!this.judeBoundary(newP, width, height)) {
      this.path.position = newP
      this.position = this.path.position
    }
    newP = null
  }
  fire() {
    const ammunition = new Ammunition(this.position, 'circle', 5, 'orange')
    this.AmmunitionDepo.push(ammunition)
  }
  update(order) {
  }
}
