<script setup lang="ts">
defineProps<{
  label: string
  value?: string | number
}>()
</script>

<template>
  <div class="flex flex-row justify-content-between">
    <div>{{ label }}:</div>
    <div class="font-semibold">
      <span v-if="value">{{ value }}</span>
      <slot></slot>
    </div>
  </div>
</template>
