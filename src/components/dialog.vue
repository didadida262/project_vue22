<!--
 * @Author: Hhvcg
 * @Date: 2023-04-27 15:15:41
 * @LastEditors: Hhvcg
 弹框组件
-->

<template>
  <div>
    <el-dialog
      title="Message"
      :visible.sync="dialogVisible"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <span slot="footer" class="dialog-footer">
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'dialog',
  props: ['dialogVisible']

}
</script>

<style>

</style>
