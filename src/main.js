import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import i18n from './services/i18n/i18n'
import { firestorePlugin } from 'vuefire'
import '../src/assets/loading.css'
import vuetify from '@/plugins/vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(firestorePlugin)

Vue.filter('dateConvert', function(value) {
  if (!value) return value

  return new Date(value).toLocaleString()
})

new Vue({
  vuetify,
  i18n,
  router,
  store,
  render: h => h(App)
}).$mount('#app')
