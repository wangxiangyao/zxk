import fetch  from './fetch';
import { baseUrl } from './fetch'

function deepCopy(a) {
  let obj = JSON.parse(JSON.stringify(a));
  return obj;
}


export default {
  memberLogin(user) {
   return  new Promise(function(resolve, reject) {
      setTimeout(() => {
        if (baseUrl != '') {
          resolve()
        }
      }, 500)
    })
    .then(() => {
      return fetch('/member/login/', user, 'POST')
    })
  },
  memberGetVfc(phone) {
    // 请求验证码
    let res = fetch('/member/verificationCode', {
      mobile: phone,
    });
    return res;
  },

  fetchAnthology(memberId) {
    // 请求用户文集
    return fetch('/anthology/List', {memberId});
  },

  addAnthology(anthology) {
    return fetch('/anthology/add', anthology, 'POST')
  },

  addArticle(article) {
    return fetch('/article/add', article, 'POST')
  },
  publishArticle(option) {
    return fetch('/article/publish', option, 'POST')
  },

  addIssue(issue) {
    return fetch('/issue/add', issue, 'POST');
  },

  fetchContent(option = {}) {
    return fetch('/content/contentList', option);
  },
  getOneContent(id) {
    return fetch('/content/findContent', { contentId: id, })
  },


  // comment相关
  addComment(comment) {
    return fetch('/comment/publish', comment, 'POST')
  },

  getOneComment(id) {
    return fetch('/comment/findComment', {comment_id: id})
  },
};
