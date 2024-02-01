<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { getSeasonData, getSeasonMediaData } from '../data-access/seasonService'
import { useQuery } from '@tanstack/vue-query'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['seasonMediaData'],
  queryFn: () => getSeasonMediaData({ year: 2023, season: 'winter' })
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" />
  </div>
</template>
