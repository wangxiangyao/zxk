<template>
  <div :class="$style.issue">
    <TopBar></TopBar>
    <div :class="$style.aboutIssue">
      <div :class="$style.kind">
        <div :class="$style.kindItem">
          <Type :type='1' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
        <div :class="$style.kindItem">
          <Type :type='2' :styleType='3'/>
        </div>
      </div>
      <div :class="$style.title">
        {{issue.title}}
      </div>
      <div :class="$style.issueContent" :style='issueContentStyle' ref='editWrapper'>
        <Editor ref='edit' :isRead='true' :value='issue.content'></Editor>
        <div :class="$style.openAndClose" v-if='needOpenAndClose'>
          <div :class="$style.theOCbtn" @click='handleToggleIssueContent'>
            {{OCbtn}}
          </div>
        </div>
      </div>
      <div :class="$style.info">
        <div :class="$style.left">
          <div :class="$style.attentionNum">
            <faicon name='eye' scale='2' />
            <div :class="$style.theNum">
              {{issue.attentionNum}}
            </div>
          </div>
        </div>
        <div :class="$style.right">
          <div :class="$style.focus">
            关注
          </div>
        </div>
      </div>
      <div :class="$style.action">
        <div :class="$style.invite">
          <faicon name='user-plus' scale='3' />
          <div :class="$style.text">
            邀请回答
          </div>
        </div>
        <div :class="$style.writeAnswer">
          <faicon name='paint-brush' scale='3' />
          <div :class="$style.text">
            写回答
          </div>
        </div>
      </div>
    </div>
    <div :class="$style.answerInfo">
      <div :class="$style.answerNum">
        {{issue.answerNum}} 个回答
      </div>
      <div :class="$style.soltBy">
        排序规则
      </div>
    </div>
    <div :class="$style.answerList">
      评论列表
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/TopBar';
import { mapState } from 'vuex';
import Editor from '../../components/Editor';
import Type from '../../components/ContentType';

import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/user-plus';
import 'vue-awesome/icons/paint-brush';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'issue',
  components: {
    TopBar,
    Editor,
    faicon,
    Type,
  },
  created() {
    this.getIssue();
  },
  data() {
    return {
      id: Number(this.$route.params.id),
      needOpenAndClose: false,
      isOpen: false,
    }
  },
  mounted() {
    console.log(this.$refs)
    let cHeight = this.$refs.edit.$el.clientHeight;
    let wHeight = this.$refs.editWrapper.clientHeight;
    if (cHeight > wHeight) {
      this.needOpenAndClose = true;
    }
  },
  computed: {
    issue() {
      return this.$store.state.content.byId[this.id];
    },
    author() {
      return this.$store.state.member.byId[this.issue.author];
    },
    createTime() {
      let time = new Date(this.issue.createTime);
      let timeText = `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 ${time.getHours()}点${time.getMinutes()}分`;
      return timeText;
    },
    OCbtn() {
      return this.isOpen ? '点击收起' : '点击展开';
    },
    issueContentStyle() {
      let obj = {}
      if (this.isOpen) {
        obj.height = 'auto';
        obj.padding = '0 0 88px 0';
      } else {
        obj.height = '220px';
      }
      return obj;
    }
  },
  methods: {
    getIssue() {
      const id = this.$route.params.id;
      const { state, dispatch } = this.$store;
      dispatch('getOneIssue', id);
    },
    handleToggleIssueContent() {
      this.isOpen = !this.isOpen;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .issue {
    composes: fullScreen from "../../commenStyle/layout.css";
    background-color: #fff;
  }
  .kind {
    display: flex;
    overflow-x: auto;
    padding: 0 20px;
  }
  .kindItem {
    flex: 0 0 20%;
    padding: 30px 20px;
  }
  .title {
    padding: 10px 30px 30px;
    font-size: var(--字体大小-标准);
  }
  .issueContent {
    position: relative;
    overflow: hidden;
  }
  .openAndClose {
    display: flex;
    justify-content: center;
    position: absolute;
    z-index: 1600;
    left: 0;
    bottom: 0;
    width: 100%;
    padding: 10px 50px;
    background-color: rgba(255, 255, 255, .9);
  }
  .theOCbtn {
    padding: 10px;
    font-size: var(--字体大小-标准);
    color: var(--紫苑);
  }
  .info {
    display: flex;
    padding: 30px 40px;
  }
  .info .left {
    display: flex;
    flex: 1;
    padding: 0 10px;
  }
  .attentionNum {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    color: var(--紫苑);
  }
  .theNum {
    font-size: var(--字体大小-较小);
    color: var(--紫苑);
    margin: 0 20px;
  }
  .focus {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: var(--主题色);
    width: 140px;
    height: 60px;
    font-size: 28px;
    border-radius: 6px;
    color: #fff;
  }
  .action {
    display: flex;
    border-top: 2px solid var(--分割线);
  }
  .invite, .writeAnswer {
    display: flex;
    flex: 0 0 50%;
    justify-content: center;
    align-items: center;
    color: var(--紫苑);
    padding: 20px 0 ;
    border-bottom: 2px solid var(--分割线);
  }
  .invite .text, .writeAnswer .text {
    margin: 0 20px;
    color: var(--菖蒲);
    font-size: 28px;
  }
  .invite {
    border-right: 2px solid var(--分割线);
  }

  .answerInfo {
    display: flex;
    justify-content: space-between;
    padding: 30px;
    background-color: var(--背景);
  }
  .answerNum {
    font-size: 36px;
    color: var(--次要);
  }
  .soltBy {
    font-size: 36px;
  }
  .answerList {
    font-size: 36px;
  }
</style>
