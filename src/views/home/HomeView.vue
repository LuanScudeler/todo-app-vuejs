<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases.js'
import { ref } from 'vue'
import CreateForm from './CreateForm.vue'

interface TodoItem {
  title: string
  timestamp: string
}

const { phrases } = usePhrases()
const todoTitle = ref('')
const todoItems = ref<TodoItem[]>([
  { title: 'test', timestamp: new Date().valueOf().toString() },
  { title: 'test2', timestamp: new Date().valueOf().toString() }
])

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
    <CreateForm @handle-submit="handleSubmit" v-model:todoTitle="todoTitle" />
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

ul {
  width: 80%;
  border: 1px solid rgb(229 231 235);
}

li {
  background-color: rgb(255 255 255);
  border-bottom: 1px solid rgb(229 231 235);
  padding: 1rem;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
