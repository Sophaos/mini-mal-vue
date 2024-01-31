<script setup lang="ts">
import type { Media } from '../data-access/models/media'
import ChipListComponent from './ChipListComponent.vue'

defineProps<{
  media: Media
  isLoading: boolean
  // pictures: any
  // pictures?: any | undefined
}>()
</script>

<template>
  <div
    v-if="!isLoading"
    class="flex flex-column-reverse xl:flex-row lg:flex-row justify-content-center align-items-center"
  >
    <div class="w-12 xl:w-7 px-4">
      <a class="text-3xl font-bold text-primary no-underline">
        {{ media.title }}
      </a>
      <div class="text-lg font-light text-color-secondary">
        {{ media.titleEnglish }}
      </div>
      <div class="my-1 flex flex-row flex-wrap">
        <ChipListComponent :data="media.genres" />
        <!-- <ng-container v-if="isDetailed">
        <app-chip-list v-if="media.themes" [data]="media.themes" />
        <app-chip-list v-if="media.demographics" [data]="media.demographics" />
      </ng-container> -->
      </div>
      <p class="font-italic">{{ media.synopsis }}</p>
      <!-- <app-detailed-media v-if="isDetailed" [media]="media" [type]="type" /> -->
    </div>
    <div class="w-12 xl:w-5 flex justify-content-center px-4">
      <img
        class="w-12 md:w-7 lg:w-7 xl:w7 border-round"
        :src="media.imageLargeSrc"
        alt="Anime Image"
      />
      <!-- v-if="pictures.length === 0" -->
      <!-- <p-galleria
      v-if="pictures.length > 0"
      :value="pictures"
      :numVisible:="5"
      class="max-w-25rem"
    >
      <ng-template pTemplate="item" let-item>
        <img :src="item.imageLarge" style="width: 100%" />
      </ng-template>
      <ng-template pTemplate="thumbnail" let-item>
        <div class="grid grid-nogutter justify-content-center">
          <img :src="item.imageSmall" />
        </div>
      </ng-template>
    </p-galleria> -->
    </div>
  </div>
</template>
