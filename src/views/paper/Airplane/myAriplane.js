/*
 * @Author: Hhvcg
 * @Date: 2022-06-13 13:55:14
 * @LastEditors: -_-
 * @Description: B2----Class
 */
import paper from 'paper'
import { getRandomColor } from '@/utils/weapons.js'

// Ariplane暂时拥有position，color自有属性
export class Ariplane {
  constructor (point, color) {
    this.path = null
    this.position = point
    this.pathData = this.getPathData()
    this.color = getRandomColor()
    this.createAirplane()
  }
  createAirplane() {
    this.path = new paper.Path([0, 0], [20, 20],[16, 22], [11, 15], [8, 16], [4, 12], [0, 20], [-4, 12], [-8, 16], [-11, 15], [-16, 22], [-20, 20])
    this.path.fillColor = this.color
  }
  getPathData() {

  }
}
