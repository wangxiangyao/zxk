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
    <div :class="$style.tools">
      <publishType position='左下' @changePublishType='handleChangePublishType' />
    </div>
    <div :class="$style.title">
      <textarea type="text" name="title" v-model="issue.title" :class="$style.myTitle" placeholder="请输入问题..." />
    </div>
    <editor @change="handleChange" placeholder='对问题的补充...'/>
  </div>
</template>

<script>
import editor from '../../components/Editor'
import TopBar from '../../components/TopBar'
import publishType from '../../components/PublishType';

import 'vue-awesome/icons/check';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'aboutIssue',
  data() {
    return {
      issue: {
        title: '',
        content: '',
        publishType: this.$store.state.member.defaultPublishType,
      }
    }
  },
  components: {
    editor,
    TopBar,
    faicon,
    publishType,
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
        publishType:this.issue.publishType,
      }
      console.log(theIssue);
      dispatch('addIssue', theIssue);
    },
    handleChangePublishType(type) {
      console.log(type)
      this.issue.publishType = type;
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
  .tools {
    display: flex;
    padding: 10px 30px;
    justify-content: flex-end;
    border-bottom: 2px solid var(--分割线);
  }
</style>
