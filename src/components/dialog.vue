<!--
 * @Author: Hhvcg
 * @Date: 2023-05-16 17:09:12
 * @LastEditors: Hhvcg
-->

<template>
  <div>
    <el-dialog
      :title="$t('page.review.ModifyDefectClass')"
      :visible.sync="showFlag"
      width="30%"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="true">
        <el-table
          :data="defectTypeList"
          highlight-current-row
          style="width: 100%;height: 500px;overflow: scroll;"
          :header-cell-style="{
            color: 'black',
            fontSize: '10px',
          }"
          cell-class-name="typelist-cell-class"
          @row-click="handleClickDefectClass"
          :row-class-name="tableRowClassName"
        >
        <el-table-column width="102" label="Value">
          <template slot-scope="scope">
              <!-- <el-tooltip :disabled="!isShowTooltip[scope.$index]" class="item" effect="dark" :content="scope.row.name" placement="bottom"> -->
                  <span class="type-value">{{ scope.row.name }}</span>
              <!-- </el-tooltip> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="Class">
          <template v-slot="{ row }">
            <!-- <span style="padding-right: 3px">{{ defectTypeStatistics()[row.class_id] }}</span> -->
            <span style="padding-right: 3px">{{ row.class_id}}</span>
          </template>
        </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="handleConfirm">{{ $t('common.update') }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ModifyDefect',
  props: ['ModifyDefectVisible', 'modifyDefectDialogData'],
  computed: {
    currentDefect() {
      return {
        ...this.modifyDefectDialogData
      }
    },
    defectTypeList() {
      return JSON.parse(sessionStorage.getItem('typeList')) || []
    },
    showFlag: {
      get() {
        return this.ModifyDefectVisible
      },
      set() {
        this.$emit('close')
      }
    }
  },
  methods: {
    handleConfirm() {
      this.$emit('close')
    },
    handleClickDefectClass(row) {
      this.currentDefect.class_id = row.class_id
    },
    tableRowClassName({ row, rowIndex }) {
      if (row.class_id === this.currentDefect.class_id) {
        return 'selected-row'
      }
      return ''
    }
  },
  created() {

  }

}
</script>

<style lang="scss" scoped>
:deep(.el-dialog__title) {
  font-weight: bold;
  color: #000000;
}
:deep(.el-table .selected-row) {
  background: rgb(240,231,240);
}
</style>
