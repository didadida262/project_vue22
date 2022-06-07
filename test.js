/*
 * @Author: Hhvcg
 * @Date: 2022-04-15 18:09:58
 * @LastEditors: -_-
 * @Description: 
 */


let x = {c: 'x'}
let y = {c: 'y'}
x.a = y
y.a = x
x = null

console.log('x--->', x)
console.log('y--->', y)

