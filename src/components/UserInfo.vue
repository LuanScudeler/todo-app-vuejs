<script setup lang="ts">
import { useStore } from '@/composables/useStore'

const { store } = useStore()
</script>

<template>
  <div class="user-info">
    <span v-if="store.user?.name">User: {{ store.user?.name }}</span>
  </div>
</template>

<style scoped>
.user-info {
  white-space: nowrap;
  text-align: center;
  margin-right: 1rem;
}

@media (min-width: 1024px) {
  .user-info {
    text-align: start;
  }
}
</style>
