<script setup lang="ts">
import Paginator, { type PageState } from 'primevue/paginator'
import type { Pagination } from '@/shared/data-access/models/pagination'
import { useRoute, useRouter } from 'vue-router'
const { name } = defineProps<{
  pagination: Pagination | undefined
  rowsPerPageOptions?: number[] | undefined
  name: string
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
      locale="en-US"
      @page="handlePageChange($event)"
      :first="pagination?.first"
      :rows="pagination?.rows"
      :totalRecords="pagination?.total"
      :rowsPerPageOptions="[8, 16, 24]"
    ></Paginator>
  </div>
</template>
