const sleep = (d) => {
  for (let t = Date.now(); Date.now() - t <= d;) {}
}

sleep(3000)
console.log('1')

