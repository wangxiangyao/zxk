import fetch from './fetch';

let anthologyId = 3;
let contentId = 10;
let commentId = 100;
let createTime = +new Date();
let contentData = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'wxy',
    },
    anthology: {
      id: 2,
      author: 1,
      title: '前端咨询'
    },
    type: 1,
    createTime: createTime++,
    updateTime: +new Date(),
    title: "用来测试的文章",
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
    type: 1,
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
    type: 1,
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
    type: 1,
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
    type: 1,
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
    type: 1,
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
    type: 1,
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
  {
    id: 8,
    author: {
      id: 1,
      name: 'wxy',
    },
    type: 2,
    createTime: +new Date(),
    title: '为什么大家都不喜欢赏金猎人，为什么大家都不喜欢赏金猎人，为什么大家都不喜欢赏金猎人，为什么大家都不喜欢赏金猎人？',
    content: '赏金猎人的技能也不厉害啊，为什么都不嫌呢？赏金猎人的技能也不厉害啊，为什么都不嫌呢？赏金猎人的技能也不厉害啊，为什么都不嫌呢？赏金猎人的技能也不厉害啊，为什么都不嫌呢？赏金猎人的技能也不厉害啊，为什么都不嫌呢？赏金猎人的技能也不厉害啊，为什么都不嫌呢？赏金猎人的技能也不厉害啊，为什么都不嫌呢？',
    attentionNum: 0,
    praiseNum: 0,
    answerNum: 0,
  },
]
let commentData = [
  {
    id: 1,
    author: {
      id: 1,
      name: 'wxy'
    },
    type: 1,
    createTime: createTime++,
    content: '你说的真好',
    praiseNum: 100,
    discussNum: 2,
    discuss: [
      {
        id: 11,
        author: {
          id: 1,
          name: 'wxy',
        },
        type: 3,
        createTime: createTime++,
        content: '我真的不能再赞同你了',
      },
      {
        id: 12,
        author: {
          id: 1,
          name: 'wxy',
        },
        type: 3,
        createTime: createTime++,
        content: '我是第二个！',
      },
    ],
  },
  {
    id: 2,
    author: {
      id: 1,
      name: 'wxy'
    },
    type: 1,
    createTime: createTime++,
    content: '你说的真好*2',
    praiseNum: 100,
    discussNum: 2,
    discuss: [
      {
        id: 13,
        author: {
          id: 1,
          name: 'wxy',
        },
        type: 3,
        createTime: createTime++,
        content: '我是第三个',
      },
      {
        id: 14,
        author: {
          id: 1,
          name: 'wxy',
        },
        type: 3,
        createTime: createTime++,
        content: '我也来了！',
      },
    ],
  },
];

function deepCopy(a) {
  let obj = JSON.parse(JSON.stringify(a));
  return obj;
}

export default {
  memberLogin(user) {
    // 返回对象，表示验证未过期
    // 返回false，表示要重新登录
    return fetch('member/login/', user, 'POST');
  },
  memberGetVfc(phone) {
    // 请求验证码
    let res = fetch('/member/verificationCode', {
      mobile: phone,
    }, 'POST');
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
    contentId++
    return {
      data: {
        id: contentId,
        author: {
          id: article.authorId,
          name: 'wxy',
        },
        type: 1,
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

  addIssue(issue) {
    contentId++
    return {
      data: {
        id: contentId,
        author: {
          id: issue.authorId,
          name: 'wxy',
        },
        type: 2,
        createTime: +new Date(),
        title: issue.title,
        content: issue.content,
        attentionNum: 0,
        praiseNum: 0,
        answerNum: 0,
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
  getOneContent(id) {
    console.log(id, contentData)
    let item;
    for (let i = 0, len = contentData.length; i < len; i++) {
      if (contentData[i].id == id) {
        item = deepCopy(contentData[i]);
      }
    }
    item.comment = deepCopy(commentData);
    return {
      data: item,
    }
  },


  // comment相关
  addComment(comment) {
    commentId++;
    return {
      data: {
        id: commentId,
        target: comment.target,
        author: {
          id: comment.authorId,
        },
        type: 1,
        createTime: +new Date(),
        content: comment.content,
        discuss:[],
        pariseNum: 0,
      }
    }
  },

  getOneComment(id) {
    let item;
    for (let i = 0, len = commentData.length; i < len; i++) {
      if (commentData[i].id == id) {
        item = deepCopy(commentData[i]);
      }
    }
    return {
      data: item,
    }
  },
};
