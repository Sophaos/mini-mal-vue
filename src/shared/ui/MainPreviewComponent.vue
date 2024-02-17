<script setup lang="ts">
import Carousel from 'primevue/carousel'
import Panel from 'primevue/panel'
import MainPreviewContentComponent from './MainPreviewContentComponent.vue'
import type { Media } from '../data-access/models/media'
import { getCurrentSeason } from '../utils/currentSeason'
import { scrollToTop } from '@/shared/utils/scrollBehaviour'
import Skeleton from 'primevue/skeleton'

defineProps<{
  header: string
  isLoading: boolean
  type: 'animes' | 'mangas'
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
          @click="scrollToTop"
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
          <MainPreviewContentComponent :media="anime.data" :isLoading="isLoading" :type="type" />
        </template>
      </Carousel>
    </Panel>
  </div>

  <div v-else>
    <div class="card">
      <div class="flex flex-column border-round border-1 surface-border p-4">
        <div class="flex justify-content-between mb-3">
          <Skeleton width="10rem" styleClass="mb-2"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
        </div>
        <div
          class="flex flex-column-reverse xl:flex-row lg:flex-row pl-5 gap-3 align-items-start md:align-items-center lg:align-items-center xl:align-items-center"
        >
          <div class="flex flex-column flex-1 w-full">
            <div class="flex flex-column gap-1">
              <Skeleton width="10rem" styleClass="mb-2" height="2rem"></Skeleton>
              <Skeleton width="11rem" styleClass="mb-2" height="1rem"></Skeleton>
              <div class="flex flex-row gap-1 mb-1">
                <Skeleton width="3rem" styleClass="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="2rem" styleClass="mb-2" borderRadius="16px"></Skeleton>
                <Skeleton width="2rem" styleClass="mb-2" borderRadius="16px"></Skeleton>
              </div>
            </div>
            <Skeleton width="100%" height="10rem"></Skeleton>
          </div>
          <div class="flex flex-1 align-items-center justify-content-center">
            <Skeleton width="25rem" height="30rem"></Skeleton>
          </div>
        </div>
        <div class="flex flex-row justify-content-center gap-1 mt-5">
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
          <Skeleton width="3rem" styleClass="mb-1"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
