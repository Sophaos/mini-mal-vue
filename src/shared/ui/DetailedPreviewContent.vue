<script setup lang="ts">
import Divider from 'primevue/divider'
import type { Media } from '../data-access/models/media'
import LabelInfoComponent from './LabelInfoComponent.vue'
import LabelListComponent from './LabelListComponent.vue'
defineProps<{
  media: Media
  type: 'animes' | 'mangas'
}>()
</script>

<template>
  <div class="flex flex-column xl:flex-row lg:flex-row md:flex-row flex-wrap mt-3 mb-3 text-sm">
    <div class="flex-1">
      <Divider align="center">Statistics</Divider>
      <LabelInfoComponent label="Score" :value="media.score">
        <i class="pi pi-star-fill text-yellow-300 ml-1"></i>
      </LabelInfoComponent>
      <LabelInfoComponent label="Rank" :value="media.rank" />
      <LabelInfoComponent label="Popularity" :value="media.popularity" />
      <LabelInfoComponent label="Members" :value="media.members" />
      <LabelInfoComponent label="Favorites" :value="media.favorites" />
    </div>
    <Divider layout="vertical" class="hidden xl:block lg:block md:block"></Divider>
    <div v-if="type === 'animes'" class="flex-1">
      <Divider align="center">Airing Time</Divider>
      <LabelInfoComponent label="Season">
        <router-link
          v-if="media.year && media.season"
          class="no-underline text-primary font-semibold"
          :to="{ name: 'season', params: { year: media.year, season: media.season } }"
        >
          {{ media.season }} {{ media.year }}
        </router-link>
      </LabelInfoComponent>
      <LabelInfoComponent label="Aired" :value="media.from" />
      <LabelInfoComponent label="Duration" :value="media.duration" />
      <LabelInfoComponent label="Episodes" :value="media.episodes" />
    </div>
    <Divider layout="vertical" class="hidden xl:block lg:block md:block"></Divider>
    <div class="flex-1">
      <Divider align="center">Informations</Divider>
      <LabelInfoComponent label="Media" :value="media.type" />
      <LabelInfoComponent label="Status" :value="media.status" />
      <LabelInfoComponent label="Source" :value="media.source ?? 'N/A'" />
      <LabelInfoComponent label="Rating" :value="media.rating ?? 'N/A'" />
    </div>
  </div>
  <Divider></Divider>
  <div class="flex flex-column my-2 text-sm">
    <LabelListComponent v-if="media.studios" label="Studios" :data="media.studios" />
    <LabelListComponent v-if="media.producers" label="Producers" :data="media.producers" />
    <LabelListComponent v-if="media.streaming" label="Streaming" :data="media.streaming" />
    <LabelListComponent
      v-if="media.licensors && media.licensors.length > 0"
      label="Licensors"
      :data="media.licensors"
    />
  </div>
</template>
