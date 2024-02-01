<script setup lang="ts">
import { useQuery } from '@tanstack/vue-query'
import {
  getTopAiringAnimes,
  getRecentAnimeRecommendations,
  getRecentAnimeReviews
} from '../data-access/homeService'
import HomeRecommendationsComponent from '../ui/HomeRecommendationsComponent.vue'
import HomeReviewsComponentVue from '../ui/HomeReviewsComponent.vue'
import MainPreviewComponent from '@/shared/ui/MainPreviewComponent.vue'

const { data: animes, isPending: areAnimesPending } = useQuery({
  queryKey: ['topAiringAnimes'],
  queryFn: getTopAiringAnimes
})
const { data: reviews, isPending: areReviewsPending } = useQuery({
  queryKey: ['recentAnimeReviews'],
  queryFn: getRecentAnimeReviews
})
const { data: recommendations, isPending: areRecommendationsPending } = useQuery({
  queryKey: ['recentAnimeRecommendations'],
  queryFn: getRecentAnimeRecommendations
})
</script>

<template>
  <MainPreviewComponent
    class="my-1 col-12"
    header="Top Airing Animes"
    :data="animes"
    :isLoading="areAnimesPending"
    type="animes"
  />
  <div class="flex flex-wrap">
    <HomeReviewsComponentVue
      class="xl:col-6 lg:col-6 col-12"
      :reviews="reviews"
      :isLoading="areReviewsPending"
    />
    <HomeRecommendationsComponent
      class="xl:col-6 lg:col-6 col-12"
      :recommendations="recommendations"
      :isLoading="areRecommendationsPending"
    />
  </div>
</template>
