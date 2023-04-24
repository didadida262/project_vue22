const arr = []
for (let i = 0; i < 2000000; i++) {
  const obj = {
    index: i,
    val: Math.random() * 100000
  }
  arr.push(obj)
}

console.time('time')
arr.sort((a, b) => {
  return b.val - a.val
})
console.timeEnd('time')

console.log(arr)

