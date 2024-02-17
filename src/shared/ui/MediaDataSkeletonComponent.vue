<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
</script>

<template>
  <div class="flex flex-row flex-wrap border-1 surface-border py-2">
    <div
      v-for="anime of [0, 1, 2, 3, 4, 5, 6, 7]"
      :key="anime"
      class="flex flex-row flex-wrap col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 p-2"
    >
      <div class="p-4 flex flex-column h-full border-1 surface-border border-round w-full gap-1">
        <div class="flex align-items-center justify-content-center">
          <Skeleton width="10rem" styleClass="mb-2"></Skeleton>
        </div>
        <div class="flex align-items-center justify-content-center">
          <Skeleton width="10rem" styleClass="mb-2"></Skeleton>
        </div>
        <div class="my-1 flex flex-row flex-wrap justify-content-center gap-1">
          <Skeleton width="3rem" styleClass="m-1"></Skeleton>
          <Skeleton width="3rem" styleClass="m-1"></Skeleton>
          <Skeleton width="3rem" styleClass="m-1"></Skeleton>
          <Skeleton width="3rem" styleClass="m-1"></Skeleton>
        </div>
        <div class="flex flex-column xl:flex-row lg:flex-row md:flex-row align-items-center">
          <div class="col-6">
            <Skeleton width="100%" height="17rem" styleClass="m-1"></Skeleton>
          </div>
          <div class="col-6">
            <Skeleton width="100%" height="17rem" styleClass="m-1"></Skeleton>
          </div>
        </div>

        <div
          class="flex align-items-center justify-content-center gap-4 align-items-end h-full my-1"
        >
          <Skeleton width="5rem" styleClass="mx-1"></Skeleton>
          <Skeleton width="5rem" styleClass="mx-1"></Skeleton>
        </div>
      </div>
    </div>
  </div>
</template>
