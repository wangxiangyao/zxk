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
    padding: 0 30px;
    border-top: 2px solid var(--分割线);
    border-bottom: 2px solid var(--分割线);
  }
</style>
