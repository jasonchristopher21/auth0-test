import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import SignupView from "../views/SignupView.vue"
import ForceLoginView from "../views/ForceLoginView.vue"
import EditProfileView from "../views/EditProfileView.vue"
import PleaseLoginAgainView from "../views/PleaseLoginAgainView.vue"
import EditPasswordView from "../views/EditPasswordView.vue"


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/signup',
      name: 'signup',
      component: SignupView
    },
    {
      path: '/forcelogin',
      name: 'forcelogin',
      component: ForceLoginView
    },
    {
      path: '/edit/profile',
      name: 'edit profile',
      component: EditProfileView
    },
    {
      path: '/updatesuccessful',
      name: 'Profile update successful',
      component: PleaseLoginAgainView
    },
    {
      path: '/edit/password', 
      name: 'edit password',
      component: EditPasswordView
    }
  ]
})

export default router
