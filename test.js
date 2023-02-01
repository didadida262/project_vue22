
// 合并两数组

// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

// const intervals = [[1, 3], [2, 6], [8, 10], [15, 18]]

// 全排列,此题非常之经典,下面的代码结构，如此的优美
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
const used = new Array(arr.lenght).fill(false)
const res = []
const f = (path) => {
  if (path.length === arr.length) {
    console.log('>>>>>>>>>>>>>>>>>>', path)
    res.push(JSON.parse(JSON.stringify(path)))
    return
  }
  for (let i = 0; i < arr.length; i++) {
    if (!used[i]) {
      used[i] = true
      path.push(arr[i])
      f(path)
      path.pop()
      used[i] = false
    }
  }
}
f([])
// console.log('res>>', res)
