import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import Login from '@/views/Login'
import Register from '@/views/Register'
import PostOffer from '@/views/PostOffer'
import SingleOffer from '@/views/SingleOffer'
import Dashboard from '@/views/Dashboard'
import OfferEdit from '@/views/OfferEdit'

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
    path: '/post-offer',
    name: 'PostOffer',
    component: PostOffer
  },
  {
    path: '/offer/:id',
    name: 'SingleOffer',
    component: SingleOffer
  },
  {
    path: '/offer/:id/edit',
    name: 'OfferEdit',
    component: OfferEdit
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
