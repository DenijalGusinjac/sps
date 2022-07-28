// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import axios from './plugins/axios';

import VuePlyr from 'vue-plyr'
import 'vue-plyr/dist/vue-plyr.css'

import 'vuetify/dist/vuetify.min.css';
import 'font-awesome/css/font-awesome.css';
import Vuetify from 'vuetify';


import { setupComponents } from './config/setup-components';
import store from './store'
import { setupAndGetI18n } from './config/setup-i18n';

axios.interceptors.request.use((config)=>{
  const token = localStorage.getItem('token')
  if (token) config.headers.common['Authorization'] = `Bearer ${token}`
  return config
}, error =>{
  return Promise.reject(error)
})

Vue.prototype.$http = axios;
Vue.prototype.$store = store;

const i18n = setupAndGetI18n(Vue);

import swatches from 'vue-swatches';
import "vue-swatches/dist/vue-swatches.min.css"


setupComponents(Vue);

Vue.use(Vuetify);
Vue.use(VuePlyr, {
  plyr: {}
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  i18n,
  components: { App },
  template: '<App/>',
  data: {
    themeColor: '#1e73be',
    useremail: 'arthur.dent@zz9.co.uk',
    userPassword: 'Start123$'
  },

  methods: {
    setLanguage(language) {
      const vm = this;

      localStorage.setItem('language', language);
    
      document.documentElement.lang = language;
    
      vm.$i18n.locale = language;
    
      vm.$vuetify.lang.current = language;
    }
  },

  created() {
    const vm = this;

    vm.setLanguage('en');
  },
})
