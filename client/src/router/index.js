import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Auth/Login'
import Register from '@/views/Auth/Register'
import Home from '@/views/Home'
import OfferDetails from '@/views/Offer/OfferDetails'
import OfferPost from '@/views/Offer/OfferPost'
import OfferEdit from '@/views/Offer/OfferEdit'
import UserDashboard from '@/views/User/UserDashboard'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/offer/post',
    name: 'OfferPost',
    component: OfferPost
  },
  {
    path: '/offer/:id',
    name: 'OfferDetails',
    component: OfferDetails
  },
  {
    path: '/offer/:id/edit',
    name: 'OfferEdit',
    component: OfferEdit
  },
  {
    path: '/dashboard',
    name: 'UserDashboard',
    component: UserDashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
