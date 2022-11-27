/*
 * @Author: Hhvcg
 * @Date: 2022-11-27 17:12:11
 * @LastEditors: -_-
 * @Description:
 */
import paper from 'paper'
export class CyberFont {
  constructor(size, color, position, content) {
    this.size = size
    this.color = color
    this.position = position
    this.content = content
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
}

