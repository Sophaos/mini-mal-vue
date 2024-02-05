<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAnimeList } from '../data-access/animeService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import type { AnimeQueryParams } from '@/shared/data-access/models/animeQueryParams'

const route = useRoute()
const router = useRouter()

const queryParams = computed(() => route.query)
const enabled = computed(() => Object.keys(route.query).length > 0)

onMounted(() => {
  const { page, limit } = queryParams.value
  if (!page || !limit) {
    router.push({
      name: 'animes',
      query: { page: 1, limit: 16, ...route.query }
    })
  }
})

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['animeList', queryParams],
  queryFn: () => getAnimeList({ ...queryParams.value } as AnimeQueryParams),
  enabled
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" name="animes" />
  </div>
</template>
