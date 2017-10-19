import {
  MEMBER_LOGIN_SUCCESS,
  MEMBER_LOGIN_RE,
  MEMBER_RECEIVE,
  MEMBER_LOGIN,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initMember() {
  let member = localStorage.getItem('zxkMe')
  if (member) {
    return {
      ...JSON.parse(member),
      byId: {
        '-1': {
          id: -1,
          name: '匿名',
        },
      },
      all: [-1],
      isFetching: false,
    }
  } else {
    return {
      id: -1,
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
      defaultPublishType: 1,
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
    commit(MEMBER_LOGIN);
    let data;
    api.memberLogin(user).then((json) => {
      if ( json === 'change fetch') {
        api.memberLogin(user).then((json) => {
          if (json.code == 200) {
            let data = json.data
            commit(MEMBER_LOGIN_SUCCESS, data);
          } else {
            commit(MEMBER_LOGIN_RE);
          }
        })
      } else {
        if (json.code == 200) {
          let data = json.data
          commit(MEMBER_LOGIN_SUCCESS, data);
        } else {
          commit(MEMBER_LOGIN_RE);
        }
      }
    })
  },
};

const mutations = {
  [MEMBER_LOGIN] (state) {
    state.isFetching = true;
  },
  [MEMBER_LOGIN_SUCCESS](state, user) {
    state.isFetching = false;
    state = Object.assign(state, user)
    console.log(state)
    let me = {
      phone: state.phone,
      id: state.id,
      defaultPublishType: state.defaultPublishType,
    }
    window.localStorage.setItem('zxkMe', JSON.stringify(me));
    state.isFetching = false;
    router.push('/find')
  },
  [MEMBER_LOGIN_RE]() {
    router.push('/login')
  },
  [MEMBER_RECEIVE](state, member) {
    console.log(state);
    if (Array.isArray(member)) {
      state.needFetch = false;
      normalizeDataArr(state, member);
      state.lastTime = +new Date();
    } else if (typeof member === 'object') {
      normalizeDataObj(state, member)
    }
    console.log(member, state);
    state.isFetching = false;
  },
};

export default {
  state,
  getters,
  actions,
  mutations,
};
