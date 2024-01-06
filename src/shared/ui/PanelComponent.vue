<script setup lang="ts">
import Panel from 'primevue/panel'

defineProps<{
  title?: string
  isCollapsed?: boolean
}>()
</script>
<template>
  <Panel :toggleable="true" :header="title" :collapsed="isCollapsed">
    <slot></slot>
  </Panel>
</template>
