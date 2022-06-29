/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: dadadad
 */
import axios from '@/utils/request'

// export function login(params) {
//   return request.post('/signIn', params)
// }

// export function getInfo(params) {
//   return request.get('/getInfo', {token: params})
// }

// export function getMusic() {
//   return request.get('/music')
// }

export default {
  getMusic() {
    return axios.get('/music')
  },
  getImg() {
    return axios.get('/img')
  }
}