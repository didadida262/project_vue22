
<template slot-scope="scope">
  <div
    class="video-item cursor-pointer flex-cc pd5"
    :class="{'is-active':this.data.active}"
  >
    <div class="video-item-name flex-cb">
      <span v-if="!this.data.editFlag" style="color: black" @click="this.handleSelect">
        <span
          v-if="this.data.name.length <= 20"
        >
          {{ this.data.name }}
        </span>
        <!-- <span
        >
          {{ this.data.name.slice(0, 20) + '...' }}
        </span> -->
        <span
          v-else
          class="item" 
          >
          <span>{{ this.data.name.slice(0, 20) + '...' }}</span>
        </span>
      </span>
      <input
       v-if="this.data.editFlag"  
       @keyup.enter="changeName"
       :ref="this.inputRef"  
       type="text" 
       style="color: black" 
       :value="this.inputName.slice(0, this.inputName.length - 4)">
    </div>
    <div class="video-item-operate">
      <el-button v-if="!this.data.editFlag" size="mini" @click="handleEdit(true)">编辑</el-button>
      <el-button v-if="this.data.editFlag" size="mini" @click="this.changeName">提交</el-button>
    </div>
  </div>
</template>
<script>

export default {
  name: 'SongItem',
  props: {
    data: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      inputName: '',
      xx: ''
    }
  },
  created() {
  },
  mounted() {
  },
  beforeDestroy() {
  },
  computed: {
    inputRef() {
      this.inputName = this.data.name
      return this.data.id
    }
  },
  methods: {
    handleEdit(flag) {
      console.log('flag')
      this.$emit('handleVideoOperate', {
        type: 'handleEdit',
        data: this.data,
        edit: flag 
      })
      this.$nextTick(() => {
        this.$refs[this.inputRef].focus()
      })
      // this.data.editFlag = true
    },
    async changeName() {
      // 发送请求修改目标文件名称
      const params = {
        ...this.data,
        inputName: this.$refs[this.inputRef].value
      }
      console.log('params',params)
      const res = await this.$axios.changeFileName(params)
      this.$message.success(res.message)
      this.$emit('handleVideoOperate', {
        type: 'refreshData',
        data: ''
      })
      this.data.editFlag = false
    },
    handleSelect() {
      this.$emit('handleVideoOperate', {
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
    user-select:none;
    &-name {
      width: calc(100% - 85px);
      height: 100%;
    }
    &-operate {
      width: 80px;
      height: 100%;
    }
  }
  .video-item:hover {
    background-image: linear-gradient(120deg,#b0d2ee,#13ca75);
  }
  .is-active {
    background-image: linear-gradient(120deg,#b0d2ee,#13ca75);
  }

</style>

