import {
  ANTHOLOGY_RECEIVE,
  CONTENT_RECEIVE,
  MEMBER_RECEIVE,
} from './mutation-types.js';

import { normalizeDataObj, normalizeDataArr } from './tool.js';

export const contentReceive = ({ state, commit }, content) => {
  console.log('收到了content', content)
  let author;
  if (Array.isArray(content)) {
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
    if (content.author.id !== -1) {
      author = {
        ...content.author,
      }
    }
    content.author = content.author.id;
  }
  console.log('范式化第一步，分发', content, author);
  commit('CONTENT_RECEIVE', content);
  commit('MEMBER_RECEIVE', author);
}
