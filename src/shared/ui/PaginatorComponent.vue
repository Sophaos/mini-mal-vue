<script setup lang="ts">
import Paginator, { type PageState } from 'primevue/paginator'
import type { Pagination } from '@/shared/data-access/models/pagination'
import { useRoute, useRouter } from 'vue-router'
import Skeleton from 'primevue/skeleton'
const { name } = defineProps<{
  pagination: Pagination | undefined
  rowsPerPageOptions?: number[] | undefined
  name: string
  loading: boolean
}>()

const route = useRoute()
const router = useRouter()

const handlePageChange = (event: PageState) => {
  router.push({
    name,
    query: { ...route.query, page: event.page + 1, limit: event.rows }
  })
}
</script>

<template>
  <div class="surface-card">
    <Paginator
      v-if="loading"
      locale="en-US"
      @page="handlePageChange($event)"
      :first="pagination?.first"
      :rows="pagination?.rows"
      :totalRecords="pagination?.total"
      :rowsPerPageOptions="[8, 16, 24]"
    ></Paginator>
    <div
      v-else
      class="card flex flex-row p-4 border-1 surface-border mt-1 justify-content-center gap-1"
    >
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
      <Skeleton shape="circle" size="2rem" styleClass="mr-2"></Skeleton>
    </div>
  </div>
</template>
