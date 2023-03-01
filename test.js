// 不同路劲
const m = 7
const n = 3
var uniquePaths = function(m, n) {
  // 法1：亲测超时。。。。
  const i = 0
  const j = 0
  const visited = new Array(m).fill(new Array(n).fill(0))
  let num = 0
  const f = (p, q) => {
    if (p === (m - 1) && q === (n - 1)) num++
    if (p + 1 < m) {
      visited[p + 1][q] = 1
      f(p + 1, q)
      visited[p + 1][q] = 0
    }
    if (q + 1 < n) {
      visited[p][q + 1] = 1
      f(p, q + 1)
      visited[p][q + 1] = 0
    }
  }
  f(0, 0)
  return num
}
// const d = new Array(m).fill(new Array(n).fill(1))

// const walk = (m, n) => {
//   for (let i = 1; i < m; i++) {
//     for (let j = 1; j < n; j++) {
//       d[i][j] = d[i - 1][j] + d[i][j - 1]
//     }
//   }
// }
// walk(m, n)
console.log('d>>', uniquePaths(m, n))
