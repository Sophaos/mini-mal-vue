<script setup lang="ts">
import type { Media } from '../data-access/models/media'
import ChipListComponent from './ChipListComponent.vue'

defineProps<{
  media: Media
  type: string
}>()
</script>

<template>
  <div class="p-4 flex flex-column h-full border-1 surface-border surface-card border-round">
    <div>
      <router-link
        :to="{ name: 'anime-detail', params: { id: media.id } }"
        replace
        class="font-semibold flex justify-content-center text-primary text-overflow-ellipsis no-underline"
      >
        {{ media.titleEnglish ?? media.title }}
      </router-link>
    </div>
    <div class="flex align-items-center justify-content-center">
      <div v-if="media.from" class="mx-3 text-color-secondary">
        {{ media.from }}
        <!-- | date : "yyyy-MM-dd"  -->
      </div>
      <div class="text-color-secondary" v-if="media.episodes">({{ media.episodes }} eps)</div>
    </div>
    <div class="my-1 flex flex-row flex-wrap justify-content-center">
      <ChipListComponent :data="media.genres" />
    </div>
    <div class="flex flex-column xl:flex-row lg:flex-row md:flex-row align-items-center">
      <img class="w-6 border-round" :src="media.imageSrc" />
      <div class="px-3 text-sm max-h-15rem w-auto overflow-auto">
        {{ media.synopsis }}
      </div>
    </div>

    <div class="flex align-items-center justify-content-center gap-4 align-items-end h-full my-1">
      <div>
        {{ media.score }}
        <i class="pi pi-star-fill text-yellow-300"></i>
      </div>
      <div>
        {{ media.members }}
        <i class="pi pi-users"></i>
      </div>
    </div>
  </div>
</template>
