<template>
  <div :class="$style.aboutAnswer">
    <TopBar>
      <div :class="$style.theText" slot='center'>
        <div :class="$style.text">
          撰写回答
        </div>
      </div>
      <div :class="$style.ok" slot='right' @click='handleSave'>
        <faicon name='check' scale='3' />
      </div>
    </TopBar>
    <editor @change="handleChange" placeholder='开始回答...'/>
  </div>
</template>

<script>
import editor from '../../components/Editor'
import TopBar from '../../components/TopBar'


import 'vue-awesome/icons/check';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'aboutAnswer',
  data() {
    return {
      answer: {
        content: '',
      }
    }
  },
  components: {
    editor,
    TopBar,
    faicon,
  },
  methods: {
    handleChange(value, render)  {
      this.answer.content = value;
    },
    handleSave() {
      const { dispatch, state } = this.$store;
      let theAnswer = {
        authorId: state.member.id,
        content: this.answer.content,
        target: Number(this.$route.params.id),
      }
      dispatch('addComment', theAnswer);
      this.$router.back();
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .aboutAnswer {
    composes: fullScreen from "../../commenStyle/layout.css";
    background-color: #fff;
    display: flex;
    flex-direction: column;
  }
  .myTitle {
    padding: 30px;
    width: 100%;
    max-height: 160px;
    font-size: 48px;
    outline: none;
  }
  .pickTarget {
    background-color: #fff;
    min-height: 50vh;
    display: flex;
    flex-direction: column;
    padding: 0 20px;
  }
  .text {
    height: 100px;
    font-size: 36px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .ok {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    color: var(--主题色);
  }
</style>
