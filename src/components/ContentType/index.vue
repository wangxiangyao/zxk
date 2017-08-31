<template>
  <div class="type">
    文章
  </div>
</template>

<script>
export default {
  name: 'type',
  props: {
    type: Number,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .type {
    padding: 6px;
    color: #fff;
    background-color: var(--主题色);
    font-size: 20px;
    line-height: 20px;
  }
</style>
