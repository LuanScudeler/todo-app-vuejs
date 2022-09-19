<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases.js'
import { ref } from 'vue'
import CreateForm from './CreateForm.vue'
import TodoViewMode from './TodoViewMode.vue'
import TodoEditMode from './TodoEditMode.vue'
import { computed } from 'vue'
import {
  createMutation,
  deleteMutation,
  editMutation,
  fetchTodos
} from './todos.api'

//TODO: Complete CRUD tests using cy.intercept()
const { result, loading, error } = fetchTodos()
const todos = computed(() => result.value?.todos ?? [])

const { mutate: createTodo, onError: onCreate } = createMutation()

const {
  mutate: editTodo,
  onError: onEditError,
  onDone: onEditDone
} = editMutation()

onEditDone(() => {
  handleCancelEditMode()
})

const { mutate: deleteTodo, onError: onDeleteError } = deleteMutation()

const { phrases } = usePhrases()
const todoTitle = ref('')
const editingTodoTitle = ref('')
const editingTodoIndex = ref<number>()

function handleCreateFormSubmit() {
  if (todoTitle.value) {
    createTodo({
      title: todoTitle.value
    })
  }
  todoTitle.value = ''
}

function handleEditFormSubmit(id: string) {
  if (editingTodoTitle.value) {
    editTodo({
      id,
      title: editingTodoTitle.value
    })
  } else {
    handleCancelEditMode()
  }
}

function handleDelete(id: string) {
  deleteTodo({
    id
  })
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
      <li
        v-for="({ title, id }, index) in todos"
        :key="id"
        :aria-labelledby="title"
      >
        <TodoViewMode
          v-if="editingTodoIndex !== index"
          :id="title"
          :title="title"
          :is-editing="editingTodoIndex || editingTodoIndex === 0"
          @handle-edit-mode="() => handleEditMode(index)"
          @handle-delete="() => handleDelete(id)"
        />
        <TodoEditMode
          v-if="editingTodoIndex === index"
          :title="title"
          v-model:editingTodoTitle="editingTodoTitle"
          @handle-cancel-edit-mode="handleCancelEditMode"
          @handle-submit-form="() => handleEditFormSubmit(id)"
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
