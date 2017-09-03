import {
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGIN_RE,
  MEMBER_RECEIVE,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initMember() {
  let member = localStorage.getItem('zxkMember')
  if (member) {
    return JSON.parse(member)
  } else {
    return {
      id: -1,
      phone: '13213195318',
      nickname: '',
      name: '',
      unit: '',
      type: -1,
      joinTime: -1,
      updateTime: -1,
      lastReadNewsTime: -1,
      hasMessage: -1,
      funs: [],
      avatar: '',
      introduction: '',
      starNum: -1,
      funsNum: -1,
      getPraiseNum: -1,
      articleNum: -1,
      anthology: [],
      byId: {
        '-1': {
          id: -1,
          name: '匿名',
        }
      },
      all: [-1],
    }
  }
}

const state = initMember();

const getters = {

};

const actions = {
  login({ commit, state }, user) {
    let data;
    data = api.memberLogin();
    if (data) {
      commit(MEMBER_LOGIN_SUCCESS, { data });
    } else {
      commit(MEMBER_LOGIN_RE);
    }
  },
};

const mutations = {
  [MEMBER_LOGIN_SUCCESS](state, { user }) {
    state = { ...state, ...user };
    console.log(state)
    router.push('/home')
  },
  [MEMBER_LOGIN_RE]() {
    router.push('/login')
  },
  [MEMBER_RECEIVE](state, member) {
    if (Array.isArray(member)) {
      state.needFetch = false;
      normalizeDataArr(state, member);
      state.lastTime = +new Date();
    } else if (typeof member === 'object') {
      normalizeDataObj(state, member)
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
