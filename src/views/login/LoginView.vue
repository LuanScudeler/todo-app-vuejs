<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases'
import { useStore } from '@/composables/useStore'
import { APP_ROUTES } from '@/router'
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { loginMutation } from './login.api'

const router = useRouter()
const { phrases } = usePhrases()
const { saveUser } = useStore()
const email = ref('')
const password = ref('')
const error = ref('')

const {
  mutate: login,
  onError: loginError,
  onDone: loginDone
} = loginMutation()

function handleLoginSubmit() {
  login({
    email: email.value,
    password: password.value
  })
}

loginDone((result) => {
  saveUser(result.data.login.user)
  router.push(APP_ROUTES.HOME.path)
})

loginError((apolloError) => (error.value = apolloError.message))
</script>

<template>
  <div class="login">
    <form @submit.prevent="handleLoginSubmit">
      <div v-if="error" class="error">Error: {{ error }}</div>
      <label htmlFor="login-email">
        {{ phrases.loginEmailLabel }}
      </label>
      <div class="flex">
        <input
          v-model="email"
          type="text"
          id="login-email"
          name="login_username"
          placeholder="type a email"
          required
        />
      </div>
      <label htmlFor="login-password">
        {{ phrases.loginPasswordLabel }}
      </label>
      <div class="flex">
        <input
          v-model="password"
          type="password"
          id="login-password"
          name="login_password"
          placeholder="type a password"
          required
        />
      </div>
      <button type="submit">{{ phrases.loginBtnName }}</button>
    </form>
  </div>
</template>

<style scoped>
input {
  height: 3rem;
  border: 1px solid rgb(229 231 235);
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 16px;
  margin-right: 0.25rem;
}

form {
  display: flex;
  flex-direction: column;
}

button {
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  border-radius: 4px;
  color: var(--color-text);
  font-weight: 600;
  min-width: 50px;
  margin-top: 0.5rem;
  padding: 0.5rem 0;
}

.login {
  display: flex;
  justify-content: center;
  margin-top: 2rem;
}

@media (min-width: 1024px) {
  .login {
    display: flex;
    justify-content: center;
    margin-top: 5rem;
  }
}

.error {
  color: red;
}
</style>
