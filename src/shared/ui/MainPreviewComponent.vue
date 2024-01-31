<script setup lang="ts">
import Carousel from 'primevue/carousel'
import Panel from 'primevue/panel'
import MainPreviewContentComponent from './MainPreviewContentComponent.vue'
import type { Media } from '../data-access/models/media'
import { getCurrentSeason } from '../utils/currentSeason'

defineProps<{
  header: string
  isLoading: boolean
  data: Media[] | undefined
}>()

const currentSeason = getCurrentSeason()
const currentYear = new Date().getFullYear()
</script>

<template>
  <div v-if="!isLoading" class="my-1">
    <Panel :toggleable="true">
      <template #header>
        <router-link
          :to="{ name: 'season', params: { year: currentYear, season: currentSeason } }"
          class="font-bold text-primary no-underline max-w-20rem white-space-nowrap overflow-hidden text-overflow-ellipsis"
        >
          Top Airing Animes
        </router-link>
      </template>
      <Carousel
        :value="data"
        :numVisible="1"
        :numScroll="1"
        :circular="false"
        :autoplayInterval="8000"
      >
        <template #item="anime">
          <MainPreviewContentComponent :media="anime.data" :isLoading="isLoading" />
        </template>
      </Carousel>
    </Panel>
  </div>
</template>
