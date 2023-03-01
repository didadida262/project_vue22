const sleep = (d) => {
  for (let t = Date.now(); Date.now() - t <= d;) {}
}
const test = () => {
  console.log('executing=---')
}
setInterval(test, 2000)

// sleep(3000)
// console.log('1')
