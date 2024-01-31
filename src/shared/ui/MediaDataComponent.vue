<script setup lang="ts">
import type { Media } from '../data-access/models/media';
import MediaCardComponent from './MediaCardComponent.vue';

defineProps<{
    data: Media[]
    isLoading: boolean,
    type: string
}>()

</script>

<template>
    <div v-if="!isLoading">
      <div
        v-if="data.length > 0"
        class="flex flex-row flex-wrap border-1 surface-border py-2"
      >
        <div
          v-for="media of data"
          :key="media.id"
          class="flex flex-row flex-wrap col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 p-2"
        >
          <MediaCardComponent :media="media" class="w-12" :type="type" />
        </div>
      </div>
      <!-- <app-paginator
        [pagination]="pagination"
        (onPageChange)="handlePageChange($event)"
      /> -->
    </div>

    <!-- <ng-template #empty>
      <p class="m-5">There are no avaible items with these settings.</p>
    </ng-template>

    <ng-template #loading>
      <app-skeleton-data-view />
    </ng-template> -->

</template>