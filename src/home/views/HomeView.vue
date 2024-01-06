<script setup lang="ts">
import PanelComponent from '@/shared/ui/PanelComponent.vue'
</script>

<template>
  <PanelComponent class="my-1" title="Top Airing Animes" :isCollapsed="false" />
  <div class="flex flex-column xl:flex-row lg:flex-row gap-1 my-1 w-full">
    <PanelComponent class="flex-1" title="Latest Reviews" :isCollapsed="false" />
    <PanelComponent class="flex-1" title="Latest Recommendations" :isCollapsed="false" />
  </div>
</template>
