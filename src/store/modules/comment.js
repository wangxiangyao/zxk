import {
  COMMENT_ADD,
  COMMENT_RECEIVE,
  COMMENT_REQUEST_SOMEONE,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initComment() {
  let comment = localStorage.getItem('zxkComment')
  if (comment) {
    return JSON.parse(comment)
  } else {
    return {
      isFetching: false,
      lastTime: '',
      byId: {},
      all: [],
    }
  }
}

const state = initComment();

const getters = {

};

const actions = {
  addComment({ state, commit, dispatch }, comment) {
    if (state.isFetching) {
      return
    }
    commit('COMMENT_ADD');
    let res = api.addComment(comment);
    console.log(res)
    dispatch('commentReceive', res.data);
  },
  getOneComment({ state, commit, dispatch}, id) {
    commit('COMMENT_REQUEST_SOMEONE');
    let res = api.getOneComment(id);
    dispatch('commentReceive', res.data);
  },
};

const mutations = {
  [COMMENT_ADD](state) {
    state.isFetching = true;
  },
  [COMMENT_RECEIVE](state, comment) {
    console.log('范式化第二步，保存')
    if (Array.isArray(comment)) {
      state.needFetch = false;
      normalizeDataArr(state, comment);
      state.lastTime = +new Date();
    } else if (typeof comment === 'object') {
      normalizeDataObj(state, comment)
    }
    state.isFetching = false;
  },
  [COMMENT_REQUEST_SOMEONE](state) {
    state.isFetching = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
