<script setup lang="ts">
import Avatar from 'primevue/avatar'
import type { DetailedReview } from '../data-access/models/detailedReview'
import Accordion from 'primevue/accordion'
import AccordionTab from 'primevue/accordiontab'

defineProps<{
  review: DetailedReview
}>()
</script>

<template>
  <div class="flex flex-column xl:flex-row xl:align-items-start">
    <Accordion class="w-full">
      <AccordionTab>
        <template #header>
          <div class="flex justify-content-between gap-2 w-full">
            <div class="flex flex-row gap-2">
              <div class="flex align-items-center gap-2">
                <Avatar :image="review.imageSrc" shape="circle" />
                <span class="font-bold white-space-nowrap">{{ review.user }}</span>
              </div>
              <div class="flex align-items-center justify-content-center gap-1">
                <div class="font-light text-color-secondary">
                  {{ review.date }}
                </div>
              </div>
            </div>

            <div class="flex gap-3 justify-content-center align-items-center">
              <div class="flex align-items-center justify-content-center">
                <div v-for="tag of review.tags" :key="tag">
                  <span v-if="tag === 'Recommended'" class="text-green-500">{{ tag }}</span>
                  <span v-if="tag === 'Mixed Feelings'" class="text-yellow-500">{{ tag }}</span>
                  <span v-if="tag === 'Not Recommended'" class="text-red-600">{{ tag }}</span>
                </div>
              </div>
              <div class="text-lg font-semibold">
                {{ review.score }}
                <i class="pi pi-star-fill text-yellow-300"></i>
              </div>
            </div>
          </div>
        </template>
        <pre class="m-0 text-sm">
        {{ review.content }}
      </pre
        >
      </AccordionTab>
    </Accordion>
  </div>
</template>

<style>
pre {
  white-space: pre-wrap;
  font-family: 'Lato', sans-serif;
}
</style>
