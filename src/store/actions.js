import {
  ANTHOLOGY_RECEIVE,
  CONTENT_RECEIVE,
  MEMBER_RECEIVE,
} from './mutation-types.js';

import { normalizeDataObj, normalizeDataArr } from './tool.js';

export const contentReceive = ({ state, commit, dispatch }, content) => {
  console.log('收到了content', content)
  let author;
  let anthology;
  let comment;
  if (Array.isArray(content)) {
    if (content.length === 0) {
      return;
    }
    author = [];
    content.map((item) => {
      if (item.author.id !== -1) {
        author.push(item.author)
      }
      item.author = item.author.id;
    })
  } else if (typeof content === 'object') {
    console.log('接收到的是对象content')
    author = {};
    comment = [];
    if (content.author.id !== -1) {
      author = {
        ...content.author,
      }
    }
    content.author = content.author.id;
    if (content.anthology) {
      anthology = {
        ...content.anthology,
      }
      content.anthology = content.anthology.id;
      commit('ANTHOLOGY_RECEIVE', anthology);
    }
    comment = content.comment;
    delete content.comment;
    dispatch('commentReceive', comment);
  }
  console.log('范式化第一步，分发', content, author, comment);
  commit('CONTENT_RECEIVE', content);
  commit('MEMBER_RECEIVE', author);
}

export const commentReceive = ({ state, commit }, comment) => {
  console.log('接收到了comment', comment);
  let author;
  // 以后要添加discuss的范式化
  if (Array.isArray(comment)) {
    if (comment.length === 0) {
      return;
    }
    author = [];
    comment.map((item) => {
      if (item.author.id !== -1) {
        author.push(item.author)
      }
      item.author = item.author.id;
    })
  } else if (typeof comment === 'object') {
    console.log('接收到的是对象comment')
    author = {};
    if (comment.author.id !== -1) {
      author = {
        ...comment.author,
      }
    }
    comment.author = comment.author.id;
  }
  commit('MEMBER_RECEIVE', author);
  commit('COMMENT_RECEIVE', comment);
}
