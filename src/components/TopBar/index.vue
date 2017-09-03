<template>
  <div class="top-bar">
    <div class="left" @click="handleBack">
      <i class="el-icon-arrow-left"></i>
    </div>
    <div class="center">
      <slot name="center"></slot>
    </div>
    <div class="right" :class="{'right-line': needRight}">
      <slot name="right">
        <div class="default-right">
          <i class="el-icon-more" v-if="needRight"></i>
          <i class="el-icon-arrow-right" v-else></i>
        </div>
      </slot>
    </div>
  </div>
</template>

<script>
import { Icon } from "element-ui";
import router from "../../router";


export default {
  name: 'topBar',
  props: {
    needRight: {
      type: Boolean,
      default: false, // 为false就显示logo
    },
  },
  data() {
    return {
    };
  },
  components: {
    Icon,
  },
  methods: {
    handleBack() {
      router.back();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .top-bar {
    display: flex;
    height: 100px;
    min-height: 100px;
    border-bottom: 2px solid #e5e5e5;
  }
  .left, .right {
    flex: 0 0 12.5%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 30px;
    margin: 10px 0;
  }
  .left {
    border-right: 2px solid #e5e5e5;
  }
  .right-line {
    border-left: 2px solid #e5e5e5;
  }
  .center {
    flex: 1;
  }
</style>
