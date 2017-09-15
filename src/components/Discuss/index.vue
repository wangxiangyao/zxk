<template>
  <div :class="$style.discuss">
    <div :class="$style.top">
      <div :class="$style.avator"></div>
      <div :class="$style.authorInfo">
        <div :class="$style.name">
            wxy
          <div :class="$style.publishTime">
            {{createTime}}
          </div>
        </div>
      </div>
      <div :class="$style.action">
        <faicon :class='$style.icon' name='thumbs-o-up' scale='2'></faicon>
      </div>
    </div>
    <div class="discussContentWrapper">
      <div :class="$style.discussContent" @click='handleSelect'>
        {{discuss.content}}
      </div>
    </div>
  </div>
</template>

<script>
import 'vue-awesome/icons/thumbs-o-up';
import faicon from 'vue-awesome/components/Icon';
import Editor from '../Editor';

export default {
  name: 'preComment',
  components: {
    faicon,
    Editor,
  },
  data() {
    return {
    }
  },
  methods: {
    handleSelect() {
      this.$emit('select', this.discuss.id)
    }
  },
  props: {
    discuss: Object,
  },
  computed: {
    createTime: function() {
      let createTime = this.discuss.createTime;
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
<style module>
.discuss {
  display: flex;
  flex-direction: column;
  padding: 15px 10px;
  border-top: 2px solid rgba(155, 144, 194, .5);
}
.top {
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
.name {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 5px;
}
.publishTime {
  display: flex;
  align-items: flex-end;
  color: var(--次要);
  font-size: 20px;
  margin-left: 10px;
}
.action {
  display: flex;
  justify-content: center;
  align-items: center;
}
.icon {
  padding: 20px;
}
.avator {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: #ccc;
}
.discussContent {
  padding: 20px 0;
  text-align: justify;
  font-size: 24px;
}
</style>
