<!--
 * @Author: Hhvcg
 * @Date: 2022-02-20 15:26:48
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description:
-->
<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import { formatBytes, formatTime } from '@/utils/weapons.js'
export default {
  name: 'App',
  mounted() {
    this.getSysInfo()
  },
  methods: {
    getSysInfo() {
      const timeObj = {}
      for (const key in window.performance.timing) {
        timeObj[key] = formatTime(key, window.performance.timing[key])
      }
      const memoryObj = {
        jsHeapSizeLimit: formatBytes('jsHeapSizeLimit', window.performance.memory.jsHeapSizeLimit),
        usedJSHeapSize: formatBytes('usedJSHeapSize', window.performance.memory.usedJSHeapSize),
        totalJSHeapSize: formatBytes('totalJSHeapSize', window.performance.memory.totalJSHeapSize)
      }
      // console.log('memoryObj----', memoryObj)
      // console.log('timeObj----', timeObj)
    }
  }
}
</script>
