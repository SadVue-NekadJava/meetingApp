import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import moment from 'moment-timezone/data/builds/moment-timezone-with-data-2012-2022.js'
import moment from 'moment'

Vue.prototype.moment = moment


Vue.config.productionTip = false

// Vue.use(require('vue-moment'));


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
