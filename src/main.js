import Vue from 'vue'
import axios from 'axios';
// import d3 from  'd3;'
Vue.prototype.$axios=axios;

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App.vue'

Vue.use(ElementUI);
Vue.config.productionTip = false;

new Vue({
  render: h => h(App),
}).$mount('#app')

// const vm = new Vue({
//   render: h => h(App),
// }).$mount('#app')

// window.vm = vm




