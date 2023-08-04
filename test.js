/*
 * @Author: Hhvcg
 * @Date: 2023-01-30 11:05:10
 * @LastEditors: Hhvcg
 */
const f = function(html) {
  this.html = html
  this.single = null
}

f.prototype.init = function() {
  const div = document.createElement('div')
  div.innerHTML = this.html
  this.single = div
}

const proxy = (function() {
  let instance
  return function(html) {
    if (!instance) {
      instance = new f(html)
    }
    return instance
  }
})()

const a = new proxy('s1')
const b = new proxy('s2')
console.log('a:', a)
console.log('b:', b)

// a: f {html: "s1", single: div}
// b: f {html: "s1", single: div}
