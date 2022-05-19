import paper from 'paper'

export class Bomb {
  constructor(position, radius) {
    this.position = position
    this.radius = radius
    this.init()
  }
  init() {
    this.path = new paper.Path.Circle({
      center: this.position,
      radius: this.radius
    })
    this.path.fillColor = 'blue'
  }
  update(speed) {
    this.position = this.path.position.add(new paper.Point(0, -speed))
    this.path.position = this.position.clone()
  }
}