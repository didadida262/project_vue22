
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
