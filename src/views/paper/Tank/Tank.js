/*
 * @Author: Hhvcg
 * @Date: 2023-03-01 14:11:32
 * @LastEditors: -_-
 * @Description: 坦克类
 */
import paper from 'paper'

export class Tank {
  constructor(position) {
    this.position = position
    console.log('asdasdasd>>>', this.position)
    this.init()
  }
  init() {
    console.log('execute>>>')
    this.path = new paper.Group({
      children: [
        new paper.Path.Rectangle({
          center: this.position,
          size: new paper.Size(50),
          fillColor: 'green'
        }),
        new paper.Path.Line({
          from: this.position,
          to: new paper.Point(this.position.x, this.position.y - 50),
          strokeColor: 'red',
          strokeWidth: 5
        })
      ]
    })

    // this.path = new paper.Path.Circle({
    //   center: this.position,
    //   radius: this.radius
    // })
    // this.path.fillColor = this.color
  }
}
