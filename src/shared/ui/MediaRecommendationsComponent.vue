<script setup lang="ts">
import type { Recommendation } from '../data-access/models/recommendation'
import { scrollToTop } from '@/shared/utils/scrollBehaviour'

defineProps<{
  recommendations: Recommendation[]
  route: 'anime-detail' | 'manga-detail'
}>()
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="r of recommendations"
      :key="r.id"
      class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2 flex flex-row"
    >
      <img class="w-3 border-round-lg" :src="r.imageSrc" />
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-start flex-1 gap-4"
      >
        <div class="flex flex-column align-items-start gap-3 col-12">
          <div class="flex justify-content-between flex-wrap w-full">
            <div class="min-w-full text-sm">
              <div class="flex flex-row flex-nowrap justify-content-between flex-wrap mb-3">
                <router-link
                  :to="{ name: route, params: { id: r.id } }"
                  replace
                  class="font-semibold flex justify-content-center text-primary text-overflow-ellipsis no-underline"
                  @click="scrollToTop"
                >
                  {{ r.title }}
                </router-link>
                <div class="flex flex-row flex-end text-sm">
                  {{ r.votes }}
                  <i class="ml-2 pi pi pi-user"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
