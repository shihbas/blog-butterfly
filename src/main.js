import Vue from 'vue'
import App from './App'
// 路由注册
import router from './router'
import '@/router/each'

Vue.config.productionTip = false
// 状态注册
import store from '@/store'

// element-ui
import Element from 'element-ui';
// import 'element-ui/lib/theme-chalk/index.css';

Vue.use(Element, {
  size: 'small',
  zIndex: 3000
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router: router,
  store: store,
  render: h => h(App)
})
