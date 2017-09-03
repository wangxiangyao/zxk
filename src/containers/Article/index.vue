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
      <div class="writeComment">

      </div>
      <div class="like">

      </div>
      <div class="collect">

      </div>
    </div>
  </div>
</template>

<script>
import TopBar from '../../components/TopBar';
import { mapState } from 'vuex';
import Editor from '../../components/Editor';

export default {
  name: 'article',
  components: {
    TopBar,
    Editor,
  },
  created() {
    this.getArticle();
  },
  data() {
    return {
      id: this.$route.params.id,
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
    left: 0;
    bottom: 0;
    width: 100%;
    height: 80px;
    background-color: #ccc;
    z-index: 1600;
  }
</style>
