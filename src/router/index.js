import Vue from 'vue';
import Router from 'vue-router';
import store from '../store';

import Home from '../containers/Home';
import Find from '../containers/Find';
import Information from '../containers/Information';
import Main from '../containers/Main';
import Login from '../containers/Login';
import AboutArticle from '../containers/AboutArticle';
import Article from '../containers/Article';
import AboutIssue from '../containers/AboutIssue';
import Issue from '../containers/Issue';
import IssuePre from '../containers/Issue/pre.vue'
import aboutAnswer from '../containers/AboutAnswer';
import Answer from '../containers/Answer';
import ContentDetail from '../containers/ContentDetail';

// const Home = r => require.ensure([], () => r(require('/containers/Home/Home.vue')))
// const Find = resolve => require.ensure(['../containers/Find/index.vue'], resolve);
// const Information = resolve => require.ensure(['../containers/Information'], resolve);
// const Main = resolve => require.ensure(['../containers/Main'], resolve);

Vue.use(Router);

const router = new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      beforeEnter: (to, from, next) => {
        console.log(store);
        const { member } = store.state;
        if (member.id === -1) {
          next('login');
          return
        }
        store.dispatch('login', {
          phone: member.phone,
        });
        next('find');
      }
    },
    {
      path: '/login',
      component: Login,
    },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/find',
      component: Find,
    },
    {
      path: '/information',
      component: Information,
    },
    {
      path: '/main',
      component: Main,
    },
    {
      path: '/aboutArticle/:item/:id?',
      component: AboutArticle,
    },
    {
      path: '/aboutIssue/:item/:id?',
      component: AboutIssue,
    },
    {
      path: '/article/:id',
      component: Article,
    },
    {
      path: '/issue/:id',
      component: Issue,
      children: [
        {
          path: '',
          component: IssuePre,
        },
        {
          path: 'writeAnswer/',
          component: aboutAnswer,
        },
        {
          path: 'answer/:answerId',
          component: Answer,
        }
      ]
    },
    {
      path: '/contentDetail/:type/:id',
      component: ContentDetail,
    },
  ],
});
router.beforeEach((to, from , next) => {
  const { commit, state } = store;
  if (state.hasMask) {
    next(false)
    commit('MASK_CLOSE')
  } else {
    next();
  }
})

export default router
