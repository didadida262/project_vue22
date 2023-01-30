// js的继承

// const Parent = function () {
//     this.name = 'parent'
//     this.children = ['son1', 'son2']
//     this.getChildren = function () {
//         console.log('儿子们:', this.children)
//     }
// }
// Parent.prototype.say = function () {
//     console.log('say>>>',this.name)
// }

// 1.原型链继承
// const Children = function () {
// }
// Children.prototype = new Parent()
// const child = new Children()
// console.log('name>>>',child.name)
// child.children.push(1000)
// child.getChildren()
// const child2 = new Children()
// child.getChildren()
// 假继承，因为属性不是私有的

// 2.构造函数继承 --》call.实现私有化的需求
// const Children = function (...args) {
//     Parent.call(this, ...args)
// }
// Children.prototype = Parent.prototype
// const child = new Children()
// child.name = 'child'
// console.log(child.say())
// child.children.push('10000')
// child.name = 'asasd'
// child.getChildren()
// console.log(child)

// const child2 = new Children()
// child2.getChildren()
// console.log(child2.name)

// 组合继承
// 组合继承改进版本
// es6标准

// 合并两数组

// 给定一个整数数组 temperatures ，表示每天的温度，返回一个数组 answer ，其中 answer[i] 是指对于第 i 天，下一个更高温度出现在几天后。如果气温在这之后都不会升高，请在该位置用 0 来代替。

// 示例 1:

// 输入: temperatures = [73,74,75,71,69,72,76,73]
// 输出: [1,1,4,2,1,1,0,0]
// 示例 2:

// 输入: temperatures = [30,40,50,60]
// 输出: [1,1,1,0]
// 示例 3:

// 输入: temperatures = [30,60,90]
// 输出: [1,1,0]
// 被判定超时
const temperatures = [73, 74, 75, 71, 69, 72, 76, 73]
const answer = []
for (let i = 0; i < temperatures.length; i++) {
  const end = temperatures.slice(i + 1)
  const targetIndex = end.findIndex((item) => item > temperatures[i])
  if (targetIndex === -1) {
    answer[i] = 0
  } else {
    answer[i] = 1 + targetIndex
  }
}
console.log(answer)
