<script setup lang="ts">
import type { Media } from '../data-access/models/media'
import MediaCardComponent from './MediaCardComponent.vue'
import MediaDataSkeletonComponent from './MediaDataSkeletonComponent.vue'

defineProps<{
  data: Media[]
  isLoading: boolean
  route: 'anime-detail' | 'manga-detail'
}>()
</script>

<template>
  <div>
    <div
      v-if="!isLoading && data.length > 0"
      class="flex flex-row flex-wrap border-1 surface-border py-2"
    >
      <div
        v-for="media of data"
        :key="media.id"
        class="flex flex-row flex-wrap col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 p-2"
      >
        <MediaCardComponent :media="media" class="w-12" :route="route" />
      </div>
    </div>
    <div v-else>
      <MediaDataSkeletonComponent />
    </div>
  </div>
</template>
