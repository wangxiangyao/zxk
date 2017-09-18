<template>
  <div class="pre-article" @click='handleClick'>
    <div class="left">
      <div class="author">
        <div class="avator">

        </div>
        <div class="name">
          {{members[article.author].name}}
        </div>
        <div class="publish-time">
          {{this.createTime}}
        </div>
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

export default {
  name: 'preArticle',
  components: {
    Type,
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
    ...mapState({
      members: state => state.member.byId,
    }),
    createTime: function() {
      let createTime = this.article.createTime;
      let timepass = this.currentTime - createTime;
      let timeText = '';
      if (timepass < 60000) {
        let s = Math.floor(timepass / 1000)
        timeText = `${s} 秒前`;
      } else if (timepass < 3600000) {
        let m = Math.floor(timepass / 1000 / 60);
        timeText = `${m} 分钟前`;
      } else if (timepass < 86400000) {
        let h = Math.floor(timepass / 1000 / 3600);
        timeText = `${h} 小时前`;
      } else {
        let time = new Date(createTime);
        timeText += time.getFullYear() + '年' + time.getMonth() + '月' + time.getDate() + '日';
      }
      return timeText;
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
  .avator {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    background-color: #ccc;
  }
  .name {
    padding: 0 20px;
  }
  .publish-time {
    font-size: 20px;
    color: var(--次要);
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
