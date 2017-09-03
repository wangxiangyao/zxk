<template>
  <div id="app">
    <div class="content">
      <router-view></router-view>
    </div>
    <FooterNav />
  </div>
</template>

<script>
import FooterNav from './components/FooterNav'
import router from './router'

export default {
  name: 'app',
  components: {
    FooterNav,
  },
  created() {
    // 组件创建后，判断本地存储的member是否有效。
    const { member } = this.$store;
    console.log(member)
  },
};
</script>

<style>
@import "./commenStyle/index.css";

body {
  margin: 0;
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.content {
  height: calc(100vh - 124px);
  overflow: auto;
}
</style>
