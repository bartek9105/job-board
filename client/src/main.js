import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './utils/formValidationRules'
import './assets/css/main.scss'
import './assets/css/variables.scss'
import './assets/css/mixins/mixins.scss'

library.add(faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
