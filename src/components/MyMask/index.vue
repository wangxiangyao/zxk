<template>
  <div :class="$style.myMask" :style='wrapperStyle' @click.self="handleClose">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'myMask',
  props: {
    position: {
      type: String,
      default: "center",
    }
  },
  computed: {
    wrapperStyle() {
      let style = {};
      if (this.position === "center") {
        style.justifyContent = "center";
      } else if (this.position === 'top') {
        style.justifyContent = "flex-start";
      } else if (this.position === 'bottom') {
        style.justifyContent = "flex-end";
      }
      return style;
    }
  },
  methods: {
    handleClose() {
      this.$emit("handleClose");
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .myMask {
    display: flex;
    flex-direction: column;
    position: fixed;
    z-index: 10000;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0,0,0,0.4);
  }
</style>
