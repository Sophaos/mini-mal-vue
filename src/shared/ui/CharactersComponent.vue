<script setup lang="ts">
import type { BasicDisplayData } from '../data-access/models/basicDisplayData'

defineProps<{
  characters: BasicDisplayData[]
}>()
</script>

<template>
  <div class="flex flex-row flex-wrap">
    <div
      v-for="c of characters"
      :key="c.title"
      class="col-12 md:col-6 lg:col-4 xl:col-3 flex flex-row"
    >
      <img class="w-6 border-round-lg" :src="c.imageSrc" />
      <div
        class="flex flex-column sm:flex-row justify-content-between align-items-start flex-1 gap-4"
      >
        <div class="flex flex-column align-items-start gap-3 col-12">
          <div class="flex justify-content-between flex-wrap w-full">
            <div class="min-w-full text-sm">
              <div class="flex flex-row justify-content-between flex-wrap mb-3">
                <div class="text-bold text-color-secondary">
                  {{ c.title }}
                </div>
              </div>
              <div v-if="c.informations" class="flex flex-column text-sm max-h-11rem overflow-auto">
                <div v-for="v of c.informations" class="mb-1" :key="v">
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
