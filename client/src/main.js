import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './utils/formValidationRules'
import './assets/css/index.scss'

library.add(faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle, faSearch, faFacebook, faGoogle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Toasted, {
  position: 'bottom-center',
  duration: 2000
})

Vue.toasted.register('success', {
  type: 'success',
})

Vue.toasted.register('error', {
  type: 'error'
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
