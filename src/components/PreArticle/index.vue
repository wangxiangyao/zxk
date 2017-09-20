<template>
  <div class="pre-article" @click='handleClick'>
    <div class="left">
      <div class="author">
        <User :user='author' :publishTime='article.createTime' :timeType='2' />
      </div>
      <div class="title">
        <Type :type='type' :styleType='1'></Type>
        <div class="title-text">
          {{article.title}}
        </div>
      </div>
      <div class="other">
        <div class="kind">
          所属类别
        </div>
        <div class="read">
          阅读 {{article.readNum}}
        </div>
        <div class="like">
          喜欢 {{article.praiseNum}}
        </div>
        <div class="comment">
          收藏 {{article.collectNum}}
        </div>
      </div>
    </div>
    <div class="right">
      缩略图
    </div>
  </div>
</template>

<script>
import Type from '../ContentType';
import { mapState } from 'vuex';
import router from '../../router';
import User from '../User';

export default {
  name: 'preArticle',
  components: {
    Type,
    User,
  },
  data() {
    return {
      type: 1,
      currentTime: +new Date(),
    }
  },
  methods: {
    handleClick() {
      let id = this.article.id;
      let url = `/Article/${id}`;
      router.push(url);
    }
  },
  props: {
    article: Object,
  },
  computed: {
    author() {
      return this.$store.state.member.byId[this.article.author];
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .pre-article {
    display: flex;
    padding: 20px;
    font-size: 28px;
    border-bottom: 1px solid #e5e5e5;
    background-color: #fff;
  }
  .left {
    display: flex;
    flex-direction: column;
    flex: 1;
  }

  .author {
    display: flex;
    align-items: center;
  }
  .title {
    display: flex;
    align-items: center;
    margin: 20px 0;
  }
  .title-text {
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
    overflow: hidden;
    padding: 0 20px;
    font-size: 48px;
  }


  .other {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .read, .like, .comment {
    font-size: 24px;
    color: var(--次要);
    padding: 0 10px;
  }
</style>
