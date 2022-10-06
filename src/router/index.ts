import HomeView from '@/views/home/HomeView.vue'
import LoginView from '@/views/login/LoginView.vue'
import { isAuthenticated } from '../views/login/login.api'
import { apolloClient } from '../main'
import { createRouter, createWebHistory } from 'vue-router'
import { provideApolloClient } from '@vue/apollo-composable'

export const APP_ROUTES = {
  LOGIN: {
    path: '/',
    name: 'login',
    component: LoginView
  },
  HOME: {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  ABOUT: {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (About.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/AboutView.vue')
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [APP_ROUTES.LOGIN, APP_ROUTES.HOME, APP_ROUTES.ABOUT]
})

router.beforeEach(async (to, from, next) => {
  provideApolloClient(apolloClient)

  const { onResult, loading, error } = isAuthenticated()

  return new Promise<any>((resolve) => {
    onResult((result) => {
      resolve(result)
    })
  }).then((result) => {
    const isToLoginRoute = to.name === APP_ROUTES.LOGIN.name

    if (!result.data?.isAuthenticated && !isToLoginRoute) {
      next(APP_ROUTES.LOGIN.path)
    } else if (result.data?.isAuthenticated && isToLoginRoute) {
      next(APP_ROUTES.HOME.path)
    } else {
      next()
    }
  })
})

export default router
