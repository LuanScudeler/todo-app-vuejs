<script setup lang="ts">
import IconSave from '@/components/icons/IconSave.vue'
import IconReturn from '@/components/icons/IconReturn.vue'
import AppIcon from '../../components/AppIcon.vue'
import { usePhrases } from '@/composables/usePhrases'

defineProps(['title', 'editingTodoTitle'])
const emit = defineEmits([
  'handleSubmitForm, handleCancelEditMode',
  'update:editingTodoTitle'
])
const { phrases } = usePhrases()

function emitEditingTodoTitle(e: Event) {
  const value = (e.target as HTMLInputElement).value.trim()

  emit('update:editingTodoTitle', value)
}
</script>

<template>
  <form class="edit-form" @submit.prevent="$emit('handleSubmitForm')">
    <input
      v-focus
      class="edit-input"
      :value="editingTodoTitle || title"
      @input="emitEditingTodoTitle"
      type="text"
      id="edit-todo-title"
      name="edit_todo_title"
      placeholder="type a new todo"
      required
    />
  </form>
  <button @click="$emit('handleSubmitForm')">
    <AppIcon :icon="IconSave" :size="22" :title="phrases.saveBtnName" />
  </button>
  <button @click="$emit('handleCancelEditMode')">
    <AppIcon :icon="IconReturn" :size="24" :title="phrases.returnBtnName" />
  </button>
</template>

<style scoped>
.edit-form {
  flex-grow: 1;
}

.edit-input {
  border: none;
  font-size: 100%;
  line-height: inherit;
  outline: 2px solid transparent;
  outline-offset: 2px;
  width: 100%;
}

span {
  flex-grow: 1;
  margin-right: 0.5rem;
}

svg {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
</style>
