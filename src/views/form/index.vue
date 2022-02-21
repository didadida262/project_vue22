<template>
  <div class="app-container">
    ccasdasd
  </div>
</template>

<script>
export default {
  name: 'Form',
  data() {
    return {
      timer: null
    }
    
  },
  created() {
    console.log('form....')
    this.timer = setInterval(() => {
      console.log('来自轮询的伺候....')
    }, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  }
}
</script>

<style scoped>
.line{
  text-align: center;
}
</style>

