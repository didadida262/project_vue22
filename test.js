
const test = {
  name: 'hhvcg',
  old: 10
}

// const p = new Promise((resolve, reject) => {
//   // rejected()
//   // resolve()
//   reject()
// })

// p.then(() => {
//   console.log('resolve')
// })
// p.catch(() => {
//   console.log('reject')
// })
// console.log('p>>', p)

const arr = new Array(1000).fill(0)

console.time('time')
// for (let i = 0, len = arr.length; i < len; i++) {
for (let i = 0; i < arr.length; i++) {
  console.log('i>>', i)
}
console.timeEnd('time')

