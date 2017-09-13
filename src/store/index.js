import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import mutations from './mutations.js';
import member from './modules/member';
import anthology from './modules/anthology.js';
import content from './modules/content.js';
import comment from './modules/comment.js';
import discuss from './modules/discuss.js';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


// 通常，请求数据，在对应的分片store中，接收数据，在顶层store中
export default new Vuex.Store({
  state: {
    hasMask: false,
  },
  mutations,
  actions,
  getters,
  modules: {
    member,
    anthology,
    content,
    comment,
    discuss,
  },
  stric: debug,
});
