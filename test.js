// 再谈js的继承那些事



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