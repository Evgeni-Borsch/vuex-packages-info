import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import axios from 'axios';
import store from './store/index'

Vue.prototype.$title = ''
Vue.prototype.axios = axios
Vue.config.productionTip = false


new Vue({
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
