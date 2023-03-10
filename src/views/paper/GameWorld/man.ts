import paper from 'paper'

const RADIUS: number = 10
const STROKEWIDTH: number = 10
export default class MatchMan {
  name: string;
  position: object;
  color: string;
  path: object;
  constructor(name: string, position: object, color: string) {
    this.name = name
    this.position = position
    this.color = color
  }
  initMatchMan() {
    console.log('create_matchman>>>>')
    this.path = new paper.Group({
      children: [
        // 头部
        new paper.Path.Circle({
          name: 'head',
          center: this.position,
          radius: RADIUS,
          strokeColor: this.color
        }),
        new paper.Path({
          strokeColor: this.color,
          strokeWidth: STROKEWIDTH,
          strokeCap: 'round',
          segments: [
          ]
        })
      ]
    })
  }
}