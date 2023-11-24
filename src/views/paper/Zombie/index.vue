<template>
  <div class="Zombie-container pd10">
    <commonTemplate title="Zombie" />
    <div class="Zombie-container-content">
      <GameMapping />
    </div>
  </div>
</template>

<script>
import commonTemplate from '@/components/titleTemplate.vue'
import GameMapping from './Components/GameMapping.vue'

export default {
  name: 'Zombie',
  components: {
    commonTemplate,
    GameMapping
  },
  data() {
    return {
      title: 'Zombie'
    }
  },
  computed: {
  },
  watch: {},
  mounted() {

  },
  beforeDestroy() {

  },
  methods: {

  }
}
</script>
<style scoped lang="scss">
.Zombie-container {
  width: 100%;
  height: 100%;
  &-content {
    width: 100%;
    height: calc(100% - 80px);
    border: 1px solid rgba(118, 118, 122, 0.5);
  }
}
</style>
