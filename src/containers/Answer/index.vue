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
      <Discuss v-for="item in discuss" :key='item.id' :discuss='item' @select='handleSelect'/>
    </div>
    <Gap />
    <div :class="$style.someaction">
      <div :class="$style.writeDiscuss" @click='handleWriteComment'>
        <i class="el-icon-edit" :class='$style.icon'></i>
        <input type="text" name="comment" v-model='myComment.content' placeholder="说点什么..." :class='$style.input'>
      </div>
      <div :class="$style.right">

      </div>
    </div>
    <MyMask v-if='isOpenOptions' @handleClose='handleCloseMask'>
      <div :class="$style.optionsList">
        <ItemGroup>
          <Item>
            <div :class="$style.itemBox" @click='hanldeWriteDiscuss'>
              <div :class="$style.itemText">
                回复
              </div>
            </div>
          </Item>
          <Item>
            <div :class="$style.itemBox">
              <div :class="$style.itemText">
                赞
              </div>
            </div>
          </Item>
        </ItemGroup>
      </div>
    </MyMask>
    <div v-if='isWriteComment'>
      <Comment :content='myComment.content' @handleClose='handleCloseWriteComment' @edit='edit' @handlePublish='handlePublish'></Comment>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/TopBar';
import { mapState } from 'vuex';
import Editor from '../../components/Editor';
import Discuss from '../../components/Discuss';
import Gap from '../../components/Gap';
import Comment from '../Article/comment.vue';
import MyMask from '../../components/MyMask';
import Item from '../../components/Item';
import ItemGroup from '../../components/Item/ItemGroup.vue';

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
    Comment,
    MyMask,
    Item,
    ItemGroup,
  },
  created() {
    this.getAnswer();
  },
  data() {
    return {
      id: Number(this.$route.params.answerId),
      issueId: Number(this.$route.params.id),
      myComment: {
        content: '',
        authorId: this.$store.state.member.id,
        type: 3,
        target: Number(this.$route.params.answerId),
      },
      isWriteComment: false,
      isOpenOptions: false,
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
    handleWriteComment() {
      this.isWriteComment = true;
    },
    handleCloseWriteComment() {
      this.isWriteComment = false;
    },
    edit(newContent) {
      this.myComment.content = newContent;
    },
    handlePublish() {
      console.log('发表评论');
      const { dispatch } = this.$store;
      let comment = {
        ...this.myComment,
      }
      if (comment.content.trim() !== '') {
          dispatch('addDiscuss', comment);
      }
      this.myComment.content = '';
    },
    hanldeWriteDiscuss() {
      this.isOpenOptions = false;
      this.isWriteComment = true;
    },
    handleSelect(selectId) {
      this.isOpenOptions = true;
    },
    handleCloseMask() {
      this.isOpenOptions = false;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
.answerWrapper {
  composes: fullScreen from "../../commenStyle/layout.css";
  background-color: #fff;
  padding-bottom: 80px;
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

.someaction {
  display: flex;
  position: fixed;
  padding: 15px 30px;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  box-shadow: 0 2px 15px 1px #aaa;
  z-index: 1600;
  background-color: #fff;
}
.right {
  display: flex;
  flex: 0 0 50%;
}
.writeDiscuss {
  display: flex;
  flex: 1;
  align-items: center;
  padding: 10px;
  border: 2px solid #eee;
}
.input {
  margin: 0 10px;
  font-size: 25px;
  outline: none;
}
.icon {
  font-size: 30px;
}
.optionsList {
  background-color: #fff;
}
.itemBox {
  display: flex;
  height: 100%;
  align-items: center;
}
.itemText {
  flex: 1;
  margin: 0 30px;
  font-size: var(--字体大小-标准);
}
</style>
