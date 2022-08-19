<script setup lang="ts">
import IconEdit from '../../components/icons/IconEdit.vue'
import IconClose from '../../components/icons/IconClose.vue'
import AppIcon from '../../components/AppIcon.vue'
import { usePhrases } from '@/composables/usePhrases'

defineProps(['title', 'isEditing'])
defineEmits(['handleEditMode', 'handleDelete'])
const { phrases } = usePhrases()
</script>

<template>
  <span>{{ title }}</span>
  <button @click="$emit('handleEditMode')" :disabled="isEditing">
    <AppIcon :icon="IconEdit" :size="22" :title="phrases.editBtnName" />
  </button>
  <button @click="$emit('handleDelete')" :disabled="isEditing">
    <AppIcon :icon="IconClose" :size="24" :title="phrases.deleteBtnName" />
  </button>
</template>

<style scoped>
span {
  flex-grow: 1;
  margin-right: 0.5rem;
}

svg {
  margin-right: 0.5rem;
  margin-left: 0.5rem;
}
</style>
