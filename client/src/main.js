import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Toasted from 'vue-toasted'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faFacebook, faGoogle, faLinkedin, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons'
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
import BaseSpinner from '@/components/Base/BaseSpinner'

Vue.component('Container', Container)
Vue.component('ContentContainer', ContentContainer)
Vue.component('BaseButton', BaseButton)
Vue.component('BaseClearButton', BaseClearButton)
Vue.component('BaseCompanyLogo', BaseCompanyLogo)
Vue.component('BaseOffersList', BaseOffersList)
Vue.component('Pagination', Pagination)
Vue.component('BaseHero', BaseHero)
Vue.component('BaseSpinner', BaseSpinner)

library.add(faFacebook, faGoogle, faLinkedin, faInstagram, faTwitter)
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
  mounted() {
    store.commit('SET_WINDOW_WIDTH', window.innerWidth)
    window.addEventListener('resize', () => {
      store.commit('SET_WINDOW_WIDTH', window.innerWidth)
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize')
  },
  render: h => h(App)
}).$mount('#app')
