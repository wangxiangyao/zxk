<template>
  <div :class="$style.myBtn" @click="handleClick">
    <div :class="($style.text)" :style='textStyle'>
      {{text}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'myButton',
  props: {
    text: String, // 按钮上的文字
    textStyle: Object, // 自定义文字样式
  },
  methods: {
    handleClick() {
      this.$emit('handleClick');
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .myBtn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    composes: theme-bg from '../../commenStyle/commenColor.css'
  }
  .text {
    color: #fff;
  }
</style>
