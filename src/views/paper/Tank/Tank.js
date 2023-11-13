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
  constructor(position, color, direction) {
    this.color = color
    this.direction = direction
    this.path = null
    this.position = position
    this.AmmunitionDepo = []
    this.ammunitionSize = 5
    this.step = 10
    this.init()
  }
  autoRun(position) {
    this.direction = position.subtract(this.path.position).clone()
    this.updateTurret()
  }
  updateTurret() {
    const vector = this.direction.normalize(50).clone()
    const vector_end = this.path.children['base'].position.add(vector).clone()
    const turret = this.path.children['turret']
    turret.replaceWith(new paper.Path(
      {
        name: 'turret',
        segments: [this.path.children['base'].position, vector_end],
        strokeWidth: 5,
        strokeColor: this.color,
        strokeCap: 'round'
      }
    ))
    this.path.position = this.path.position.add(this.direction.normalize()).clone()
  }
  init() {
    this.path = new paper.Group({
      children: [
        new paper.Path.Rectangle({
          name: 'base',
          center: this.position,
          size: new paper.Size(SIZE),
          strokeColor: this.color
        }),
        new paper.Path({
          name: 'turret',
          segments: [this.position, this.position.add(this.direction)],
          strokeWidth: 5,
          strokeColor: this.color,
          strokeCap: 'round'

        }),
        new paper.Path.Circle({
          radius: SIZE / 4,
          center: this.position,
          fillColor: this.color
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
