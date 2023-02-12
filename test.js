<<<<<<< HEAD
// 再谈js的继承那些事
=======
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab

// 合并两数组

// 以数组 intervals 表示若干个区间的集合，其中单个区间为 intervals[i] = [starti, endi] 。请你合并所有重叠的区间，并返回 一个不重叠的区间数组，该数组需恰好覆盖输入中的所有区间 。

<<<<<<< HEAD
const Parent  = function() {
    this.name = '爷爷'
    this.children= ['son1', 'son2']
    this.old = 100
    this.getName = function() {
        return this.name
    }
}
Parent.prototype.getChildren = function () {
    return this.children
}
=======
// 示例 1：

// 输入：intervals = [[1,3],[2,6],[8,10],[15,18]]
// 输出：[[1,6],[8,10],[15,18]]
// 解释：区间 [1,3] 和 [2,6] 重叠, 将它们合并为 [1,6].
// 示例 2：
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab

// 输入：intervals = [[1,4],[4,5]]
// 输出：[[1,5]]
// 解释：区间 [1,4] 和 [4,5] 可被视为重叠区间。

<<<<<<< HEAD
// 1.原型链继承
// const Children = function () {
    
// }

// Children.prototype = new Parent()
// const child = new Children()
// const child2 = new Children()
// console.log(child.getChildren())
// child.children.push('child')
// console.log(child2)




// 2.构造函数继承

// const Children = function () {
//     Parent.call(this)
// }

// const child1 = new Children()
// const child2 = new Children()
// child1.children.push('>>>>>>>>>>>>>')
// console.log('child1>>>',child1.getChildren())
// console.log('child2>>>',child2.children)



// 3.组合继承 利用原型链方法，继承父类构造函数的原型对象上的方法 利用构造函数继承，实现私有化

const Children = function () {
    Parent.call(this)
}

Children.prototype = Object.create(Parent.prototype)
Children.prototype.constructor = Children

const child1 = new Children()
const child2 = new Children()
console.log('child1>>',child1.__proto__)
console.log('child2>>',child2)
=======
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
>>>>>>> 9ff22210cc2deac4b0f4edf3442c9449f7addfab
