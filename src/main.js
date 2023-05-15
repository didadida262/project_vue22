/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: Hhvcg
 * @Description: 主文件配置
 */
import Vue from 'vue'
import apis from '@/api/index'
import 'normalize.css/normalize.css' // A modern alternative to CSS resets
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import '../theme/index.css'
import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

// import '@/icons' // icon
// import '@/permission' // permission control
// import _ from 'lodash'
import BaiduMap from 'vue-baidu-map'
// 日期处理
import dayjs from 'dayjs'
Vue.prototype.$dayjs = dayjs
Vue.prototype._ = _
Vue.prototype.$axios = apis

Vue.use(BaiduMap, {
  ak: 'wGw7PCvWQ01VHxr9yFyAXZtHnUGvnsY4'
})
Vue.use(ElementUI)
Vue.config.productionTip = false
new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  mounted: () => document.dispatchEvent(new Event('render-event')),
  render: h => h(App)
})

// import Vuei18n from 'vue-i18n'
// 引入jQuery、bootstrap----->虽然很不想装jquery，但还是tm的被迫装了
// import $ from 'jquery'
// import 'bootstrap'
// // 引入bootstrap样式
// import 'bootstrap/dist/css/bootstrap.min.css'
// import 'bootstrap/dist/js/bootstrap.min.js'

// 全局注册 $
// Vue.prototype.$ = $

// import i18n from '@/i18n'
// import VueWorker from 'vue-worker';

// import localeEI from 'element-ui/lib/locale/lang/en' // lang i18n
// 自定义了elementui的默认配置

// 有问题，暂时屏蔽
// import Antd from 'ant-design-vue'
// import 'ant-design-vue/dist/antd.css'
// Vue.use(Antd)

// Vue.config.silent = true
// 引入语言包
// Vue.use(Vuei18n)
// const i18n = new Vuei18n({
//   local: 'zh-CN',
//   // messages: {
//   //   'zh': {
//   //     name: '名称'
//   //   },
//   //   'en' : {
//   //     name: 'content'
//   //   }
//   // }
//   messages: {
//     'zh-CN': require('@/i18n/locale/zh-CN.js'),
//     'en-US': require('@/i18n/locale/en-US.js')
//   }
// })

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
// if (process.env.NODE_ENV === 'production') {
//   const { mockXHR } = require('../mock')
//   mockXHR()
// }

// set ElementUI lang to EN
// Vue.use(ElementUI, { localeEI })
// Vue.use(ElementUI, 'en')
// 如果想要中文版 element-ui，按如下方式声明
// if (window) window['$t'] = (key, value) => i18n.t(key, value)
// Vue.prototype.log = log

//  document.dispatchEvent(new Event('render-event'))
