/*
 * @Author: Hhvcg
 * @Date: 2023-07-31 14:02:05
 * @LastEditors: Hhvcg
 */
import { Leafer, Group, Rect, Debug } from 'leafer-ui'

export class RectsCase {
  constructor(view, num) {
    let group
    const groupSize = 10 * 100 * 1.5
    const column = num > 25 ? 10 : 5

    for (let i = 0; i < num; i++) {
      group = new Group()
      group.x = groupSize * (i % column)
      group.y = groupSize * Math.floor(i / column)
      view.add(group)
      this.createRects(group, 0, 0, `hsl(${i * 3},50%, 50%)`)
    }
  }

  createRects(group, startX, startY, color) {
    let y, rect
    // 列
    for (let i = 0; i < 170; i++) {
      if (i % 10 === 0) startX += 10
      y = startY
      //   行
      for (let j = 0; j < 80; j++) {
        if (j % 10 === 0) y += 10
        rect = new Rect()
        rect.x = startX
        rect.y = y
        rect.height = 10
        rect.width = 10
        rect.fill = color
        rect.draggable = true
        group.add(rect)
        y += 12
      }
      startX += 12
    }
  }
}
