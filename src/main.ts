import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/main.css'

const app = createApp(App)

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
