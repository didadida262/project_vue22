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
    return axios({
      method: 'get',
      responseType: 'arraybuffer',
      url: '/img'
    })
  },
  getMedia(index) {
    return axios({
      method: 'get',
      responseType: 'blob',
      url: '/music/',
      params: {
        index: index
      }
    })
  },
  getSongs() {
    return axios.get('/songs/list')
  },

  getAllChars() {
    return axios.get('/getAllChar')
  },






  getCates() {
    return axios.get('/getCates')
  },

  getVideosList(params) {
    return axios.post('/getVideosList', params)
  },
  getVideo(params) {
    return axios({
      url: '/getVideo',
      responseType: 'blob',
      method: 'post',
      data: {
        ...params
      }
    })
  },
  changeFileName(params) {
    return axios.post('/changeFileName', params)
  }
}