<template>
  <div class="pre-issue" @click='handleClick'>
    <div class="left">
      <div class="author">
        <User :user='author' :publishTime='issue.createTime' :timeType='2' />
      </div>
      <div class="title">
        <Type :type='type' :styleType='2'></Type>
        <div class="title-text">
          {{issue.title}}
        </div>
      </div>
      <div class="content-wrapper">
        <div class="issueContent">
          {{issue.content}}
        </div>
      </div>
      <div class="other">
        <div class="kind">
          所属类别
        </div>
        <div class="attention">
          关注 {{issue.attentionNum}}
        </div>
        <div class="answer">
          回答 {{issue.answerNum}}
        </div>
        <div class="praise">
          赞同 {{issue.praiseNum}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Type from '../ContentType';
import { mapState } from 'vuex';
import router from '../../router';
import User from '../User';

export default {
  name: 'preIssue',
  components: {
    Type,
    User,
  },
  data() {
    return {
      type: 2,
      currentTime: +new Date(),
    }
  },
  methods: {
    handleClick() {
      let id = this.issue.id;
      console.log(id);
      let url = `/Issue/${id}`;
      router.push(url);
    }
  },
  props: {
    issue: Object,
  },
  computed: {
    author() {
      return this.$store.state.member.byId[this.issue.author];
    },
    createTime: function() {
      let createTime = this.issue.createTime;
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
  .pre-issue {
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
  .content-wrapper {
    height: 80px;
    padding: 0 20px;
    margin-bottom: 20px;
    overflow: hidden;
  }
  .issueContent {
    line-height: 40px;
    font-size: 28px;
  }
  .kind{
    font-size: 28px;
  }

  .other {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }
  .attention, .answer, .praise {
    font-size: 24px;
    color: var(--次要);
    padding: 0 10px;
  }
</style>
