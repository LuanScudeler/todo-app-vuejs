import { ref } from 'vue'

interface User {
  email: string
  name: string
}

interface Store {
  user: User
}

const store = ref<Store>({
  user: {
    email: '',
    name: ''
  }
})

export function useStore() {
  function saveUser(user: User) {
    store.value.user = user
  }

  return {
    store,
    saveUser
  }
}
