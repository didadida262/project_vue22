<!--
 * @Author: Hhvcg
 * @Date: 2022-08-29 09:48:19
 * @LastEditors: -_-
 * @Description: 国际化组件
-->
<template>
    <span class="headerI18n-st flex-cc">
        <Dropdown trigger='hover' class="i-layout-header-i18n" @on-click="handleClick">
            <Icon type="md-globe"/>
            <DropdownMenu slot="list">
                <DropdownItem v-for="(item, key) in languages" :key="key" :name="key" :selected="locale === key">
                    <span>{{ item.language }}</span>
                </DropdownItem>
            </DropdownMenu>
        </Dropdown>
    </span>
</template>
<script>
import Languages from '@/i18n/locale'
import { mapState, mapActions } from 'vuex'

export default {
  name: 'HeaderI18n',
  data() {
    return {
      languages: Languages
    }
  },
  computed: {
    ...mapState('i18n', [
      'locale'
    ])
  },
  methods: {
    ...mapActions('i18n', [
      'setLocale'
    ]),
    handleClick(locale) {
      if (locale === this.locale) return
      this.setLocale({ locale, vm: this })
    }
  }
}
</script>

<style lang="less" scoped>
  .headerI18n-st {
    width: 64px;
    height: 64px;
    // border: 1px solid red;
    cursor: pointer;
    transition: all 0.2s ease-in-out;
  }
  .headerI18n-st:hover{
    background: fade(rgb(248,248,249), 100%);
  }
</style>
