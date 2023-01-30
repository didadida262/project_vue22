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

class Parent {
  constructor(name) {
    this.name = name
  }
  say() {
    console.log(this.name)
  }
}

class Children extends Parent {
  constructor(name) {
    super(name)
    this.old = 100
  }
}

const child = new Children('hhvcg')
const child22 = new Children('hhvcg22222222')
child.name = 'asdasd'
child.say()
child22.say()
