import fetch from './fetch';

let anthologyId = 3;
let articleId = 1;

export default {
  memberLogin(user) {
    // 返回对象，表示验证未过期
    // 返回false，表示要重新登录
    return false;
    // return fetch('member/login/', user, 'POST');
  },
  memberGetVfc() {
    // 请求验证码
    return 1234;
  },

  fetchAnthology(memberId) {
    // 请求用户文集
    return {
      data: [
        {
          id: 1,
          author: 1,
          title: '默认',
        },
        {
          id: 2,
          author: 1,
          title: '前端资讯',
        }
      ]
    }
  },

  addAnthology(anthology) {
    anthologyId++
    return {
      data: {
        id: anthologyId,
        author: anthology.author,
        title: anthology.title,
      }
    }
  },

  addArticle(article) {
    articleId++
    return {
      data: {
        id: articleId,
        author: article.authorId,
        title: article.title,
        content: article.content,
      }
    }
  }
};
