<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases.js'
import { ref } from 'vue'
import CreateForm from './CreateForm.vue'
import TodoViewMode from './TodoViewMode.vue'
import TodoEditMode from './TodoEditMode.vue'
import { GET_TODOS } from './apiOperations.const'
import { useQuery } from '@vue/apollo-composable'
import gql from 'graphql-tag'
import { computed } from 'vue'

interface TodoItem {
  title: string
  timestamp: string
}

const { result, loading, error } = useQuery(gql`
  query ${GET_TODOS} {
    todos {
      id
      title
    }
  }
`)
const todos = computed(() => result.value?.todos ?? [])

const { phrases } = usePhrases()
const todoTitle = ref('')
const editingTodoTitle = ref('')
const editingTodoIndex = ref<number>()
const todoItems = ref<TodoItem[]>([])

function handleCreateFormSubmit() {
  if (todoTitle.value) {
    todoItems.value.push({
      title: todoTitle.value,
      timestamp: new Date().valueOf().toString()
    })
  }
  todoTitle.value = ''
}

function handleEditFormSubmit() {
  console.log('handleEditFormSubmit', editingTodoTitle.value)
}

function handleDelete(index: number) {
  console.log('handleDelete', index)
}

function handleEditMode(index: number) {
  editingTodoIndex.value = index
}

function handleCancelEditMode() {
  editingTodoIndex.value = undefined
  editingTodoTitle.value = ''
}
</script>

<template>
  <div class="home-container">
    <h1 class="green">{{ phrases.titleText }}</h1>
    <CreateForm
      @handle-submit-form="handleCreateFormSubmit"
      v-model:todoTitle="todoTitle"
    />
    <div v-if="loading">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <ul v-else-if="todos.length">
      <li v-for="({ title, id }, index) in todos" :key="id">
        <TodoViewMode
          v-if="editingTodoIndex !== index"
          :title="title"
          :is-editing="editingTodoIndex || editingTodoIndex === 0"
          @handle-edit-mode="() => handleEditMode(index)"
          @handle-delete="() => handleDelete(index)"
        />
        <TodoEditMode
          v-if="editingTodoIndex === index"
          :title="title"
          v-model:editingTodoTitle="editingTodoTitle"
          @handle-cancel-edit-mode="handleCancelEditMode"
          @handle-submit-form="handleEditFormSubmit"
        />
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

.home-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
