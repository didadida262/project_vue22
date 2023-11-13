<template>
    <div class="TransferComponent-st flex-cc">
        <div class="TransferComponent-st-left">
            <div class="TransferComponent-st-left-header flex-cs">
                <el-checkbox v-model="item.selected"/>
                <span>通道列表</span>
                <span>{{  '/' + leftData.length }}</span>
            </div>
            <div class="TransferComponent-st-left-content flex-col">
                <div
                 v-for="(item, index) in leftData"
                 :key="index"
                 class="TransferComponent-st-left-content-item flex-cs">
                    <el-checkbox v-model="item.selected"/>
                    <span>{{ item.name }}</span>
                </div>
            </div>
        </div>
        <el-button size="mini" @click="addGroup">添加分组</el-button>
        <div class="TransferComponent-st-right">
            <div class="TransferComponent-st-right-header">
                通道组列表
            </div>
            <div class="TransferComponent-st-right-content">
                content
            </div>
        </div>
    </div>
  </template>

<script>
export default {
  name: 'ChannelSetting',
  props: {
  },
  components: {
  },
  computed: {
  },
  data() {
    return {
      leftData: [
        {
          name: 'SICA - BF',
          key: 'SICA - BF'
        },
        {
          name: 'SICA - PL',
          key: 'SICA - PL'
        },
        {
          name: 'Omega - BF',
          key: 'Omega - BF'
        },
        {
          name: 'Omega - PL',
          key: 'Omega - PL'
        }
      ],
      rightData: []
    }
  },
  methods: {
    addGroup() {

    }

  },
  created() {
  },
  mounted() {
  }

}
</script>
  <style lang="scss" scoped>
  .TransferComponent-st {
    border: 1px solid rgb(173, 169, 169);

    width: 100%;
    height: 100%;
    &-left{
        width: 49%;
        height: 100%;
        border: 1px solid rgb(173, 169, 169);
        border-radius: 5px;
        overflow: scroll;
        &-header {
            width: 100%;
            height: 40px;
            border: 1px solid rgb(173, 169, 169);
        }
        &-content {
            &-item {
                width: 100%;
                height: 20px;
            }
        }
    }
    &-right{
        width: 49%;
        height: 100%;
        border: 1px solid rgb(173, 169, 169);
        border-radius: 5px;
        overflow: scroll;
    }
}
  </style>
