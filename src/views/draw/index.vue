<template>
  <div class="draw-container">
    <Tool />
    <Content />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Tool from './Tool'
import Content from './Content'
export default {
  name: 'Dashboard',
  components: {
    Tool,
    Content
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  }
}
</script>

<style lang="scss" scoped>
.draw {
  &-container {
    margin: 30px;
  }
}
.draw-container {
  height: 80vh;
  display: flex;
  justify-content: space-between;
}
</style>
