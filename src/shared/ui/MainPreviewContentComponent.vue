<script setup lang="ts">
import type { Media } from '../data-access/models/media'
import type { ImageData } from '../data-access/models/imageData'
import ChipListComponent from './ChipListComponent.vue'
import Galleria from 'primevue/galleria'

defineProps<{
  media: Media
  isLoading: boolean
  type: 'animes' | 'mangas'
  pictures?: ImageData[] | undefined
}>()
</script>

<template>
  <div
    v-if="!isLoading"
    class="flex flex-column-reverse xl:flex-row lg:flex-row justify-content-center align-items-center"
  >
    <div class="w-12 xl:w-7 px-4">
      <router-link
        :to="{ name: 'anime-detail', params: { id: media.id } }"
        class="text-3xl font-bold text-primary no-underline"
      >
        {{ media.title }}
      </router-link>
      <div class="text-lg font-light text-color-secondary">
        {{ media.titleEnglish }}
      </div>
      <div class="my-1 flex flex-row flex-wrap">
        <ChipListComponent :data="media.genres" />
        <ChipListComponent v-if="media.themes" :data="media.themes" />
        <ChipListComponent v-if="media.demographics" :data="media.demographics" />
      </div>
      <p class="font-italic">{{ media.synopsis }}</p>
      <slot></slot>
    </div>
    <div class="w-12 xl:w-5 flex justify-content-center px-4">
      <Galleria v-if="pictures" :value="pictures" :numVisible:="5" containerClass="max-w-25rem">
        <template #item="slotProps">
          <img :src="slotProps.item.imageLarge" style="width: 100%" />
        </template>
        <template #thumbnail="slotProps">
          <div class="grid grid-nogutter justify-content-center">
            <img :src="slotProps.item.imageSmall" />
          </div>
        </template>
      </Galleria>
      <img
        v-else
        class="w-12 md:w-7 lg:w-7 xl:w7 border-round"
        :src="media.imageLargeSrc"
        alt="Anime Image"
      />
    </div>
  </div>
</template>
