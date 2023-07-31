/*
 * @Author: Hhvcg
 * @Date: 2023-07-31 14:02:05
 * @LastEditors: Hhvcg
 */
import paper from 'paper'

export class PaperCase {
  constructor(view, num) {
    this.createRects(0, 0, `hsl(${3},50%, 50%)`)
  }

  createRects(startX, startY, color) {
    console.time('paper')

    // 列
    for (let i = 1; i < 100; i++) {
      //   行
      for (let j = 1; j < 100; j++) {
        const curPosition = new paper.Point((i - 1) * 10 + 5, (j - 1) * 10 + 5)
        const rec = new paper.Rectangle({
          center: curPosition,
          size: [10, 10]
        })
        const image = new paper.Raster({
          position: curPosition,
          source: require('@/assets/Sam.webp')
        })
        image.onLoad = () => {
          image.fitBounds(rec, true)
          if (i === 99 && j === 99) {
            console.timeEnd('paper')
          }
        }
      }
    }
  }
}
