import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faGoogle } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle, faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './utils/formValidationRules'
import './assets/css/index.scss'

library.add(faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle, faSearch, faFacebook, faGoogle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
