<script setup lang="ts">
defineProps<{
  label: string
  data: string[]
}>()
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div class="w-7rem">{{ label }}:</div>
    <div>
      <span class="font-semibold" v-for="(d, i) in data" :key="i">
        <span v-if="i > 0">, </span><span>{{ d }}</span>
      </span>
    </div>
  </div>
</template>
