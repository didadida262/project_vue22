/*
 * @Author: Hhvcg
 * @Date: 2022-11-15 16:47:01
 * @LastEditors: -_-
 * @Description: ball类，包含坐标、速度、大小、颜色
 */
import paper from 'paper'

export class Ball {
  constructor(position, speed, radius, color) {
    this.position = position
    this.speed = speed
    this.radius = radius
    this.color = color
    this.createBall()
    this.addArbit()
  }
  createBall() {
    this.path = new paper.Path.Circle({
      radius: this.radius,
      fillColor: this.color,
      center: this.position,
      shadowColor: 'red',
      shadowOffset: new paper.Point(1),
      // 模糊距离
      shadowBlur: new paper.Point(50)
    })
  }
  rotate() {
    this.path.rotate(this.speed, new paper.Point(0))
  }
  addArbit() {
    new paper.Path.Circle({
      radius: this.position.getDistance(new paper.Point(0)),
      center: new paper.Point(0),
      strokeColor: 'white',
      dashArray: [2],
      opacity: 0.5
    })
  }
}
