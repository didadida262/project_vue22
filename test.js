// 快排算法: 去一个固定值，每次将数组分为左右两部分大于该数、小于该数

const nums = [1, 5, 2, 6, 4, 3, 7]

const quick_sort = (arr) => {
  if (arr.length <= 1) return arr
  const pivot = arr[0]
  const greater = arr.slice(1).filter((item) => item >= pivot)
  const smaller = arr.slice(1).filter((item) => item < pivot)
  return quick_sort(smaller).concat([pivot]).concat(quick_sort(greater))
}

// console.log(quick_sort(nums))

// 冒泡

const bubble_sort = (nums) => {
  for (let i = 0; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] < nums[i]) {
        const t = nums[i]
        nums[i] = nums[j]
        nums[j] = t
      }
    }
  }
}

// bubble_sort(nums)
console.log(nums)
