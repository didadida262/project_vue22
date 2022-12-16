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
    // this.path.onFram = () => {
    //   const newCenter = this.path.position.add(this.vector.normalize())
    //   dot.path.set({
    //     position: newCenter
    //   })
    // }
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
}
