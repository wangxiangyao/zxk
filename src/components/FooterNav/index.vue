<template>
  <div class="footer-nav">
    <router-link to="/home" tag="div" class="nav">

        <i class="iconfont icon-shouye nav-icon" />
        <div class="text">
          首页
        </div>

    </router-link>
    <router-link to="/find" tag="div" class="nav">

        <i class="iconfont icon-faxian nav-icon" />
        <div class="text">
          发现
        </div>

    </router-link>
    <div class="nav add" @click="handleIsAdd">
      <i class="iconfont icon-add nav-icon" />
    </div>
    <router-link to="/information" tag="div" class="nav">

        <i class="iconfont icon-remind nav-icon" />
        <div class="text">
          消息
        </div>

    </router-link>
    <router-link to="/main" tag="div" class="nav">

        <i class="iconfont icon-addpeople nav-icon" />
        <div class="text">
          我的
        </div>

    </router-link>
    <MyMask v-show="isAdd" position="bottom" @handleClose.self="handleIsAdd">
      <div class="addType">
        <div class="addItem addArticle" @click="addArticle">
          写文章
        </div>
        <div class="addItem addIssue">
          提问题
        </div>
      </div>
    </MyMask>
  </div>
</template>

<script>
import router from '../../router'
import MyMask from "../MyMask/index.vue"

export default {
  name: 'footer-nav',
  components: {
    MyMask,
  },
  data() {
    return {
      isAdd: false,
    }
  },
  methods: {
    handleIsAdd() {
      this.isAdd = !this.isAdd;
    },
    addArticle() {
      this.isAdd = !this.isAdd;
      router.push('/aboutArticle/add');
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  .footer-nav {
    display: flex;
    flex-direction: row;
    border-top: 2px solid #ccc;
    text-align: center;
  }
  .nav {
    display: flex;
    flex-direction: column;
    flex: 1;
    height: 122px;
  }
  .nav-icon {
    font-size: 68px;
    padding-top: 5px;
  }
  .text {
    flex: 1;
    font-size: 28px;
  }
  .router-link-active .nav-icon, .router-link-active .text {
    color: rgb(155, 144, 194);
  }
  .add {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .icon-add {
    border-radius: 50%;
    padding: 8px;
    background-color: rgb(155, 144, 194);
    color: #fff;
  }
  .addType {
    display: flex;
    flex-direction: row;
    width: 100vw;
    height: calc(0.3 * 100vh);
    background-color: #fff;
    padding: 60px 0;
  }
  .addArticle, .addIssue {
    display: flex;
    justify-content: center;
    align-items: center;
    flex: 1;
    font-size: 48px;
  }
  .addItem {
    border-left: 2px dashed #ccc;
  }
  .addItem:nth-child(1) {
    border: none;
  }
</style>
