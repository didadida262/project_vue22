/*
 * @Author: Hhvcg
 * @Date: 2023-03-01 14:11:32
 * @LastEditors: -_-
 * @Description: 坦克类
 */
import paper from 'paper'
import { Ammunition } from './AmmunitionDepo'
// import { getRandomColor } from '@/utils/weapons'
const SIZE = 50
export class TankV2 {
  constructor(position, color) {
    this.color = color
    this.position = position
    this.init()
  }
  autoRun(direction) {
    this.move(direction)
  }
  move(direction) {
    // const nextPosition = new paper.Point(5 * this.position.length * 0.5)
    // const nextPosition = new paper.Point.random().multiply(500)

    // console.log('nextPosition>>>', direction)
    // this.path.set({
    //   position: direction
    // })
    // this.position = direction.clone()
  }
  init() {
    this.path = new paper.Group({
      children: [
        new paper.Path.Rectangle({
          name: 'base',
          center: this.position,
          size: new paper.Size(SIZE),
          strokeColor: this.color
        })
      ]
    })
  }
}
