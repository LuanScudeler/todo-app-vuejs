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

// HTTP connection to the API
const httpLink = createHttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
})

// Cache implementation
const cache = new InMemoryCache()

// Create the apollo client
const apolloClient = new ApolloClient({
  link: httpLink,
  cache
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

Object.keys(globalDirectives).forEach((key) => {
  app.directive(key, globalDirectives[key as DirectivesKeys])
})

app.use(router)

app.mount('#app')

type DirectivesKeys = keyof typeof globalDirectives
