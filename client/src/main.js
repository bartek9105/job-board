import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faGoogle, faLinkedin, faInstagram } from '@fortawesome/free-brands-svg-icons'
import { faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle, faSearch, faSortDown, faSortUp, faColumns, faSignOutAlt, faCheck, faTimes, faEdit, faTimesCircle, faFilter, faIndustry, faUser, faArrowLeft, faCog, faBriefcase } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import './utils/formValidationRules'
import './assets/css/index.scss'
import Container from '@/components/Base/UIContainers/Container'
import ContentContainer from '@/components/Base/UIContainers/ContentContainer'
import BaseButton from '@/components/Base/Buttons/BaseButton'
import BaseClearButton from '@/components/Base/Buttons/BaseClearButton'
import BaseCompanyLogo from '@/components/Base/Company/BaseCompanyLogo'
import BaseOffersList from '@/components/Base/Offer/BaseOffersList'
import Pagination from '@/components/Pagination'
import BaseHero from '@/components/Base/BaseHero'

Vue.component('Container', Container)
Vue.component('ContentContainer', ContentContainer)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseClearButton', BaseClearButton)
Vue.component('BaseCompanyLogo', BaseCompanyLogo)
Vue.component('BaseOffersList', BaseOffersList)
Vue.component('Pagination', Pagination)
Vue.component('BaseHero', BaseHero)

library.add(faUserSecret, faLongArrowAltLeft, faLongArrowAltRight, faMapMarkerAlt, faHeart, faMoneyBillWave, faFileSignature, faClock, faCheckCircle, faSearch, faFacebook, faGoogle, faLinkedin, faInstagram, faSortDown, faSortUp, faColumns, faSignOutAlt, faCheck, faTimes, faEdit, faTimesCircle, faFilter, faIndustry, faUser, faArrowLeft, faCog, faBriefcase)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.use(Toasted, {
  iconPack: 'fontawesome',
  position: 'bottom-center',
  duration: 2000
})

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
