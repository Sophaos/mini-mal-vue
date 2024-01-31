<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue';
import { getSeasonData, getSeasonMediaData } from '../data-access/seasonService';
import { useQuery } from '@tanstack/vue-query';

// const { data: animes, isPending: isPending } = useQuery({
//   queryKey: ['topAiringAnimes'],
//   queryFn: getSeasonData,
// })
// const season = 'winter',
// const year = 2024
const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['seasonMediaData'],
  queryFn: getSeasonMediaData,
})

defineProps<{
}>()

</script>

<template>
    <div></div>
    <!-- <app-data-view-filter
      *ngIf="filters$ | async as vm"
      [filterDropdowns]="vm.filters"
      [isLoading]="vm.isLoading"
    /> -->
    <MediaDataComponent
      :isLoading="isPending"
      :data="animes?.mediaData.data ?? []"
      type="anime"

      />
      <!-- [pagination]="vm.pagination" -->
      <!-- (onPageChange)="handlePageChange($event)" -->
</template>
