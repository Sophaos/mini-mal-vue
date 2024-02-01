<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { useQuery } from '@tanstack/vue-query'
import { getMangaList } from '../data-access/mangaService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['mangaList'],
  queryFn: () => getMangaList({})
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" />
  </div>
</template>
