<template>
  <div :class="$style.user">
    <div :class="$style.avator"></div>
    <div :class="$style.authorInfo">
      <div :class="$style.name">
        {{user.name}}
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
  </div>
</template>

<script>

// timeType: 1.年月日 时分秒     2.一天之内，n前，一天之外，年月日

export default {
  name: 'user',
  props: {
    user: Object,
    publishTime: {
      type: null,
    },
    timeType: {
      type: Number,
      default: 1,
    }
  },
  computed: {
    createTime() {
      if (!this.publishTime) {
        return
      }
      if (this.timeType === 1) {
        let time = new Date(this.publishTime);
        let timeText = `${time.getFullYear()}年${time.getMonth()}月${time.getDate()}日 ${time.getHours()}点${time.getMinutes()}分`;
        return timeText;
      } else if (this.timeType === 2) {
        let createTime = this.publishTime;
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
      }
    },
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .user {
    display: flex;
    align-items: center;
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
</style>
