<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
defineProps<{
  title?: string
  isCollapsed?: boolean
}>()
</script>

<template>
  <div class="card border-1 surface-border border-round flex justify-content-between p-3">
    <Skeleton width="10rem" styleClass="mb-2"></Skeleton>
    <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
  </div>
</template>
