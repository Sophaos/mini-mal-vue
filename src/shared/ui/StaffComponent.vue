<script setup lang="ts">
import type { BasicDisplayData } from '../data-access/models/basicDisplayData'
defineProps<{
  staff: BasicDisplayData[]
}>()
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="s of staff"
      :key="s.title"
      class="col-12 sm:col-6 md:col-4 lg:col-3 xl:col-2 flex flex-row"
    >
      <img class="w-4 border-round-lg" :src="s.imageSrc" />
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-start flex-1 gap-4"
      >
        <div class="flex flex-column align-items-start gap-3 col-12">
          <div class="flex justify-content-between flex-wrap w-full">
            <div class="min-w-full text-sm">
              <div class="flex flex-row justify-content-between flex-wrap mb-3">
                <div class="text-bold text-color-secondary">
                  {{ s.title }}
                </div>
              </div>
              <div class="flex flex-column text-sm max-h-10rem overflow-auto">
                <div v-for="v of s.informations" :key="v">
                  {{ v }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
