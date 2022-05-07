/*
 * @Author: Hhvcg
 * @Date: 2022-04-15 18:09:58
 * @LastEditors: -_-
 * @Description: 
 */
// 斐波那契数列


// 测试程序运行时间
// n: 40
// 平方级别的时间消耗都已经如此夸张，指数级别的程序，可想而知。各位骚年，少些狗屎代码祸害机器了
const F = (n) => {
  const res = [0, 1]
  for (let i = 2; i < n; i++) {
    res[i] = res[i -1] + res[i-2]
    // for (let j = 0; j < i; j++) {
    //   console.log('')
    // }
  }
  console.log('所有数据--->', res)
}

console.time()
F(400)
console.timeEnd()
