<script setup lang="ts">
import { usePhrases } from '@/composables/usePhrases'

defineProps(['todoTitle'])
const emit = defineEmits(['handle-submit-form', 'update:todoTitle'])

function emitTodoTitle(e: Event) {
  const value = (e.target as HTMLInputElement).value.trim()

  emit('update:todoTitle', value)
}
const { phrases } = usePhrases()
</script>

<template>
  <form @submit.prevent="$emit('handle-submit-form')">
    <label htmlFor="todo-title">
      {{ phrases.todoTitleLabel }}
    </label>
    <div class="flex">
      <input
        :value="todoTitle"
        @input="emitTodoTitle"
        type="text"
        id="todo-title"
        name="todo_title"
        placeholder="type a new todo"
        required
      />
      <button type="submit">{{ phrases.addBtnName }}</button>
    </div>
  </form>
</template>

<style scoped>
form {
  margin-bottom: 1rem;
  width: 80%;
}

label {
  display: block;
  font-weight: 600;
}

input {
  height: 3rem;
  border: 1px solid rgb(229 231 235);
  flex-grow: 1;
  padding-left: 1rem;
  padding-right: 1rem;
  font-size: 16px;
  margin-right: 0.25rem;
}

button {
  background-color: hsla(160, 100%, 37%, 1);
  border: none;
  border-radius: 4px;
  color: var(--color-text);
  font-weight: 600;
  min-width: 50px;
}

.flex {
  display: flex;
}
</style>
