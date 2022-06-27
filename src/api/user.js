/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: 
 */
import request from '@/utils/request'

// 
export function login(params) {
  return request.post('/signIn', params)
}

export function getInfo(params) {
  return request.get('/getInfo', {token: params})
}
// export function getInfo(token) {
//   return request({
//     url: '/vue-admin-template/user/info',
//     method: 'get',
//     params: { token }
//   })
// }

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
