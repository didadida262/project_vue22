<!--
 * @Author: Hhvcg
 * @Date: 2022-11-30 16:42:33
 * @LastEditors: -_-
 * @Description: records记录，存储后端json
-->

<template>
  <div class="Records-container pd10">
    <commonTemplate title="Records" />
    <div class="Records-container-content pd10">
      <div class="Records-container-content-operation">
        <el-input
          type="area"
          class="Records-container-content-operation-input mgb10"
          v-model="content"></el-input>
        <el-button
          class="Records-container-content-operation-btn"
          type="primary"
          @click="handleSubmit">Submit</el-button>
      </div>
      <div class="Records-container-content-list">
        <paper-pic-sample
         v-if="!dataLoaded"
         :picInfo="noDataInfo"
        />
        <barrage-template
          v-if="dataLoaded"
          :dataList="recordList"
         />
      </div>
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import BarrageTemplate from '@/components/Barrage'
import PaperPicSample from '@/components/PaperPicSample.vue'

export default {
  name: 'Records',
  components: {
    commonTemplate,
    BarrageTemplate,
    PaperPicSample
  },
  data() {
    return {
      title: 'Records',
      content: '',
      recordList: [],
      dataLoaded: true,
      noDataInfo: {
        title: 'noData',
        src: require('@/assets/noData.jpg')
        // src: ''
      }
    }
  },
  computed: {
  },
  watch: {},
  created() {
    this.getData()
  },
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {
    async getData() {
      this.dataLoaded = false
      const res = await this.$axios.getRecordsList()
      this.recordList = [
        ...res
      ]
      this.dataLoaded = true
    },
    async handleSubmit() {
      const params = {
        content: this.content
      }
      console.log('提交数据>>', params)
      await this.$axios.subMitRecords(params).catch((err) => {
        this.$message.error(err)
      })
      this.$message.success('success！！！')
      this.getData()
    }
  }
}
</script>
<style scoped lang="scss">
.Records-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgb(118, 118, 122, 0.5);
    &-operation {
      height: 100px;
      &-input {
        width: 100%;
      }
      &-btn {
        width: 100%;
      }
    }
    &-list {
      height: calc(100% - 100px);
      border: 1px solid rgba(0,0,0, 0.2);
    }
  }
}
</style>
