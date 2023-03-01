/*
 * @Author: Hhvcg
 * @Date: 2023-03-01 14:11:32
 * @LastEditors: -_-
 * @Description: 坦克类
 */
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons'
const SIZE = 50
export class Tank {
  constructor(position) {
    this.position = position
    this.AmmunitionDepo = []
    this.ammunitionSize = 5
    this.step = 10
    console.log('asdasdasd>>>', this.position)
    this.init()
  }
  init() {
    console.log('execute>>>')
    this.path = new paper.Group({
      children: [

        new paper.Path.Rectangle({
          center: this.position,
          size: new paper.Size(SIZE),
          fillColor: getRandomColor()
        }),
        new paper.Path.Line({
          from: this.position,
          to: new paper.Point(this.position.x, this.position.y - 60),
          strokeColor: getRandomColor(),
          strokeWidth: 5
        }),
        new paper.Path.Circle({
          radius: SIZE / 4,
          center: this.position,
          fillColor: getRandomColor()
        })

      ]
    })

    // this.path = new paper.Path.Circle({
    //   center: this.position,
    //   radius: this.radius
    // })
    // this.path.fillColor = this.color
  }
  // 根据方向命令改变tank位置
  handleChangePosition(order) {
    if (order === 'left') {
      const newP = new paper.Point(this.path.position.x - this.step, this.path.position.y)
      this.path.position = newP.clone()
    } else if (order === 'right') {
      const newP = new paper.Point(this.path.position.x + this.step, this.path.position.y)
      this.path.position = newP.clone()
    } else if (order === 'up') {
      const newP = new paper.Point(this.path.position.x, this.path.position.y - this.step)
      this.path.position = newP.clone()
    } else if (order === 'down') {
      const newP = new paper.Point(this.path.position.x, this.path.position.y + this.step)
      this.path.position = newP.clone()
    }
    this.position = this.path.position
  }
  fire() {
    console.log('fire>>>')
    const ammunition = new paper.Path.Circle({
      center: this.position,
      radius: this.ammunitionSize,
      fillColor: 'orange'
    })
    this.AmmunitionDepo.push(ammunition)
  }
  update(order) {

  }
}
