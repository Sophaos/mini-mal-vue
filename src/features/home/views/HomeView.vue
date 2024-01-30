<script setup lang="ts">
import PanelComponent from '@/shared/ui/PanelComponent.vue'
import { useQuery } from '@tanstack/vue-query';
import { getTopAiringAnimes, getRecentAnimeRecommendations, getRecentAnimeReviews } from '../data-access/homeService';
import HomeRecommendationsComponent from '../ui/HomeRecommendationsComponent.vue';
import HomeReviewsComponentVue from '../ui/HomeReviewsComponent.vue';

// const { isPending, isError, data, error } = useQuery({
//   queryKey: ['topAiringAnimes'],
//   queryFn: getTopAiringAnimes,
// })
const { data: animes } = useQuery({
  queryKey: ['topAiringAnimes'],
  queryFn: getTopAiringAnimes,
})
const { data: reviews, isPending: areReviewsPending } = useQuery({
  queryKey: ['recentAnimeReviews'],
  queryFn: getRecentAnimeReviews,
})
const { data: recommendations, isPending: areRecommendationsPending} = useQuery({
  queryKey: ['recentAnimeRecommendations'],
  queryFn: getRecentAnimeRecommendations,
})
</script>

<template>
  <PanelComponent class="my-1 col-12" title="Top Airing Animes" :isCollapsed="false" />
  <div class="flex flex-wrap">
    <PanelComponent class="xl:col-6 lg:col-6 col-12" title="Latest Reviews" :isCollapsed="false">
      <HomeReviewsComponentVue :reviews="reviews" :isLoading="areReviewsPending" />
    </PanelComponent>
    <PanelComponent class="xl:col-6 lg:col-6 col-12" title="Latest Recommendations" :isCollapsed="false"> 
      <HomeRecommendationsComponent :recommendations="recommendations" :isLoading="areRecommendationsPending" />
    </PanelComponent>
  </div>
</template>
