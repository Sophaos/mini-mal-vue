<script setup lang="ts">
import type { HomeRecommendation } from '@/shared/data-access/models/homeRecommendation'

defineProps<{
  recommendations: HomeRecommendation[] | undefined
  isLoading: boolean
}>()
</script>

<template>
  <div v-if="!isLoading" class="max-h-30rem overflow-auto">
    <div class="mb-2" v-for="recommendation of recommendations" :key="recommendation.id">
      <div class="flex flex-column xl:flex-row xl:align-items-start p-1 gap-2">
        <img
          v-if="recommendation.likedMediaImage"
          class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
          :src="recommendation.likedMediaImage"
        />
        <img
          class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
          :src="recommendation.mightLikeMediaImage"
        />
        <div
          class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
        >
          <div class="flex flex-column align-items-center sm:align-items-start gap-3 col-12">
            <div class="flex justify-content-between flex-wrap w-full">
              <div class="min-w-full">
                <div
                  v-if="recommendation.likedMediaId && recommendation.likedMediaTitle"
                  class="flex flex-row justify-content-between flex-wrap"
                >
                  <div>If you liked:</div>
                  <router-link
                    :to="{ name: 'anime-detail', params: { id: recommendation.likedMediaId } }"
                    class="font-bold text-primary no-underline max-w-20rem white-space-nowrap overflow-hidden text-overflow-ellipsis"
                  >
                    {{ recommendation.likedMediaTitle }}
                  </router-link>
                </div>
                <div class="flex flex-row justify-content-between flex-wrap">
                  <div>You might like:</div>
                  <router-link
                    :to="{ name: 'anime-detail', params: { id: recommendation.mightLikeMediaId } }"
                    class="font-bold text-primary no-underline max-w-20rem white-space-nowrap overflow-hidden text-overflow-ellipsis"
                  >
                    {{ recommendation.mightLikeMediatitle }}
                  </router-link>
                </div>
              </div>
            </div>
            <p class="text-sm max-h-9rem w-auto overflow-auto">{{ recommendation.content }}</p>
            <div class="flex justify-content-between flex-wrap w-full">
              <div class="flex align-items-center justify-content-center gap-1">
                <div class="font-light text-color-secondary">
                  {{ recommendation.hoursDifference }} hours ago by
                </div>
                <div>{{ recommendation.user }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
