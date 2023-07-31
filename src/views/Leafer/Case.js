/*
 * @Author: Hhvcg
 * @Date: 2023-07-31 14:02:05
 * @LastEditors: Hhvcg
 */
import { Group, Rect, Image } from 'leafer-ui'

export class LeafsCase {
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
    console.time('leaf')
    let y, rect
    // 列
    for (let i = 1; i < 100; i++) {
      //   行
      for (let j = 1; j < 100; j++) {
        const image = new Image({
          url: require('@/assets/Sam.webp'),
          draggable: true
        })

        image.x = (i - 1) * 10 + 5
        image.y = (j - 1) * 10 + 5
        image.height = 10
        image.width = 10
        image.draggable = true
        group.add(image)
        image.loaded = () => {
          if (i === 99 && j === 99) {
            console.timeEnd('leaf')
          }
        }
      }
    }
  }
}
