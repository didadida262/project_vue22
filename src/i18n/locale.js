/*
 * @Author: Hhvcg
 * @Date: 2022-06-24 17:06:29
 * @LastEditors: -_-
 * @Description:
 */
// 导入自有语言包
import zhCN from './locale/zh-CN'
import enUS from './locale/en-US'

// 导入 iView 语言包
// import zhCNiView from 'view-design/dist/locale/zh-CN'
// import enUSiView from 'view-design/dist/locale/en-US'

// 导入布局语言包
// import layoutLocale from '@/layouts/basic-layout/i18n'

// 合并语言包
export default {
  'zh-CN': Object.assign(zhCN),
  'en-US': Object.assign(enUS)
}
