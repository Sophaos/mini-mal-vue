<script setup lang="ts">
import type { BasicDisplayData } from '../data-access/models/basicDisplayData'

defineProps<{
  relations: BasicDisplayData[]
}>()
</script>

<template>
  <div v-for="r of relations" :key="r.title">
    <div class="flex flex-row">
      <div class="w-1">{{ r.title }}:</div>
      <div class="w-11">
        <div v-for="n of r.informations" :key="n">
          {{ n }}
        </div>
      </div>
    </div>
  </div>
</template>
