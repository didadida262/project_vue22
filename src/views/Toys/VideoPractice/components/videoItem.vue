
<template>
  <div
   class="video-item cursor-pointer flex-cc" 
   :class="{'is-active':data.active}"
   @click="handleSelect">
    <span style="color: black">{{ data.name }}</span>
  </div>
</template>
<script lang="ts">

export default {
  name: "songItem",

  props: {
    data: {
      type: String,
      required: true  
    }
  },
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
  },
  methods: {
    handleSelect() {
      this.$emit('handleSelect', this.data)
    }
  },

  beforeDestroy() {
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .video-item {
    padding: 5px;
    width: 100%;
    height: 45px;
    border-radius: 2px;
    box-shadow: 0px 0px 6px rgba(109, 106, 106, 0.8);
    color: white;
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





