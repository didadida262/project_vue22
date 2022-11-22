
self.addEventListener('message', e => { // 接收到消息
  console.log('worker接收', e.data) // Greeting from Main.js，主线程发送的消息
  self.postMessage('Greeting from Worker.js') // 向主线程发送消息
})
