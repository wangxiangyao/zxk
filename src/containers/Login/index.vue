<template>
  <div id="login">
    <div class="logo">

    </div>
    <div class="login-info">
      <ItemGroup>
        <Item>
          <label for="userphone" class="input-wrapper">
            <span class="label-text">手机号</span>
            <input type="text" name="userphone" v-model="phone" class="my-input" id='userphone'>
          </label>
        </Item>
        <Item>
          <label for="verificationCode" class="input-wrapper">
            <span class="label-text">验证码</span>
            <input class="my-input" type="text" name="vue-router" v-model="verificationCode" id='verificationCode'>
            <div class="vfc-btn">
              <div class="vfc-text" @click="getVerificationCode">{{ vfcMessage }}</div>
            </div>
          </label>
        </Item>
      </ItemGroup>
    </div>
    <div class="login-action">
      <div class="login-wrapper">
        <MyButton text="上车" @handleClick="handleLogin" :style='btnStyle'/>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Item from "../../components/Item"
import ItemGroup from '../../components/Item/ItemGroup.vue'
import api from '../../api/index.js'
import MyButton from '../../components/MyButton'

export default {
  name: 'login',
  components: {
    Item,
    ItemGroup,
    MyButton,
  },
  data() {
    return {
      phone: this.$store.phone,
      verificationCode: '',
      vfcText: "获取验证码",
      vfcResetTime: 60,
      isVfcFetch: false,
      vfcInterval: '',
      btnStyle: {
        fontSize: '40px',
      }
    }
  },

  computed: {
    vfcMessage() {
      return this.isVfcFetch ? `${this.vfcResetTime} s` : this.vfcText;
    }
  },

  methods: {
    getVerificationCode() {
      if (this.isVfcFetch) {
        return;
      }
      api.memberGetVfc();
      this.isVfcFetch = !this.isVfcFetch;
      this.vfcInterval = setInterval(() => {
        if (this.vfcResetTime === 0) {
          this.isVfcFetch = !this.isVfcFetch;
          this.vfcResetTime = 60;
          clearInterval(this.vfcInterval);
          return
        }
        this.vfcResetTime -= 1;
      }, 1000);
    },

    handleLogin() {
      // 请求api.memberLogin
      this.$router.push("find")
    }
  }
};
</script>

<style scoped>
 #login {
   position: absolute;
   z-index: 10;
   height: 100vh;
   width: 100vw;
   background-color: #fff;
 }
 .input-wrapper {
   display: flex;
   height: 100%;
 }
 .label-text {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 30%;
   font-size: 36px;
 }
 .my-input {
   flex: 1;
   font-size: 28px;
   padding: 10px;
 }
 .my-input:focus {
   outline: none;
 }
 #userphone {
   margin-right: -8px;
 }
 .vfc-btn {
   display: flex;
   justify-content: center;
   align-items: center;
   width: 210px;
   padding: 20px 0;
   font-size: 30px;
   line-height: 60px;
 }
 .vfc-text {
   padding: 0 25px;
   width: 100%;
   border-left: 2px dashed #ccc;
 }
 .logo {
   height: 500px;
   background-color: #ccc;
 }
 .login-action {
   margin-top: 80px;
 }
 .login-wrapper {
   margin: 0 100px;
   height: 100px;
 }
</style>
