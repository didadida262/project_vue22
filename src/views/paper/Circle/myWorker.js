//通过self.onmessage,来接收主线程传递的信息
onmessage = ((e)=>{
  console.log('worker-get',e)
  })
  //通过self.postMessage,来向主线程传递信息
postMessage = () => {
  console.log('postMessage')
}