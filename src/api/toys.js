/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: Hhvcg
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

  // music
  getMusicCates() {
    // return axios.get('/songs/list')
    return axios.get('/getMusicCates')
  },
  getSongsList(params) {
    return axios.post('/getSongsList', params)
  },
  getSongData(params) {
    return axios({
      method: 'post',
      responseType: 'blob',
      url: '/getSongData',
      data: {
        ...params
      }
    })
  },

  getAllChars() {
    return axios.get('/getAllChar')
  },

  getCates() {
    return axios.get('/getCates')
  },

  // video
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
  getVideoCyberFont() {
    return axios({
      url: '/getVideoCyberFont',
      responseType: 'stream',
      // responseType: 'arraybuffer',
      method: 'get'
    })
  },
  changeFileName(params) {
    return axios.post('/changeFileName', params)
  },

  // Records模块
  // 提交records
  subMitRecords(params) {
    return axios.post('/subMitRecords', params)
  },
  // 获取所有records
  getRecordsList(params) {
    return axios.get('/getRecordsList')
  }

}
