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

// const Home = r => require.ensure([], () => r(require('/containers/Home/Home.vue')))
// const Find = resolve => require.ensure(['../containers/Find/index.vue'], resolve);
// const Information = resolve => require.ensure(['../containers/Information'], resolve);
// const Main = resolve => require.ensure(['../containers/Main'], resolve);

Vue.use(Router);

const router = new Router({
  mode: 'history',
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
        next();
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
      path: '/article/:id',
      component: Article,
    },
  ],
});

export default router
