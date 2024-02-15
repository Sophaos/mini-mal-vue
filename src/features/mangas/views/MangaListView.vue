<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import { getMangaGenres, getMangaList } from '../data-access/mangaService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { MangaQueryParams } from '@/shared/data-access/models/mangaQueryParams'
import type { DropdownData } from '@/shared/data-access/models/dropdownData'
import { MEDIAS, ORDERS, SORTS, STATUSES } from '../data-access/dropdownOptions'
import MediaDataFilterComponent from '@/shared/ui/MediaDataFilterComponent.vue'

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
  enabled,
  placeholderData: keepPreviousData
})

// const { data: genres, isPending: areGenresPending } = useQuery({
//   queryKey: ['animeGenres'],
//   queryFn: () => getMangaGenres(),
//   enabled,
//   placeholderData: keepPreviousData
// })

const mangaDropdowns = computed(() => {
  const data: DropdownData[] = [
    {
      label: 'Media',
      param: 'type',
      options: MEDIAS,
      route: 'query',
      value: route.query.type?.toString()
    },
    // {
    //   label: 'Genre(s)',
    //   param: 'genres',
    //   options: genres.value,
    //   multi: true,
    //   route: 'query',
    // value: route.query.genres?.toString(),
    // },
    {
      label: 'Status',
      param: 'status',
      options: STATUSES,
      route: 'query',
      value: route.query.status?.toString()
    },
    {
      label: 'Order By',
      param: 'order_by',
      options: ORDERS,
      route: 'query',
      value: route.query.order_by?.toString()
    },
    {
      label: 'Sort',
      param: 'sort',
      options: SORTS,
      route: 'query',
      value: route.query.sort?.toString()
    }
  ]
  return data
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataFilterComponent :filterDropdowns="mangaDropdowns" name="animes" />
    <MediaDataComponent :isLoading="isPending" :data="mangas?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="mangas?.mediaData.pagination" name="mangas" />
  </div>
</template>
