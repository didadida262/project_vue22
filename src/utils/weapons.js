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
    console.log('this>>', this.that)
    console.log('this.num>>', this.that.num)
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
