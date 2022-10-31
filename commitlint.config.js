/*
 * @Author: Hhvcg
 * @Date: 2022-10-31 16:08:35
 * @LastEditors: -_-
 * @Description:
 */
module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [2, 'always', [
      'add', 'fix', 'refactor', 'docs', 'style', 'chore', 'scope', 'fire'
    ]]
  }
}
