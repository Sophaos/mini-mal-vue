<script setup lang="ts">
import MediaDataComponent from '@/shared/ui/MediaDataComponent.vue'
import { useQuery } from '@tanstack/vue-query'
import { getAnimeList } from '../data-access/animeService'
import PaginatorComponent from '@/shared/ui/PaginatorComponent.vue'
import { useRoute, useRouter } from 'vue-router'

// const route = useRoute()
// const router = useRouter()

// // Extracting parameters from the URL
// const { id, category } = route.params

// // If parameters are not present in the URL, set default values and update the URL
// if (!id || !category) {
//   const defaultId = 'defaultId'
//   const defaultCategory = 'defaultCategory'

//   // Programmatically update the route with default parameters
//   router.push({
//     name: 'YourRouteName', // Replace with the name of your route
//     params: { id: defaultId, category: defaultCategory }
//   })
// }

const { data: animes, isPending: isPending } = useQuery({
  queryKey: ['animeList'],
  queryFn: () => getAnimeList({})
})

defineProps<{}>()
</script>

<template>
  <div class="col-12">
    <MediaDataComponent :isLoading="isPending" :data="animes?.mediaData.data ?? []" type="anime" />
    <PaginatorComponent :pagination="animes?.mediaData.pagination" />
  </div>
</template>
