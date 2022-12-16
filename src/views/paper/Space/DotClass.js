/*
 * @Author: Hhvcg
 * @Date: 2022-12-15 18:02:15
 * @LastEditors: -_-
 * @Description: {
 * }
 */
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons'

export class Dot {
  constructor(center, radius, color, thePath) {
    this.center = center
    this.radius = radius
    this.color = color
    this.blurFlag = 1
    this.create()
  }
  create() {
    this.path = new paper.Path.Circle({
      center: this.center,
      radius: this.radius,

      shadowColor: this.color,
      shadowOffset: new paper.Point(1),
      // 模糊距离
      shadowBlur: new paper.Point(this.radius * 2)
    })
    this.path.set({
      fillColor: {
        gradient: {
          stops: [['white', 0.1], [this.color, 0.6], ['black', 1]],
          // stops: [['white', 0.1], [this.color, 1]],
          radial: true
        },
        origin: this.path.bounds.center,
        destination: this.path.bounds.rightCenter
      }
    })
  }
  run() {
    const currentBlur = this.path.shadowBlur
    if (currentBlur.x < 5) {
      this.blurFlag = -1
    }
    if (currentBlur.x > this.radius * 3) {
      this.blurFlag = 1
    }
    this.path.set({
      shadowBlur: currentBlur.subtract(1 * this.blurFlag)
    })

    // const newCenter = this.path.position.add(this.vector.normalize())
    // this.path.set({
    //   position: newCenter
    // })
  }
}
