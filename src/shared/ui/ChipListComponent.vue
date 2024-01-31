<script setup lang="ts">
import Chip from 'primevue/chip'
defineProps<{
  data: string[]
}>()
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div class="m-1" v-for="d of data" :key="d">
      <Chip :label="d" />
    </div>
  </div>
</template>
