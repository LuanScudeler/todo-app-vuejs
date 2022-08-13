<script setup lang="ts">
defineProps(['size', 'icon'])
</script>

<template>
  <component :is="icon" :width="size" :height="size"></component>
</template>
