/*
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:12:11
 * @LastEditors: -_-
 * @Description:
 */
import paper from 'paper'
export class CyberFont {
  constructor(size, color, position, content, speed) {
    this.size = size
    this.color = color
    this.position = position
    this.content = content
    this.speed = speed
    this.createPath()
  }
  createPath() {
    this.path = new paper.PointText({
      point: this.position,
      content: this.content,
      fontSize: this.size,
      justification: 'right',
      fillColor: this.color
    })
  }
  run() {
    const WIDTH = paper.project.view.viewSize.width
    if (this.path.position.x + this.speed + 50 >= WIDTH) {
      this.path.position = this.path.position.subtract(WIDTH, 0)
    } else {
      this.path.position = this.path.position.add(this.speed, 0)
    }
  }
}

