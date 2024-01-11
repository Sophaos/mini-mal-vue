<script setup lang="ts">
import Paginator from 'primevue/paginator';
import type { Pagination } from '@/shared/data-access/models/pagination'
defineProps<{
  pagination: Pagination
  isCollapsed?: boolean
  rowsPerPageOptions?: number[] | undefined;
}>()

</script>

<template>
    <div class="surface-card p-1 border-1 surface-border">
  <Paginator
    locale="en-US"
    @page="$emit('pageChange')"
    :first="pagination.first"
    :rows="pagination.rows"
    :totalRecords="pagination.total"
    :rowsPerPageOptions="rowsPerPageOptions ?? [8, 16, 24]"
  ></Paginator>
</div>
</template>