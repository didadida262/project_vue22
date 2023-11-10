// // 生成file的url
// export function obtainLocalUrlByFileData(fileData) {
//   const localUrl = URL.createObjectURL(new Blob([fileData.raw]))
//   return localUrl
// }


// /**
//  * @description: 解压zip取出csv文件获取数据
//  * @param {* zip-blob}
//  * @return {* data}
//  */
// export const dealZipDefectsFile = (data) => {
//   const startTime = Date.now()
//   // console.log('开始时间>>>', startTime)
//   // 解压
//   // eslint-disable-next-line new-cap
//   const zip = new jsZip()
//   zip.loadAsync(data).then((response) => {
//     const finiTime = Date.now()
//     // console.log('解压成功时间>>>', finiTime)
//     // console.log('解压成功,耗时>>>', finiTime - startTime)
//     const keys = Object.keys(response.files)
//     const csv = response.files[keys[0]]
//     csv.async('uint8array').then((data) => {
//       const blob = new File([data], csv.name)
//       Papa.parse(blob, {
//         header: true,
//         complete: (csvData) => {
//           const finiGetDataTime = Date.now()
//           // console.log('读取数据时间>>>', finiGetDataTime)
//           const t = finiGetDataTime - startTime
//           console.log('最终数据>>>', csvData)
//         }
//       })
//     })
//   })
// }

// // 返回media目录下的文件
// const getAllSongs = () => {
//   const mediaPath = path.join(__dirname, 'media')
//   let res = null
//   res = fs.readdirSync(mediaPathir).filter((item) => item.includes('.mp3'))
//   return res
// }

// // 中心点在坐标原点的圆，给定一个x值，返回上下点坐标
// export const getCirclePoint = (val, radius) => {
//   return Math.sqrt(Math.pow(radius, 2) - Math.pow(Math.abs(val), 2))
// }
