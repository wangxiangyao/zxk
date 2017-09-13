// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';

import "./iconfont/iconfont.css"
import "./commenStyle/index.css"

Vue.config.productionTip = false;
console.log(window.devicePixelRatio);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});

Vue.directive('focus', {
  inserted: function(el) {
    el.focus();
  }
})
