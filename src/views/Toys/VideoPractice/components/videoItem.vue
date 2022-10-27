
<template>
  <div
    class="video-item cursor-pointer flex-cc pd5"
    :class="{'is-active':this.data.active}"
  >
    <div class="video-item-name flex-cb">
      <span v-if="!this.editFlag" style="color: black" @click="this.handleSelect">{{ this.data.name }}</span>
      <el-input v-if="this.editFlag" v-model="this.data.name" />

    </div>
    <div class="video-item-operate">
      <el-button v-if="!this.editFlag" size="mini" @click="() => { this.editFlag = true}">编辑</el-button>
      <el-button v-if="this.editFlag" size="mini" @click="this.changeName">提交</el-button>
    </div>
  </div>
</template>
<script lang="ts">

export default {
  name: 'SongItem',

  props: {
    data: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      editFlag: false
    }
  },
  created() {
  },
  mounted() {
  },

  beforeDestroy() {
  },
  methods: {
    async changeName() {
      // 发送请求修改目标文件名称
      const res = await this.$axios.changeFileName(this.data)
      this.$message.info(res.message)
      this.$emit('handleSelect', {
        type: 'refreshData',
        data: ''
      })
      this.editFlag = false
    },
    handleSelect() {
      this.$emit('handleSelect', {
        type: 'click',
        data: this.data
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .video-item {
    width: 100%;
    height: 45px;
    border-radius: 2px;
    box-shadow: 0px 0px 6px rgba(109, 106, 106, 0.8);
    color: white;
    &-name {
      width: calc(100% - 55px);
      height: 100%;
    }
    &-operate {
      width: 50px;
      height: 100%;
    }
  }
  .video-item:hover {
    background-image: linear-gradient(120deg,#b0d2ee,#13ca75);
    transform: scale(1.01);
  }
  .is-active {
    background-image: linear-gradient(120deg,#b0d2ee,#13ca75);
    transform: scale(1.01);
  }

</style>

