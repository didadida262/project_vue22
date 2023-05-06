<<<<<<< HEAD

const arr = [1,2,3,4,5, 5,5,5]


// 求和
const sum = arr.reduce((prev, cur) => {
  return prev + cur;
}, 0);

console.log('sum>>', sum)

// 数组去重
const singleArr = arr.reduce((pre, cur) => {
  pre.indexOf(cur) === -1 && pre.push(cur)  
  return pre
}, [])

console.log('singleArr>',singleArr)
=======
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

>>>>>>> 587061ad65f2c5c60073ae62e7f9fc6d790cba7e
