<template>
  <div class="my-title">
    <div class="text">
      {{text}}
    </div>
    <div class="action">
      <slot name='action'></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'myTitle',
  props: {
    text: String,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .my-title {
    display: flex;
    justify-content: space-between;
    padding: 20px 20px;
    background-color: #fff;
  }
  .text {
    color: var(--主题色);
    padding: 0 20px;
    font-size: 28px;
    line-height: 28px;
    border-left: 2px solid var(--主题色);
  }
</style>
