import {
  ANTHOLOGY_RECEIVE,
  CONTENT_RECEIVE,
  MEMBER_RECEIVE,
  DISCUSS_RECEIVE,
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
    // 分开comment
    if (content.comment) {
      comment = [...content.comment];
      console.log(comment, content.comment)
      content.comment = [];
      comment.map(item => {
        content.comment.push(item.id);
      })
      dispatch('commentReceive', comment);
    }
  }
  console.log('范式化第一步，分发', content, author, comment);
  commit('CONTENT_RECEIVE', content);
  commit('MEMBER_RECEIVE', author);
}

export const commentReceive = ({ state, commit, dispatch }, comment) => {
  console.log('接收到了comment', comment);
  let author;
  let discuss;
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
    discuss = [];
    if (comment.target) {
      state.content.byId[comment.target].comment.unshift(comment.id);
    }
    if (comment.author.id !== -1) {
      author = {
        ...comment.author,
      }
    }
    comment.author = comment.author.id;
    // 分开discuss
    if (comment.discuss) {
      discuss = comment.discuss;
      comment.discuss = [];
      discuss.map(item => {
        comment.discuss.push(item.id);
      })
      dispatch('discussReceive', discuss);
    }
  }
  commit('MEMBER_RECEIVE', author);
  commit('COMMENT_RECEIVE', comment);
}

export const discussReceive = ({ state, commit }, discuss) => {
  console.log('接收到了discuss', discuss);
  let author;
  if (Array.isArray(discuss)) {
    if (discuss.length === 0) {
      return;
    }
    author = [];
    discuss.map((item) => {
      if (item.author.id !== -1) {
        author.push(item.author)
      }
      item.author = item.author.id;
    })
   } else if (typeof discuss === 'object') {
    console.log('接收到的是对象discuss')
    author = {};
    if (discuss.target) {
      console.log('添加到comment中')
      state.comment.byId[discuss.target].discuss.unshift(discuss.id);
    }
    if (discuss.author.id !== -1) {
      author = {
        ...discuss.author,
      }
    }
    discuss.author = discuss.author.id;
  }
  commit('MEMBER_RECEIVE', author);
  commit('DISCUSS_RECEIVE', discuss);
}
