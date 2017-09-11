<template>
  <div class="item">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'item',
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .item {
    height: 120px;
    width: 100%;
    border-top: 2px solid var(--分割线);
  }
  .item:nth-child(1) {
    border-top: none;
  }
</style>
