<!--
 * @Author: hhvcg 719713496@qq.com
 * @Date: 2023-10-10 16:15:54
 * @LastEditors: hhvcg 719713496@qq.com
 * @Description: 
 * 
-->
<template>
  <div v-show="select.isActive">
  </div>
</template>

<script>

export default {
  name: "SelectPanel",
  props: {
    select: {
      type: Object,
      required: true
    }
  }
};
</script>
