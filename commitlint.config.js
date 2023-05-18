/*
 * @Author: Hhvcg
 * @Date: 2022-10-31 16:08:35
 * @LastEditors: Hhvcg
 * @Description: 提交规范
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'add', 
      'fix', 
      'fire', 
      'del',
      'modify',
      'refactor', 
      'docs', 
      'style', 
      'chore', 
      'scope', 
    ]]
  }
}
