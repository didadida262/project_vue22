// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].

const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]

intervals.sort((a, b) => {
  return a[0] - b[0]
})

const f = (arr1, arr2) => {
  if (arr1[0] > arr2[0]) {
    const t = JSON.parse(JSON.stringify(arr2))
    arr2 = JSON.parse(JSON.stringify(arr1))
    arr1 = JSON.parse(JSON.stringify(t))
  }
  if (arr1[1] < arr2[0]) {
    return [arr1, arr2]
  } else if (arr1[1] < arr2[1]) {
    return [arr1[0], arr2[1]]
  } else {
    return arr1
  }
}

let start = intervals.shift()
const res = []
while (intervals.length) {
  const current = intervals.shift()
  const tempResu = f(start, current)
  if (Array.isArray(tempResu[0])) {
    res.push(tempResu[0])
    start = tempResu[1]
  } else {
    start = tempResu
  }
}
res.push(start)

