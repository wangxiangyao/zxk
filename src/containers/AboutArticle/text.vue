<template>
  <div :class="$style.addArticle">
    <div :class="$style.title">
      <input type="text" name="title" v-model="title" :class="$style.myTitle" placeholder="请输入标题...">
    </div>
    <editor />
  </div>
</template>

<script>
import editor from '../../components/Editor/text.vue'

export default {
  name: 'addArticle',
  data() {
    return {
      title: '',
    }
  },
  components: {
    editor,
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .addArticle {
    composes: fullScreen from "../../commenStyle/layout.css";
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .myTitle {
    padding: 30px;
    width: 100%;
    height: 120px;
    font-size: 48px;
    outline: none;
  }
</style>
