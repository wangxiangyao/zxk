<template>
  <div :class="$style.aboutIssue">
    <TopBar>
      <div :class="$style.theText" slot='center'>
        <div :class="$style.text">
          提问
        </div>
      </div>
      <div :class="$style.ok" slot='right' @click='handleSave'>
        <faicon name='check' scale='3' />
      </div>
    </TopBar>
    <div :class="$style.title">
      <textarea type="text" name="title" v-model="issue.title" :class="$style.myTitle" placeholder="请输入问题..." />
    </div>
    <editor @change="handleChange" placeholder='对问题的补充...'/>
  </div>
</template>

<script>
import editor from '../../components/Editor'
import TopBar from '../../components/TopBar'
import MyMask from '../../components/MyMask'
import { mapState } from 'vuex'

import 'vue-awesome/icons/check';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'aboutIssue',
  data() {
    return {
      issue: {
        title: '',
        content: '',
      }
    }
  },
  computed: {
    ...mapState({

    }),
  },
  components: {
    editor,
    TopBar,
    MyMask,
    faicon,
  },
  methods: {
    handleChange(value, render)  {
      this.issue.content = value;
    },
    handleSave() {
      const { dispatch, state } = this.$store;
      if (this.issue.title.trim() === '') {
        console.log('标题未空，无法保存，应提示失败了')
        return;
      }
      if (!(this.issue.title.endsWith('？') || this.issue.title.endsWith('?'))) {
        this.issue.title += '？';
      }
      let theIssue = {
        authorId: state.member.id,
        title: this.issue.title,
        content: this.issue.content,
      }
      dispatch('addIssue', theIssue);
      this.$router.back();
    },
  },
  created() {

  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .aboutIssue {
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
