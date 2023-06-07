// 监听接收 主线程的参数
onmessage = function(message) {
  console.log('接收到数据>>>', message)
  postMessage('adadadadad')
}
onerror = function(event) {
  console.log(event)
  self.close()
}
