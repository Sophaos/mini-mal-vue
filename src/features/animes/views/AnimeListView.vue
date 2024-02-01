<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAnimeList } from '../data-access/animeService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['animeList'],
  queryFn: () => getAnimeList({})
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" />
  </div>
</template>
