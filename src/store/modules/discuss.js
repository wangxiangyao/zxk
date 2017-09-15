import {
  DISCUSS_ADD,
  DISCUSS_RECEIVE,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initDiscuss() {
  let discuss = localStorage.getItem('zxkDiscuss')
  if (discuss) {
    return JSON.parse(discuss)
  } else {
    return {
      isFetching: false,
      lastTime: '',
      byId: {},
      all: [],
    }
  }
}

const state = initDiscuss();

const getters = {

};

const actions = {
  addDiscuss({ state, commit, dispatch }, discuss) {
    if (state.isFetching) {
      return
    }
    commit('DISCUSS_ADD');
    let res = api.addComment(discuss);
    console.log(res)
    dispatch('discussReceive', res.data);
  },
};

const mutations = {
  [DISCUSS_ADD](state) {
    state.isFetching = true;
  },
  [DISCUSS_RECEIVE](state, discuss) {
    console.log('范式化第二步，保存')
    if (Array.isArray(discuss)) {
      state.needFetch = false;
      normalizeDataArr(state, discuss);
      state.lastTime = +new Date();
    } else if (typeof discuss === 'object') {
      normalizeDataObj(state, discuss)
    }
    state.isFetching = false;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
