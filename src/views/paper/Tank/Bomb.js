import paper from 'paper'

export class Bomb {
  constructor(position, radius, color) {
    this.position = position
    this.radius = radius
    this.color = color
    this.init()
  }
  init() {
    this.path = new paper.Path.Circle({
      center: this.position,
      radius: this.radius
    })
    this.path.fillColor = this.color
  }
  update(speed) {
    this.position = this.path.position.add(new paper.Point(0, -speed))
    this.path.position = this.position.clone()
  }
}