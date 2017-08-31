import Vue from 'vue';
import Vuex from 'vuex';
import * as actions from './actions';
import * as getters from './getters';
import member from './modules/member';
import anthology from './modules/anthology.js';
import content from './modules/content.js';


Vue.use(Vuex);

const debug = process.env.NODE_ENV !== 'production';


// 通常，请求数据，在对应的分片store中，接收数据，在顶层store中
export default new Vuex.Store({
  actions,
  getters,
  modules: {
    member,
    anthology,
    content,
  },
  stric: debug,
});
