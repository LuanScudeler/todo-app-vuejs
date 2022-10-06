<script setup lang="ts">
import { RouterLink, RouterView, useRoute, useRouter } from 'vue-router'
import UserInfo from '@/components/UserInfo.vue'
import { usePhrases } from './composables/usePhrases'
import { useStore } from './composables/useStore'
import { APP_ROUTES } from './router'
import { logoutMutation } from './views/login/login.api'

const route = useRoute()
const router = useRouter()
const { clearUser } = useStore()
const { phrases } = usePhrases()

const {
  mutate: logout,
  onDone: onLogoutDone,
  onError: logoutError
} = logoutMutation()

onLogoutDone(() => {
  clearUser()
  router.push('/')
})

function handleLogout() {
  logout()
}
</script>

<template>
  <header v-if="route.path !== APP_ROUTES.LOGIN.path">
    <div class="wrapper">
      <nav>
        <RouterLink to="/home">Home</RouterLink>
        <RouterLink to="/about">About</RouterLink>
      </nav>
    </div>
    <div class="login-header">
      <UserInfo />
      <button type="button" @click="handleLogout">
        {{ phrases.logoutBtnName }}
      </button>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.login-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 0.5rem;
}

nav {
  width: 100%;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    align-items: center;
  }

  header .wrapper {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
  }

  nav {
    text-align: left;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 0.5rem;
  }
}
</style>
