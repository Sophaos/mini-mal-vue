<script setup lang="ts">
import type { Review } from '@/shared/data-access/models/review'

defineProps<{
  reviews: Review[] | undefined
  isLoading: boolean
}>()
</script>

<template>
  <div v-if="!isLoading" class="max-h-30rem overflow-auto">
    <div class="mb-2" v-for="review of reviews" :key="review.id">
      <div>
        <div class="flex flex-column xl:flex-row xl:align-items-start p-1 gap-2">
          <img
            v-if="review.imageSrc"
            class="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round"
            :src="review.imageSrc"
          />
          <div
            class="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4"
          >
            <div class="flex flex-column align-items-center sm:align-items-start gap-3">
              <div class="flex justify-content-between flex-wrap w-full">
                <router-link
                  :to="{ name: 'anime-detail', params: { id: review.id } }"
                  class="font-bold text-primary no-underline max-w-20rem white-space-nowrap overflow-hidden text-overflow-ellipsis"
                >
                  {{ review.title }}
                </router-link>
                <div class="flex align-items-center justify-content-center">
                  <div v-for="tag of review.tags" :key="tag">
                    <span v-if="tag === 'Recommended'" class="text-green-500">{{ tag }}</span>
                    <span v-if="tag === 'Mixed Feelings'" class="text-yellow-500">{{ tag }}</span>
                    <span v-if="tag === 'Not Recommended'" class="text-red-600">{{ tag }}</span>
                  </div>
                </div>
              </div>
              <p class="text-sm max-h-7rem w-auto overflow-auto">{{ review.content }}</p>

              <div class="flex flex-wrap w-full">
                <div class="flex align-items-center justify-content-center gap-1">
                  <div class="font-light text-color-secondary">
                    {{ review.hoursDifference }} hours ago by
                  </div>
                  <div>{{ review.user }}</div>
                </div>
              </div>
            </div>
            <div class="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
              <div
                class="flex text-lg font-semibold gap-1 justify-content-center align-items-center"
              >
                {{ review.score }}
                <i class="pi pi-star-fill text-yellow-300"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
