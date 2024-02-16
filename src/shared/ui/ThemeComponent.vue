<script setup lang="ts">
defineProps<{
  data: string[]
}>()
</script>

<template>
  <div class="h-5rem overflow-auto">
    <div v-for="d of data" :key="d">
      {{ d }}
    </div>
  </div>
</template>
