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
  constructor(center, radius, color) {
    this.center = center
    this.radius = radius
    this.color = color
    this.create()
  }
  create() {
    this.path = new paper.Path.Circle({
      center: this.center,
      radius: this.radius,
      fillColor: this.color,
      shadowColor: getRandomColor(),
      shadowOffset: new paper.Point(1),
      // 模糊距离
      shadowBlur: new paper.Point(20)
    })
  }
}
