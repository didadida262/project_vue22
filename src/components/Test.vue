<template>
  <div class="test">
    <el-button type="small" @click="transData">click</el-button>
  </div>
</template>

<script>
export default {
    name: 'Test',
    methods: {
      transData() {
        console.log('clcik')
      }
    },
    mounted() {
      console.log(this.$store.state)
    }
}
</script>

<style scoped>
.test{
  display: inline-block;
  width: 100px;
  height: 100%;
  text-align: center;
  padding: 10px;
}
</style>

