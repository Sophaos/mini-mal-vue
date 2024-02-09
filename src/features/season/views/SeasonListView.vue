<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { getSeasonData, getSeasonMediaData } from '../data-access/seasonService'
import { keepPreviousData, useQuery } from '@tanstack/vue-query'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted } from 'vue'
import type { SeasonParams } from '@/shared/data-access/models/seasonParams'
import type { SeasonQueryParams } from '@/shared/data-access/models/seasonQueryParams'
import { getCurrentSeason } from '@/shared/utils/currentSeason'
import type { DropdownData } from '@/shared/data-access/models/dropdownData'
import { MEDIAS } from '../data-access/dropdownOptions'
import MediaDataFilterComponent from '@/shared/ui/MediaDataFilterComponent.vue'

const route = useRoute()
const router = useRouter()

const queryParams = computed(() => route.query)
const params = computed(() => route.params)
const enabled = computed(
  () => Object.keys(route.params).length > 0 && Object.keys(route.query).length > 0
)


const seasonOptions = computed(() => 
   seasonFilters.value?.yearsSeasonsData.seasonData.find((s) => s.year === Number(route.params.year))
    ?.seasonOptions ?? []
)

const filterDropdowns = computed(() => {
  const data: DropdownData[] = [
    {
      label: 'Year',
      param: 'year',
      route: 'param',
      value: (route.params.year)?.toString(),
      options: seasonFilters.value?.yearsSeasonsData.yearOptions,
    },
    {
      label: 'Season',
      param: 'season',
      route: 'param',
      value: (route.params.season)?.toString(),
      options: seasonOptions.value,
    },
    {
      label: 'Media',
      param: 'filter',
      route: 'query',
      value: (route.query.filter)?.toString(),
      options: MEDIAS,
    },
  ];
  return data;
})

onMounted(() => {
  const { year, season } = params.value
  const { page, limit } = queryParams.value
  const currentYear = new Date().getFullYear()
  const currentSeason = getCurrentSeason()
  if (!year || !season || !page || !limit) {
    router.push({
      name: 'season',
      params: { season: currentSeason, year: currentYear, ...route.params },
      query: { page: 1, limit: 16, ...route.query }
    })
  }
})

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['seasonMediaData', queryParams, params],
  queryFn: () =>
    getSeasonMediaData(
      { ...params.value } as unknown as SeasonParams,
      { ...queryParams.value } as SeasonQueryParams
    ),
  enabled,
  placeholderData: keepPreviousData
})

const { data: seasonFilters, isPending: isSeasonFiltersPending } = useQuery({
  queryKey: ['seasonFilters'],
  queryFn: () =>
    getSeasonData(),
  enabled,
  placeholderData: keepPreviousData
})
</script>

<template>
  <div class="col-12">
    <MediaDataFilterComponent :filterDropdowns="filterDropdowns" name="season"/>
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" name="season" />
  </div>
</template>
