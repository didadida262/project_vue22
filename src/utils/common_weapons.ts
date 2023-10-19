/*
 * @Author: Hhvcg
 * @Date: 2022-05-26 16:51:11
 * @LastEditors: hhvcg 719713496@qq.com
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