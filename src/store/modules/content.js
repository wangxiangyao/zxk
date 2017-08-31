import {
  ARTICLE_ADD,
  ARTICLE_RECEIVE,
  CONTENT_REQUEST,
  CONTENT_RECEIVE,
  CONTENT_NEED_FETCH,
} from '../mutation-types';
import api from '../../api';
import router from '../../router';
import { normalizeDataObj, normalizeDataArr } from '../tool.js';

function initContent() {
  let content = localStorage.getItem('zxkContent')
  if (content) {
    return JSON.parse(content)
  } else {
    return {
      isFetching: false,
      needFetch: true,
      lastTime: '',
      byId: {

      },
      all: [],
      byCreateTime: [],
    }
  }
}

function soltByCreateTime(state) {

  // 快排，把content按createTime重新排列，返回排序后的由id组成的数组

  let all = [...state.all],
      byId = state.byId;
      console.log(all, byId);

  sort(0, all.length - 1);
  state.byCreateTime = all;
  return;

  function sort(left, right) {
    console.log(all);
    let i = left,
        j = right,
        stardard = all[left];
    if (( right - left ) > 0) {
      while ( i < j ) {
        for(; i < j; j--) {
          if (byId[all[j]].createTime > byId[stardard].createTime) {
            all[i++] = all[j];
            break;
          }
        }
        for (; i < j; i++) {
          if (byId[all[i]].createTime < byId[stardard].createTime) {
            all[j--] = all[i];
            break;
          }
        }
      }
      all[i] = stardard;
      sort(left, i - 1);
      sort(i + 1, right);
    }
  }
}

function insertByCreateTime(state, content) {
  // TODO: 未测试此函数

  // 接收到单个对象，需要插入byCreateTime字段，用二分查找，找到合适位置，然后插入
  let byCreateTime = state.byCreateTime;
  let byId = state.byId;

  let keyNum = content.id,
  left = 0,
  right = byCreateTime.length - 1;

  while(left <= right) {
    let middle = Math.floor((left + right) / 2);
    if (byId[keyNum].createTime >= byId[middle].createTime) {
      right = middle - 1;
    } else {
      left = middle + 1;
    }
  }
  byCreateTime.splice(left, 0, keyNum);
  return;
}

const state = initContent();

const getters = {

};

const actions = {
  addArticle({ state, commit, dispatch }, article) {
    if (state.isFetching) {
      return
    }
    commit('ARTICLE_ADD');
    let res = api.addArticle(article);
    console.log(res);
    dispatch('contentReceive', res.data);
  },
  fetchContentIfNeeded({ state, dispatch }) {
    console.log('判断是会否需要请求');
    if (state.isFetching) {
      return;
    }
    if (state.needFetch) {
      dispatch('fetchContent');
    }
  },
  fetchContent({ state, commit, dispatch }) {
    commit('CONTENT_REQUEST');
    console.log('请求content')
    let res = api.fetchContent();
    console.log(res)
    dispatch('contentReceive', res.data);
  }
};

const mutations = {
  [ARTICLE_ADD](state) {
    state.isFetching = true;
  },
  [CONTENT_REQUEST](state) {
    state.isFetching = true;
  },
  [CONTENT_RECEIVE](state, content) {
    console.log('范式化第二步，保存')
    if (Array.isArray(content)) {
      state.needFetch = false;
      normalizeDataArr(state, content);
      state.lastTime = +new Date();
      soltByCreateTime(state);
    } else if (typeof content === 'object') {
      normalizeDataObj(state, content)
      insertByCreateTime(state, content);
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