
<template>
  <div class="Chars-st pd10">
    <commonTemplate title="Chars" />
    <div class="content">
      <span v-for="(char, index) in chars">
        <!-- <span>{{ index }}>>> </span> -->
        <span>{{ char }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import CommonTemplate from '@/components/titleTemplate.vue'
export default {
  name: "Chars",
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
  methods: {
    async getData() {
      const res = await this.$axios.getAllChars()
      this.chars = res.data
    }
  },
  mounted() {
  },
  beforeDestroy() {
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
