<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getAnimeGenres, getAnimeList } from '../data-access/animeService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import type { AnimeQueryParams } from '@/shared/data-access/models/animeQueryParams'
import MediaDataFilterComponent from '@/shared/ui/MediaDataFilterComponent.vue'
import type { DropdownData } from '@/shared/data-access/models/dropdownData'
import { RATINGS, STATUSES, ORDERS, MEDIAS, SORTS } from '../data-access/dropdownOptions'
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
  enabled,
  placeholderData: keepPreviousData
})

// const { data: genres, isPending: areGenresPending } = useQuery({
//   queryKey: ['animeGenres'],
//   queryFn: () => getAnimeGenres(),
//   enabled,
//   placeholderData: keepPreviousData
// })

const selectAnimeDropdownData = computed(() => {
  const data: DropdownData[] = [
    {
      label: 'Media',
      param: 'type',
      options: MEDIAS,
      value: route.query.type?.toString(),
      route: 'query'
    },
    // {
    //   label: 'Genre(s)',
    //   param: 'genres',
    //   options: genres.value,
    //   multi: true,
    //   route: 'query'
    // },
    {
      label: 'Status',
      param: 'status',
      options: STATUSES,
      value: route.query.status?.toString(),
      route: 'query'
    },
    {
      label: 'Rating',
      param: 'rating',
      options: RATINGS,
      value: route.query.rating?.toString(),
      route: 'query'
    },
    {
      label: 'Order By',
      param: 'order_by',
      options: ORDERS,
      value: route.query.order_by?.toString(),

      route: 'query'
    },
    {
      label: 'Sort',
      param: 'sort',
      options: SORTS,
      value: route.query.sort?.toString(),

      route: 'query'
    }
  ]
  return data
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataFilterComponent :filterDropdowns="selectAnimeDropdownData" name="animes" />
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" name="animes" />
  </div>
</template>
