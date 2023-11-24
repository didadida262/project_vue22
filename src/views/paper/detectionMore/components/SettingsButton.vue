<!--
 * @Author: Hhvcg
 * @Date: 2023-02-24 17:27:24
 * @LastEditors: Hhvcg
 * @Description: 
-->
<template>
  <div>
    <i
      v-tooltip.right="name"
      class="fa fa-lg fa-cog"
      style="color: grey"
      data-toggle="modal"
      data-target="#settings"
    ></i>

    <br />
    <!-- Modal -->
    <div
      class="modal fade"
      id="settings"
      tabindex="-1"
      role="dialog"
      aria-labelledby="settingsLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="settingsLabel">标注设置</h5>
            <button
              type="button"
              class="close"
              data-dismiss="modal"
              aria-label="Close"
            >
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">
            <div class="row">
              <!-- <div class="col-sm">
                <p class="subtitle">操作</p>
              </div>
              <div class="col-sm">
                <p class="subtitle">快捷键</p>
              </div> -->
              <el-table
                :data="commands"
                align="center"
                style="width: 100%">
                <el-table-column
                  prop="name"
                  label="操作"
                  width="180">
                </el-table-column>
                <el-table-column
                  prop="operation"
                  label="快捷键"
                  width="180">
                </el-table-column>
              </el-table>
            </div>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary"
              data-dismiss="modal"
            >
              关闭
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: "SettingsButton",
  props: {
  },
  data() {
    return {
      name: "标注设置",
      commands:[
      {
          name: '切换通道',
          operation: '字母z'
        },
        {
          name: '保存(save)',
          operation: '字母s'
        },
        {
          name: '居中图片',
          operation: '字母c'
        },
        {
          name: '选中工具',
          operation: '字母a'
        },
        {
          name: '矩形工具',
          operation: '字母r'
        },
        // {
        //   name: '直线工具',
        //   operation: '字母l'
        // },
        {
          name: '直线工具2.0版本',
          operation: '字母l'
        },
        {
          name: '选择标签类别',
          operation: '数字0 - 9'
        },

      ]
    };
  },
  mounted() {
  },
  methods: {

  }
};
</script>

<style scoped>

</style>
