<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases.js'
import { ref } from 'vue'
import CreateForm from './CreateForm.vue'
import IconEdit from '../../components/icons/IconEdit.vue'
import IconClose from '../../components/icons/IconClose.vue'
import AppIcon from '../../components/AppIcon.vue'

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
  if (todoTitle.value) {
    todoItems.value.push({
      title: todoTitle.value,
      timestamp: new Date().valueOf().toString()
    })
  }
  todoTitle.value = ''
}
</script>

<template>
  <div class="home-container">
    <h1 class="green">{{ phrases.titleText }}</h1>
    <CreateForm @handle-submit="handleSubmit" v-model:todoTitle="todoTitle" />
    <ul v-if="todoItems.length">
      <li v-for="{ title, timestamp } in todoItems" :key="timestamp">
        <span>{{ title }}</span>
        <AppIcon :icon="IconEdit" :size="22" />
        <AppIcon :icon="IconClose" :size="24" />
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
  display: flex;
  background-color: rgb(255 255 255);
  border-bottom: 1px solid rgb(229 231 235);
  padding: 1rem;
}

li span {
  flex-grow: 1;
  margin-right: 0.25rem;
}

svg {
  margin-right: 0.25rem;
  margin-left: 0.25rem;
}

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
