import { createApp, h, provide } from 'vue'
import App from './App.vue'
import router from './router'
import { DefaultApolloClient } from '@vue/apollo-composable'
import './assets/main.css'

import {
  ApolloClient,
  createHttpLink,
  InMemoryCache
} from '@apollo/client/core'

const API_PROD_URL = 'https://todo-app-api-kohl.vercel.app/graphql'
export const API_DEV_URL = 'http://localhost:3000/graphql'

const httpLink = createHttpLink({
  uri: process.env.NODE_ENV === 'production' ? API_PROD_URL : API_DEV_URL,
  credentials: 'include'
})

const cache = new InMemoryCache()

export const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
  credentials: 'include'
})

const app = createApp({
  setup() {
    provide(DefaultApolloClient, apolloClient)
  },

  render: () => h(App)
})

export const globalDirectives = {
  focus: {
    mounted: (el: HTMLInputElement) => el.focus()
  }
}

type DirectivesKeys = keyof typeof globalDirectives

Object.keys(globalDirectives).forEach((key) => {
  app.directive(key, globalDirectives[key as DirectivesKeys])
})

app.use(router)

app.mount('#app')
