/*
 * @Author: Hhvcg
 * @Date: 2022-06-24 17:06:29
 * @LastEditors: -_-
 * @Description:
 */
import Vue from 'vue'
import VueI18n from 'vue-i18n'
import store from '@/store/index'

import Languages from '@/i18n/locale'

store.dispatch('i18n/getLocale')

const locale = store.state.i18n.locale

Vue.use(VueI18n)

export default new VueI18n({
  locale,
  messages: Languages
})
