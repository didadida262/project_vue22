
<template>
  <div class="Chars-st pd10">
    <commonTemplate title="Chars" />
    <div class="content">
      <span v-for="(char, index) in chars" :key="index">
        <span>{{ char }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import CommonTemplate from '@/components/titleTemplate.vue'
export default {
  name: 'Chars',
  components: {
    CommonTemplate
  },
  data() {
    return {
      chars: null
    }
  },
  created() {
    this.getData()
  },
  mounted() {
  },
  beforeDestroy() {
  },
  methods: {
    async getData() {
      const res = await this.$axios.getAllChars()
      console.log('res>>>', res)
      this.chars = res.data
    }
  }
}
</script>

<style scoped lang="scss">
.Chars-st {
  width: 100%;
  height:100%;

  .content {
    width: 100%;
    height: calc(100% - 90px);
    overflow: auto;
  }
}
</style>
