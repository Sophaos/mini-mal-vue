<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { getAnimeDetail, getAnimePictures } from '../data-access/animeService'
import { useQuery } from '@tanstack/vue-query'
import DetailedPreviewContent from '@/shared/ui/DetailedPreviewContent.vue'
import PanelComponentVue from '@/shared/ui/PanelComponent.vue'
import MainPreviewContentComponentVue from '@/shared/ui/MainPreviewContentComponent.vue'

defineProps<{}>()

const route = useRoute()

const { data: anime, isPending: isPending } = useQuery({
  queryKey: ['animeList'],
  queryFn: () => getAnimeDetail(route.params.id)
})

const { data: pictures, isPending: isPicturesPending } = useQuery({
  queryKey: ['animePictures'],
  queryFn: () => getAnimePictures(route.params.id)
})

// watch(() => route.params.id, async (newId, oldId) => {
//     console.log(newId, oldId);

//   if (newId !== oldId) {
//     console.log(newId, oldId);
//   }
// });

// onMounted(() => {
//     console.log(route.params.id);

// });
</script>

<template>
  <PanelComponentVue class="col-12">
    <template v-if="anime">
      <MainPreviewContentComponentVue
        :media="anime"
        type="animes"
        :isLoading="isPending"
        :pictures="pictures"
      >
        <DetailedPreviewContent :media="anime" type="animes" />
      </MainPreviewContentComponentVue>
    </template>
  </PanelComponentVue>
</template>
