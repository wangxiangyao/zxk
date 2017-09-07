<template>
  <div :class="$style.article">
    <TopBar></TopBar>
    <div :class="$style.author">
      <div :class="$style.avator">

      </div>
      <div :class="$style.info">
        <div :class="$style.name">
          {{author.name}}
        </div>
        <div :class="$style.publishTime">
          {{createTime}}
        </div>
      </div>
      <div :class="$style.authorAction">
        <div :class="$style.focus">
          关注
        </div>
      </div>
    </div>
    <div :class="$style.main">
      <div :class="$style.title">
        {{article.title}}
      </div>
      <div :class="$style.about">
        <div :class='$style.read'>阅读{{article.readNum}}</div>
        <div :class='$style.anthology'>文集：{{anthology.title}}</div>
      </div>
      <div :class="$style.mainBody">
        <Editor :isRead='true' :value='article.content'></Editor>
      </div>
      <div class="comment">

      </div>
    </div>
    <div :class="$style.action">
      <div :class="$style.writeComment" @click='handleWriteComment'>
        <i class="el-icon-edit" :class='$style.icon'></i>
        <input type="text" name="comment" v-model='myComment.content' placeholder="写下您的评论..." :class='$style.input'>
      </div>
      <div :class="$style.right">
        <div :class="$style.like">
          <faicon name='heart' :class='$style.icon' scale='2.3'></faicon>
          <faicon name='heart-o' :class='$style.icon'></faicon>
        </div>
        <div :class="$style.collect">
          <faicon name='bookmark-o' :class='$style.icon'></faicon>
          <faicon name='bookmark' :class='$style.icon'></faicon>
        </div>
      </div>
    </div>
    <div v-if='isWriteComment'>
      <Comment :content='myComment.content' @handleClose='handleCloseWriteComment' @edit='edit' @handlePublish='handlePublish'></Comment>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/TopBar';
import { mapState } from 'vuex';
import Editor from '../../components/Editor';
import { Icon } from "element-ui";
import 'vue-awesome/icons/heart';
import 'vue-awesome/icons/heart-o';
import 'vue-awesome/icons/bookmark';
import 'vue-awesome/icons/bookmark-o';
import faicon from 'vue-awesome/components/Icon';
import Comment from './comment.vue';

export default {
  name: 'article',
  components: {
    TopBar,
    Editor,
    Icon,
    faicon,
    Comment,
  },
  created() {
    this.getArticle();
  },
  data() {
    return {
      id: this.$route.params.id,
      myComment: {
        content: '',
      },
      isWriteComment: false,
    }
  },
  computed: {
    article() {
      return this.$store.state.content.byId[this.id];
    },
    author() {
      return this.$store.state.member.byId[this.article.author];
    },
    anthology() {
      return this.$store.state.anthology.byId[this.article.anthology];
    },
    createTime() {
      let time = new Date(this.article.createTime);
      let timeText = `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 ${time.getHours()}点${time.getMinutes()}分`;
      return timeText;
    }
  },
  methods: {
    getArticle() {
      const id = this.$route.params.id;
      const { state, dispatch } = this.$store;
      dispatch('getOneArticle', id);
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
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .article {
    composes: fullScreen from "../../commenStyle/layout.css";
    background-color: #fff;
  }
  .author {
    display: flex;
    align-items: center;
    height: 100px;
    border-bottom: 2px solid #e5e5e5;
  }
  .avator {
    width: 60px;
    height: 60px;
    margin: 0 20px;
    background-color: #ccc;
    border-radius: 50%;
  }
  .name {
    font-size: 32px;
  }
  .publishTime {
    margin-top: 6px;
    color: var(--次要);
  }
  .authorAction {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    flex: 1;
    padding: 0 20px;
    height: 100%;
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

  .main {
    overflow: auto;
    padding: 0 20px 80px;
  }
  .title {
    padding: 20px 0;
    font-size: 48px;
    line-height: 78px;
    font-weight: bold;
    text-align: justify;
  }
  .about {
    display: flex;
    margin-bottom: 20px;
  }
  .anthology, .read {
    margin: 0 10px;
    color: var(--次要);
    font-size: 22px;
  }

  .mainBody {
    flex: 1;
  }

  .action {
    display: flex;
    position: fixed;
    padding: 15px 30px;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    border-top: 2px solid var(--分割线);
    z-index: 1600;
  }
  .right {
    flex: 0 0 50%;
  }
  .writeComment {
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
</style>
