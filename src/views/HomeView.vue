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
      <label htmlFor="todo-title">
        {{ phrases.todoTitleLabel }}
      </label>
      <div class="flex">
        <input
          type="text"
          id="todo-title"
          name="todo_title"
          placeholder="type a new todo"
          required
          v-model.trim="todoTitle"
        />
        <button type="submit">{{ phrases.addBtnName }}</button>
      </div>
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

label {
  display: block;
}

input {
  height: 3rem;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 16px;
  margin-right: 0.25rem;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex {
  display: flex;
}
</style>
