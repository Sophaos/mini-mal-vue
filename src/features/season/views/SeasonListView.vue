<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { getSeasonData, getSeasonMediaData } from '../data-access/seasonService'
import { useQuery } from '@tanstack/vue-query'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { useRoute, useRouter } from 'vue-router'
import type { PageState } from 'primevue/paginator'
import { onMounted, ref, watch } from 'vue'
import type { SeasonParams } from '@/shared/data-access/models/seasonParams'
import type { SeasonQueryParams } from '@/shared/data-access/models/seasonQueryParams'

defineProps<{}>()
const route = useRoute()
const router = useRouter()

const queryParams = ref({});
const params = ref({});

const { year, season } = route.params;
const { page, limit } = route.query;

queryParams.value = { ...route.query }
params.value = { ...route.params }

onMounted(() => {
    if (!year || !season || !page || !limit) {
    const defaultYear = '2024'
    const defaultSeason = 'winter'
      console.log('mount')

    router.push({
      name: 'season',
      params: { ...route.params, season: defaultSeason, year: defaultYear },
      query: { ...route.query, page: 1, limit: 16 }
    })
  }

});

watch(
  [() => route.params, () => route.query],
  ([paramValue, queryParamValue], [oldParamValue, oldQueryParamValue]) => {
    console.log('caca', paramValue, queryParamValue)
    queryParams.value = queryParamValue;
    params.value = paramValue;
  }
)

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['seasonMediaData', queryParams, params],
  queryFn: () =>
    getSeasonMediaData(
      { ...params.value } as SeasonParams,
      { ...queryParams.value } as SeasonQueryParams
    )
})

const handlePageChange = (event: PageState) => {
  router.push({
    name: 'season', // Replace with the name of your route
    query: { ...route.query, page: event.page + 1, limit: event.rows }
  })
}
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent
      :pagination="animes?.mediaData.pagination"
      @page-change="handlePageChange"
    />
  </div>
</template>
