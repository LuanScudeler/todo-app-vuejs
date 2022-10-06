import { getStoreKeyName } from '@apollo/client/utilities'
import { ref } from 'vue'

interface User {
  email: string
  name: string
}

interface Store {
  user?: User
}

export const APP_STORAGE_KEY = 'todo-app-store'

const store = ref<Store>({
  user: {
    email: '',
    name: ''
  }
})

function getStore(): Store {
  const storage = localStorage.getItem(APP_STORAGE_KEY)
  return storage ? JSON.parse(storage) : store
}

export function useStore() {
  function saveUser(user: User) {
    store.value.user = user
    localStorage.setItem(APP_STORAGE_KEY, JSON.stringify(store.value))
  }

  function clearUser() {
    store.value.user = undefined
    localStorage.removeItem(APP_STORAGE_KEY)
  }

  return {
    store: getStore(),
    saveUser,
    clearUser
  }
}
