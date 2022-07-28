import Vue from 'vue';
import Router from 'vue-router';
import Dashboard from '../pages/Dashboard.vue';
import Login from '../pages/core/Login.vue';
import Error from '../pages/core/Error.vue';

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Dashboard,
      beforeEnter:(to, from, next)=>{
        if(!localStorage.getItem('token')){
          return next({
            path: '/'
          })
        }
        next()
      },
      meta: {
        breadcrumb: [
          { name: 'dashboard' }
        ]
      }
    },
    
    {
      path: '/',
      name: 'Login',
      component: Login,
      meta: {
        allowAnonymous: true
      }
    },
    {
      path: '/error',
      name: 'Error',
      component: Error,
      meta: {
        allowAnonymous: true
      }
    },
  ]
});
