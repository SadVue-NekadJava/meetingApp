import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import BootstrapVue from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// import moment from 'moment-timezone/data/builds/moment-timezone-with-data-2012-2022.js'
import moment from 'moment'

Vue.filter('splitTime', function (value) {
  return value.split(' ')[1].slice(0,5) + ' ' + value.split(' ')[0].slice(5,10);
})

Vue.prototype.moment = moment
import * as VueGoogleMaps from 'vue2-google-maps'

Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyBq0S0uSsgSZdF71TK8vnLreuNlv_HY13U',
    libraries: 'places', // This is required if you use the Autocomplete plugin
    // OR: libraries: 'places,drawing'
    // OR: libraries: 'places,drawing,visualization'
    // (as you require)

    //// If you want to set the version, you can do so:
    // v: '3.26',
  },

  //// If you intend to programmatically custom event listener code
  //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
  //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
  //// you might need to turn this on.
  // autobindAllEvents: false,

  //// If you want to manually install components, e.g.
  //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
  //// Vue.component('GmapMarker', GmapMarker)
  //// then disable the following:
  // installComponents: true,
})


Vue.config.productionTip = false

// Vue.use(require('vue-moment'));


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
