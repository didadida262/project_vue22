<!--
 * @Author: Hhvcg
 * @Date: 2023-03-09 16:57:33
 * @LastEditors: -_-
 * @Description: category组件
-->
<template>
  <div
    class="category cursor-pointer pd5"
  >
    <Annotation
      v-for="(annotation, index) in categoryData"
      :key="index"
    />
  </div>
</template>

<script>
import paper from 'paper'
import Annotation from './Annotation'

export default {
  name: 'Category',
  components: { Annotation },
  props: {
    categoryData: {
      type: Array,
      require: true
    }

  },
  data() {
    return {

    }
  },
  methods: {

  },
  watch: {
  },
  mounted() {
  }
}
</script>

<style scoped lang="scss">
.category {
  width: 100%;
  height: 100%;
}

</style>
