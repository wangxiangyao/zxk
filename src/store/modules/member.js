import {
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGIN_RE,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';

function initMember() {
  let member = localStorage.getItem('zxkMember')
  if (member) {
    return JSON.parse(member)
  } else {
    return {
      id: 1,
      phone: '',
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
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
