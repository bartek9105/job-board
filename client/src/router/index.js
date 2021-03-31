import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/Auth/Login'
import Register from '@/views/Auth/Register'
import PasswordForgot from '@/views/Auth/PasswordForgot'
import PasswordReset from '@/views/Auth/PasswordReset'
import Home from '@/views/Home'
import OfferDetails from '@/views/Offer/OfferDetails'
import OfferPost from '@/views/Offer/OfferPost'
import OfferEdit from '@/views/Offer/OfferEdit'
import CompaniesList from '@/views/Company/CompaniesList'
import CompanyDetails from '@/views/Company/CompanyDetails'
import NotFound from '@/views/NotFound'
import Profile from '@/views/Profile/Profile'
import ProfileDashboard from '@/views/Profile/ProfileDashboard'
import ProfileAccount from '@/views/Profile/ProfileAccount'
import ProfilePassword from '@/views/Profile/ProfilePassword'
import ProfileSavedOffers from '@/views/Profile/ProfileSavedOffers'
import ProfileInvoices from '@/views/Profile/ProfileInvoices'

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
    path: '/passwordforgot',
    name: 'PasswordForgot',
    component: PasswordForgot
  },
  {
    path: '/passwordreset',
    name: 'PasswordReset',
    component: PasswordReset
  },
  {
    path: '/offer/post',
    name: 'OfferPost',
    component: OfferPost
  },
  {
    path: '/offer/:slug',
    name: 'OfferDetails',
    component: OfferDetails,
    props: true
  },
  {
    path: '/offer/:id/edit',
    name: 'OfferEdit',
    component: OfferEdit
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: ProfileDashboard,
      },
      {
        path: 'account',
        name: 'Account',
        component: ProfileAccount,
      },
      {
        path: 'password',
        name: 'Password',
        component: ProfilePassword,
      },
      {
        path: 'saved',
        name: 'Saved',
        component: ProfileSavedOffers,
      },
      {
        path: 'invoices',
        name: 'Invoices',
        component: ProfileInvoices,
      }

    ]
  },
  {
    path: '/companies',
    name: 'CompaniesList',
    component: CompaniesList
  },
  {
    path: '/companies/:slug',
    name: 'CompanyDetails',
    component: CompanyDetails,
    props: true
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
  }
]

const router = new VueRouter({
  scrollBehavior() {
    return {
      x: 0,
      y: 0
    }
  },
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
