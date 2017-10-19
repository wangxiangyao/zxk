import {
  ANTHOLOGY_REQUEST,
  ANTHOLOGY_RECEIVE,
  ANTHOLOGY_ADD,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initAnthology() {
  let anthology = localStorage.getItem('zxkAnthology')
  if (anthology) {
    return JSON.parse(anthology)
  } else {
    return {
      isFetching: false,
      needFetch: true,
      lastTime: '',
      byId: {
        '1': {
          id: 1,
          author: 1,
          title: '前端资讯',
        },
      },
      all: [1],
    }
  }
}

const state = initAnthology();

const getters = {

};

const actions = {
  fetchAnthology({ commit, state }, memberId) {
    commit('ANTHOLOGY_REQUEST');
    api.fetchAnthology(memberId)
      .then((json) => {
        if (json.code === 200) {
          console.log(json)
          commit('ANTHOLOGY_RECEIVE', json.data.anthologies);
        }
      })
  },
  fetchAnthologyIfNeeded({ state, dispatch }, memberId) {
    if (state.isFetching) {
      return
    } else if (state.needFetch && memberId) {
      dispatch('fetchAnthology', memberId);
    }
  },
  addAnthology({ state, commit }, anthology) {
    if (state.isFetching) {
      return
    }
    commit('ANTHOLOGY_ADD');
    api.addAnthology(anthology)
      .then((json) => {
        if (json.code === 200) {
          commit('ANTHOLOGY_RECEIVE', json.data);
        }
      })

  }
};

const mutations = {
  [ANTHOLOGY_REQUEST](state) {
    state.isFetching = true;
  },
  [ANTHOLOGY_RECEIVE](state, data) {
    if (Array.isArray(data)) {
      state.needFetch = false;
      normalizeDataArr(state, data);
      state.lastTime = +new Date();
    } else if (typeof data === 'object') {
      normalizeDataObj(state, data)
    }
    state.isFetching = false;
  },
  [ANTHOLOGY_ADD](state) {
    state.isFetching = true;
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
