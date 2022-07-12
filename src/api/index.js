/*
 * @Author: Hhvcg
 * @Date: 2022-06-29 11:24:01
 * @LastEditors: -_-
 * @Description: axios
 */

import toys from './toys'
import user from './user'
import form from './form'

const apis =  {
  ...toys,
  ...user,
  ...form
}

// 直接通过this.$axios.xxx().then(() => {}) 的形式调用
// 在main.ts 中绑定到了Vue.prototype

export default apis
