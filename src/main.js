/*
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: -_-
 * @Description: 
 */
import Vue from 'vue'
import Vuei18n from 'vue-i18n'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import locale from 'element-ui/lib/locale/lang/en' // lang i18n

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


// 引入语言包
// const i18n = new Vuei18n({
//   local: window.sessionStorage.getItem("lang") || 'zh',
//   messages: {
//     zh: require("@/lang/zh.js"),
//     en: require("@/lang/en.js"),
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
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

// set ElementUI lang to EN
Vue.use(ElementUI, { locale })
// Vue.use(Vuei18n)
// Vue.use(ElementUI, 'en')
// 如果想要中文版 element-ui，按如下方式声明
// Vue.use(ElementUI)

Vue.config.productionTip = false
// Vue.prototype.log = log
new Vue({
  el: '#app',
  router,
  store,
  // i18n,
  render: h => h(App)
})
