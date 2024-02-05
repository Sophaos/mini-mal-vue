<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { useQuery } from '@tanstack/vue-query'
import { getMangaList } from '../data-access/mangaService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MangaQueryParams } from '@/shared/data-access/models/mangaQueryParams'

const route = useRoute()
const router = useRouter()

const queryParams = computed(() => route.query)
const enabled = computed(() => Object.keys(route.query).length > 0)

onMounted(() => {
  const { page, limit } = queryParams.value
  if (!page || !limit) {
    router.push({
      name: 'mangas',
      query: { page: 1, limit: 16, ...route.query }
    })
  }
})

const { data: mangas, isPending: isPending } = useQuery({
  queryKey: ['mangaList', queryParams],
  queryFn: () => getMangaList({ ...queryParams.value } as MangaQueryParams),
  enabled
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="mangas?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="mangas?.mediaData.pagination" name="mangas" />
  </div>
</template>
