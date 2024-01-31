<script setup lang="ts">
import Carousel from 'primevue/carousel';
import Panel from 'primevue/panel';
import MainPreviewContentComponent from './MainPreviewContentComponent.vue';
import type { Media } from '../data-access/models/media';

defineProps<{
  header: string
  isLoading: boolean
  data: Media[] | undefined
}>()

</script>

<template>
<div v-if="!isLoading" class="my-1">
    <Panel :toggleable="true">
      <Carousel
        :value="data"
        :numVisible="1"
        :numScroll="1"
        :circular="false"
        :autoplayInterval="8000"
      >
        <template #item="anime">
          <MainPreviewContentComponent :media="anime.data" :isLoading="isLoading"/>
        </template>
      </Carousel>
    </Panel>
  </div>
</template>
