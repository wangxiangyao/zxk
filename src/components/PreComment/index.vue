<template>
  <div :class="$style.preComment">
    <div :class="$style.top">
      <User :user='author' :publishTime='comment.createTime' :timeType='2' :style='{flex: 1}' />
      <div :class="$style.action">
        <div :class="$style.icon">
          <faicon name='comment-o' scale='2' ></faicon>
          <div :class="$style.iconText">
            {{comment.discussNum}}
          </div>

        </div>
        <faicon :class='$style.icon' name='thumbs-o-up' scale='2'></faicon>
      </div>
    </div>
    <div class="commentWrapper">
      <template v-if='comment.type === 1'>
        <div :class="$style.comment" @click='handleSelect'>
          {{comment.content}}
        </div>
      </template>
      <template v-else>
        <div :class="$style.issueComment" @click='handleClickIssueComment'>
          <Editor :isRead='true' :value='comment.content'></Editor>
        </div>
      </template>
    </div>
    <div :class="$style.discussList" v-if='comment.type === 1 && comment.discussNum > 0'>
      <div class="discusses" v-if='isOpenDiscuss'>
        <Discuss v-for="item in discuss" :key='item.id' :discuss='item' />
      </div>
      <div :class="$style.disBtn" @click='handleToggleArticleCommentDiscuss'>
        {{isOpenDiscuss ? '收起' : '展开'}}
      </div>
    </div>
  </div>
</template>

<script>
import router from '../../router';
import 'vue-awesome/icons/comment-o';
import 'vue-awesome/icons/thumbs-o-up';
import faicon from 'vue-awesome/components/Icon';
import Editor from '../Editor';
import Discuss from '../Discuss';
import User from '../User'

export default {
  name: 'preComment',
  components: {
    faicon,
    Editor,
    Discuss,
    User,
  },
  data() {
    return {
      isOpenDiscuss: false,
    }
  },
  methods: {
    handleClickIssueComment() {
      console.log('请求此回答详细信息', this.comment.id);
      this.$router.push(`/issue/${this.issueId}/answer/${this.comment.id}`);
    },
    handleToggleArticleCommentDiscuss() {
      const { dispatch } = this.$store;
      if (!this.isOpenDiscuss) {
        dispatch('getOneComment', this.comment.id);
      }
      this.isOpenDiscuss = !this.isOpenDiscuss;
    },
    handleSelect() {
      this.$emit('select', this.comment.id);
    }
  },
  props: {
    comment: Object,
    issueId: Number,
  },
  computed: {
    author() {
      return this.$store.state.member.byId[this.comment.author];
    },
    discuss() {
      const { discuss } = this.$store.state;
      console.log(discuss);
      let arr = [];
      this.comment.discuss.map(discussId => {
        arr.push(discuss.byId[discussId]);
      })
      return arr;
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
.preComment {
  display: flex;
  flex-direction: column;
  padding: 30px;
  border-bottom: 2px solid rgba(155, 144, 194, .8);
}
.top {
  display: flex;
  align-items: center;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
}
.iconText {
  margin-left: 10px;
  font-size: 26px;
}
.avator {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #ccc;
}
.comment {
  padding: 30px 0 0;
  text-align: justify;
  font-size: 30px;
}
.issueComment {
  max-height: 230px;
  overflow: hidden;
}

.disBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  align-self: flex-end;
  font-size: 30px;
  color: var(--主题色);
  width: 120px;
  height: 60px;
}

.discussList {
  display: flex;
  flex-direction: column;
  padding: 30px 0 0;
}
</style>
