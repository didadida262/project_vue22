<!--
 * @Author: Hhvcg
 * @Date: 2023-05-16 17:09:12
 * @LastEditors: Hhvcg
-->

<template>
  <div>
    <el-dialog
      :title="$t('page.review.sensorshipDialogTitle')"
      :visible.sync="SensorshipDialogVisable"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false">
      <span>{{  $t('page.review.sensorshipTips') }}</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="handleCancel">{{ $t('common.cancel') }}</el-button>
        <el-button type="primary" @click="handleConfirm">{{ $t('common.confirm') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'SensorshipDialog',
  props: ['SensorshipDialogVisable'],
  methods: {
    handleCancel() {
      this.$emit('close')
    },
    handleConfirm() {
      this.$emit('close')
    }
  }

}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__title) {
  font-weight: bold;
  color: #000000;
}
</style>
