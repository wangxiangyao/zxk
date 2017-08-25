<template>
  <div class="item-group">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'item-group',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item-group {
    padding: 0 10px;
    border-top: 2px solid #ccc;
    border-bottom: 2px solid #ccc;
  }
</style>
