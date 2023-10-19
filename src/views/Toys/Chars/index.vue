
<template>
  <div class="Chars-st pd10">
    <commonTemplate title="Chars" />
    <div class="content">
      <span v-for="(item, index) in chars" :key="index" :style="{ color: item.color}">
        <span>{{ item.char }}</span>
      </span>
    </div>
  </div>
</template>

<script>
import CommonTemplate from '@/components/titleTemplate.vue'
import { getAllChar, getRandomColor } from '@/utils/common_weapons.ts'
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
      // const res = await this.$axios.getAllChars()
      this.chars = getAllChar('small').map((char) => {
        return {
          char: char,
          color: getRandomColor()
        }
      })
      console.log('this.chars>', this.chars)
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
