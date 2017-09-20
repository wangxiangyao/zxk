<template>
  <div :class="$style.detailWrapper">
    <div :class="$style.contentType">
      <div :class="$style.title">
        {{tittleText}}
      </div>
      <div class="search">
        搜索
      </div>
      <div class="attention">
        <mytitle text='关注话题'/>
      </div>
      <div class="hot">
        <mytitle text='热门话题'/>
      </div>
    </div>
    <div :class="$style.action" >
      <div :class="$style.next">
        <div :class="$style.button" @click='handlePublish'>
          {{buttonText}}
        </div>
      </div>
      <div :class="$style.secret" v-if='this.contentType === 1'>
        <router-link to="/find"  :class="$style.button">
          私密文章
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import mytitle from '../../components/MyTitle';

export default {
  name: 'contentDetail',
  components: {
    mytitle,
  },
  data() {
    return {
      id: this.$route.params.id,
    }
  },
  computed: {
    contentType() {
      const type = this.$route.params.type;
      if (type === 'article') {
        return 1
      } else if (type === 'issue') {
        return 2
      }
    },
    tittleText() {
      const type = this.contentType
      if (type === 1) {
        return '若要发布，请选择所属话题'
      } else if (type === 2) {
        return '请选择所属话题'
      }
    },
    buttonText() {
      const type = this.contentType
      if (type === 1) {
        return '发 布'
      } else if (type === 2) {
        return '确定'
      }
    }
  },
  methods: {
    handlePublish() {
      // TODO: 关于内容所属话题，要派发 选择话题 的action
      // 逻辑：
      // 1. 判断是否选择话题，若果没有，提示，并失败
      // 2. 派发chooiseTopic的actionx，dispatch('chooiseTopic', {话题: 话题码})
      // 3. 在chooiseTopic的action成功后，如果是文章类型，直接发布。
      // 4. 请求成功后跳转到 /find
      this.$router.push('/find')
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style module>
  .detailWrapper {
    composes: fullScreen from "../../commenStyle/layout.css";
    background-color: #fff;
  }
  .contentType {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-bottom: 168px;
  }
  .action {
    position: fixed;
    bottom: 0;
    display: flex;
    width: 100%;
    box-shadow: 0 2px 15px 1px #aaa;
  }
  .secret, .next {
    padding: 30px;
  }
  .secret {
    flex: 0 0 50%;
  }
  .next {
    flex: 1;
  }
  .button {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    padding: 30px;
    border-radius: 10px;
    background-color: var(--主题色);
    color: #fff;
  }
</style>
