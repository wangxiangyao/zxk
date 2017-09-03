import fetch from './fetch';

let anthologyId = 3;
let articleId = 8;
let createTime = +new Date();
let contentData = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: createTime++,
    updateTime: +new Date(),
    title: "前端第一课",
    content: "今天，我们来学习css的知识...",
    collectNum: 100,
    praiseNum: 455,
    readNum: 7699,
  },
  {
    id: 2,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: 1504141461121,
    updateTime: +new Date(),
    title: "前端第二课",
    content: "今天，我们来学习css的知识...",
    collectNum: 33,
    praiseNum: 532,
    readNum: 1323,
  },
  {
    id: 3,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: createTime++,
    updateTime: +new Date(),
    title: "前端第三课",
    content: "今天，我们来学习css的知识...",
    collectNum: 66,
    praiseNum: 575,
    readNum: 1233,
  },
  {
    id: 4,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: createTime++,
    updateTime: +new Date(),
    title: "前端第四课",
    content: "今天，我们来学习css的知识...",
    collectNum: 77,
    praiseNum: 112,
    readNum: 444,
  },
  {
    id: 5,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: createTime++,
    updateTime: +new Date(),
    title: "前端第五课",
    content: "今天，我们来学习css的知识...",
    collectNum: 56,
    praiseNum: 99,
    readNum: 123,
  },
  {
    id: 6,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: createTime++,
    updateTime: +new Date(),
    title: "越优秀的人，越早明白这16件事情。",
    content: "今天，我们来学习css的知识...",
    collectNum: 123,
    praiseNum: 1414,
    readNum: 10009,
  },
  {
    id: 7,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 0,
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    createTime: 1504141461121,
    updateTime: +new Date(),
    title: "前端第七课",
    content: "今天，我们来学习css的知识...",
    collectNum: 12,
    praiseNum: 44,
    readNum: 66,
  },
]

function deepCopy(a) {
  let obj = JSON.parse(JSON.stringify(a));
  return obj;
}

export default {
  memberLogin(user) {
    // 返回对象，表示验证未过期
    // 返回false，表示要重新登录
    return false;
    // return fetch('member/login/', user, 'POST');
  },
  memberGetVfc(phone) {
    // 请求验证码
    let res = fetch('/member/verificationCode', {
      mobile: phone,
    }, 'POST')
    return res;
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
        author: {
          id: article.authorId,
          name: 'wxy',
        },
        anthology: {
          id: article.anthologyId,
        },
        createTime: +new Date(),
        title: article.title,
        content: article.content,
        readNum: 0,
        praiseNum: 0,
        collectNum: 0,
      }
    }
  },

  fetchContent() {
    let data = deepCopy(contentData);
    console.log(data)
    return {
      data,
    };
  },
  getOneArticle(id) {
    console.log(id, contentData)
    let item;
    for (let i = 0, len = contentData.length; i < len; i++) {
      if (contentData[i].id == id) {
        item = deepCopy(contentData[i]);
      }
    }
    return {
      data: item,
    }
  }
};
