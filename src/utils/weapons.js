
/*
 *                        .::::.
 *                      .::::::::.
 *                     :::::::::::
 *                  ..:::::::::::'
 *               '::::::::::::'
 *                 .::::::::::
 *            '::::::::::::::..
 *                 ..::::::::::::.
 *               ``::::::::::::::::
 *                ::::``:::::::::'        .:::.
 *               ::::'   ':::::'       .::::::::.
 *             .::::'      ::::     .:::::::'::::.
 *            .:::'       :::::  .:::::::::' ':::::.
 *           .::'        :::::.:::::::::'      ':::::.
 *          .::'         ::::::::::::::'         ``::::.
 *      ...:::           ::::::::::::'              ``::.
 *     ````':.          ':::::::::'                  ::::..
 *                        '.:::::'                    ':'````..
 * 
 * @Author: Hhvcg
 * @Date: 2022-02-28 10:07:23
 * @LastEditors: -_-
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

/**
 * @description: 比特转换器  
 * @param {*} name 名称
 * @param {*} bytes 比特值大小
 * @return {*} MB单位值
 */
 export const formatBytes = (name, bytes) => {
    return name + ': '+ (bytes / 1024 / 1024 ).toFixed(2) + ' MB '
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

