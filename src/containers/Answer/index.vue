<template>
  <div :class="$style.answerWrapper">
    <TopBar></TopBar>
    <div :class="$style.title">
      {{issueTitle}}
    </div>
    <div :class="$style.author">
      <div :class="$style.avator"></div>
      <div :class="$style.authorInfo">
        <div :class="$style.name">
          wxy
          <div :class="$style.publishTime">
            {{createTime}}
          </div>
        </div>
        <div :class="$style.trueInfo">
          <div :class="$style.trueName">
            王相尧
          </div>
          <div class="unit">
            栾川县电业局
          </div>

        </div>
      </div>
      <div :class="$style.action">
        <div :class="$style.focus">
          关注
        </div>
      </div>
    </div>
    <div :class="$style.answer">
      <div :class="$style.issueContent" >
        <Editor :isRead='true' :value='answer.content'></Editor>
      </div>
      <div :class="$style.info">
        <div :class="$style.editTimeWrapper">
          <div :class="$style.editTimeText">
            编辑于：
          </div>
          <div :class="$style.editTime">
            {{editTime}}
          </div>
        </div>
        <div :class="$style.copyright">
          未经作者允许，禁止转载
        </div>
      </div>
    </div>
    <div :class="$style.discuss">
      <Discuss v-for="item in discuss" :key='item.id' :discuss='item' />
    </div>
    <Gap />
  </div>
</template>

<script>
import TopBar from '../../components/TopBar';
import { mapState } from 'vuex';
import Editor from '../../components/Editor';
import Discuss from '../../components/Discuss';
import Gap from '../../components/Gap';

import 'vue-awesome/icons/eye';
import 'vue-awesome/icons/user-plus';
import 'vue-awesome/icons/paint-brush';
import faicon from 'vue-awesome/components/Icon';

export default {
  name: 'answer',
  components: {
    TopBar,
    Editor,
    faicon,
    Discuss,
    Gap,
  },
  created() {
    this.getAnswer();
  },
  data() {
    return {
      id: Number(this.$route.params.answerId),
      issueId: Number(this.$route.params.id),
    }
  },
  computed: {
    answer() {
      return this.$store.state.comment.byId[this.id];
    },
    issueTitle() {
      return this.$store.state.content.byId[this.issueId].title;
    },
    author() {
      return this.$store.state.member.byId[this.answer.author];
    },
    discuss() {
      const allDiscuss = this.$store.state.discuss.byId;
      let arr = [];
      this.answer.discuss.map(discussId => {
        arr.push(allDiscuss[discussId]);
      })
      return arr;
    },
    createTime() {
      let time = new Date(this.answer.createTime);
      let timeText = `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 ${time.getHours()}点${time.getMinutes()}分`;
      return timeText;
    },
    editTime() {
      let time = new Date(this.answer.updateTime);
      let timeText = `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 ${time.getHours()}点${time.getMinutes()}分`;
      return timeText;
    }
  },
  methods: {
    getAnswer() {
      const id = this.$route.params.answerId;
      const { state, dispatch } = this.$store;
      dispatch('getOneComment', id);
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
.answerWrapper {
  composes: fullScreen from "../../commenStyle/layout.css";
  background-color: #fff;
}
.title {
  background-color: var(--主题色);
  color: #fff;
  padding: 30px;
  font-size: 36px;
}

.author {
  display: flex;
  align-items: center;
  padding: 30px;
  border-bottom: 2px solid var(--分割线);
}
.authorInfo {
  display: flex;
  flex-direction: column;
  flex: 1;
  font-size: 24px;
  margin-left: 10px;
}
.avator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
}
.name {
  display: flex;
  margin-bottom: 5px;
}
.publishTime {
  display: flex;
  align-items: flex-end;
  color: var(--次要);
  font-size: 20px;
  margin-left: 10px;
}
.trueInfo {
  display: flex;
}
.trueName {
  margin-right: 10px;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
.focus {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--主题色);
  width: 100px;
  height: 60px;
  font-size: 28px;
  border-radius: 6px;
  color: #fff;
}
.issueContent {
  display: flex;
  padding: 30px;
}
.info {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 30px;
  font-size: 28px;
}
.editTimeWrapper {
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.editTimeText {
  font-style: italic;
  color: var(--主题色);
}
.editTime {
  font-style: italic;
  font-size: 24px;
  color: var(--主题色);
}
.copyright {
  color: var(--主题色);
}
.discuss {
  padding: 0 30px;
}
</style>
