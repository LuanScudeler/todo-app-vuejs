<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases.js'
import { ref } from 'vue'

interface TodoItem {
  title: string
  timestamp: string
}

const { phrases } = usePhrases()
const todoTitle = ref('')
const todoItems = ref<TodoItem[]>([])

const handleSubmit = () => {
  todoItems.value.push({
    title: todoTitle.value,
    timestamp: new Date().valueOf().toString()
  })
  todoTitle.value = ''
}
</script>

<template>
  <div class="home-container">
    <h1 class="green">{{ phrases.titleText }}</h1>

    <form @submit.prevent="handleSubmit">
      <input type="text" v-model.trim="todoTitle" />
      <button type="submit">ADD</button>
    </form>

    <ul>
      <li v-for="{ title, timestamp } in todoItems" :key="timestamp">
        {{ title }}
      </li>
    </ul>
  </div>
</template>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
