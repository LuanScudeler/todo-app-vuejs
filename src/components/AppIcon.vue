<script setup lang="ts">
defineProps(['size', 'icon', 'title'])
</script>

<template>
  <component :is="icon" :width="size" :height="size">
    <title>{{ title }}</title>
  </component>
</template>
