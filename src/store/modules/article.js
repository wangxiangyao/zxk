import {
  ARTICLE_ADD,
  ARTICLE_RECEIVE,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initArticle() {
  let article = localStorage.getItem('zxkArticle')
  if (article) {
    return JSON.parse(article)
  } else {
    return {
      isFetching: false,
      needFetch: true,
      lastTime: '',
      byId: {

      },
      all: [],
    }
  }
}

const state = initArticle();

const getters = {

};

const actions = {
  addArticle({ state, commit }, article) {
    if (state.isFetching) {
      return
    }
    commit('ARTICLE_ADD');
    let res = api.addArticle(article);
    console.log(res);
    commit('ARTICLE_RECEIVE', res.data);
  }
};

const mutations = {
  [ARTICLE_ADD](state) {
    state.isFetching = true;
  },
  [ARTICLE_RECEIVE](state, data) {
    if (Array.isArray(data)) {
      state.needFetch = false;
      normalizeDataArr(state, data);
      state.lastTime = +new Date();
    } else if (typeof data === 'object') {
      normalizeDataObj(state, data)
    }
    state.isFetching = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
