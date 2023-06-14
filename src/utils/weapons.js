/*
 * @Author: Hhvcg
 * @Date: 2022-06-01 19:41:20
 * @LastEditors: Hhvcg
 * @Description: 军武库
 */

// const fs = require('fs')
// const path = require('path')
// const crypto = require('crypto')
// const jwt = require('jsonwebtoken');

// // 用户信息加密处理
// export const crp = (userInfo) => {
//     const userInfoStr = userInfo.userName + userInfo.password
//     const hash = crypto
//         .createHash('sha1')
//         .update(userInfoStr)
//         .digest('hex')
//     return hash
// }

// // 对成加密
// export const secretA = (userInfo) => {
//     const token = jwt.sign(userInfo, 'shhhhh')
//     console.log('揭秘:', jwt.verify(token, 'shhhhh'))
//     return token
// }

export class Timer {
  constructor(num) {
    this.num = num
    this.speed = 1
    this.that = this
  }
  start() {
    console.log('start>>')
    this.run()
  }
  run() {
    console.log('run>>')
    console.log('this>>',this.that)
    console.log('this.num>>',this.that.num)
    if (this.that.num === 0) {
      console.log('over>>>')
      return
    }
    if (this.that.speed + 1 === 60) {
      this.that.speed = 1
      this.that.num--
      console.log('倒计时>>', this.that.num)
    }
    this.that.speed++
    console.log('this.num>>',this.that.num)
    console.log('======')

    requestAnimationFrame(this.that.run)
  }
}

/**
 * @description: 比特转换器
 * @param {*} name 名称
 * @param {*} bytes 比特值大小
 * @return {*} MB单位值
 */
export const formatBytes = (name, bytes) => {
  return name + ': ' + (bytes / 1024 / 1024).toFixed(2) + ' MB '
}

export const formatTime = (name, time) => {
  return time / 1000 + 's'
}

/**
 * @description: 程序耗时检测器
 * @param {*} 输出名称
 * @param {*} fn
 * @return {*} 输出程序用时
 */
export const costTime = (name, fn) => {
  console.time(name)
  fn()
  console.timeEnd(name)
}

// 返回media目录下的文件
const getAllSongs = () => {
  const mediaPath = path.join(__dirname, 'media')
  let res = null
  res = fs.readdirSync(mediaPathir).filter((item) => item.includes('.mp3'))
  return res
}

// 中心点在坐标原点的圆，给定一个x值，返回上下点坐标
export const getCirclePoint = (val, radius) => {
  return Math.sqrt(Math.pow(radius, 2) - Math.pow(Math.abs(val), 2))
}

/*
 * @Author: Hhvcg
 * @Date: 2022-05-26 16:51:11
 * @LastEditors: -_-
 * @Description: 生成随机颜色
 */

export const getRandomColor = () => {
  // rgba(x,y,z,透明度)
  const r = Math.floor(Math.random() * 256)
  const g = Math.floor(Math.random() * 256)
  const b = Math.floor(Math.random() * 256)
  const t = Math.random().toFixed(1)
  return `rgba(${r}, ${g}, ${b}, ${t})`
}
// 给定圆内任意一点，返回两条以该点原中心点的两条直线数据
export const getLineData = (point, radius) => {
  // 通过点坐标的y，获得塬上的两点(-x, y) (x, y)
  const X = getAnotherPoint(point.y, radius)
  const Y = getAnotherPoint(point.x, radius)
  return [
    // 横轴
    {
      one: [-X, point.y],
      two: [X, point.y]
    },
    // 纵轴
    {
      one: [point.x, -Y],
      two: [point.x, Y]
    }
  ]
}

// 中心点在坐标原点的圆，给定一个坐标值及radius，返回另一坐标值
export const getAnotherPoint = (val, radius) => {
  return Math.sqrt(Math.pow(radius, 2) - Math.pow(Math.abs(val), 2))
}

/**
 * @description: 解压zip取出csv文件获取数据
 * @param {* zip-blob}
 * @return {* data}
 */
export const dealZipDefectsFile = (data) => {
  const startTime = Date.now()
  // console.log('开始时间>>>', startTime)
  // 解压
  // eslint-disable-next-line new-cap
  const zip = new jsZip()
  zip.loadAsync(data).then((response) => {
    const finiTime = Date.now()
    // console.log('解压成功时间>>>', finiTime)
    // console.log('解压成功,耗时>>>', finiTime - startTime)
    const keys = Object.keys(response.files)
    const csv = response.files[keys[0]]
    csv.async('uint8array').then((data) => {
      const blob = new File([data], csv.name)
      Papa.parse(blob, {
        header: true,
        complete: (csvData) => {
          const finiGetDataTime = Date.now()
          // console.log('读取数据时间>>>', finiGetDataTime)
          const t = finiGetDataTime - startTime
          console.log('最终数据>>>', csvData)
        }
      })
    })
  })
}
