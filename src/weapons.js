/*
 * @Author: Hhvcg
 * @Date: 2022-05-26 16:51:11
 * @LastEditors: -_-
 * @Description: 生成随机颜色
 */

export const getRandomColor = () => {
  // rgba(x,y,z,透明度)
  let r = Math.floor(Math.random() * 256)
  let g = Math.floor(Math.random() * 256)
  let b = Math.floor(Math.random() * 256)
  let t = Math.random().toFixed(1)
  return `rgba(${r}, ${g}, ${b}, ${t})`
}
