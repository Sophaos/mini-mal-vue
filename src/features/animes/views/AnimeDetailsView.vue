<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import {
  getAnimeCharacters,
  getAnimeDetail,
  getAnimePictures,
  getAnimeRecommendations,
  getAnimeReviews,
  getAnimeStaff
} from '../data-access/animeService'
import { useQuery } from '@tanstack/vue-query'
import DetailedPreviewContent from '@/shared/ui/DetailedPreviewContent.vue'
import PanelComponent from '@/shared/ui/PanelComponent.vue'
import MainPreviewContentComponent from '@/shared/ui/MainPreviewContentComponent.vue'
import RelationsComponent from '@/shared/ui/RelationsComponent.vue'
import ThemeComponent from '@/shared/ui/ThemeComponent.vue'
import CharactersComponent from '@/shared/ui/CharactersComponent.vue'
import StaffComponent from '@/shared/ui/StaffComponent.vue'
import DetailedReviewComponent from '@/shared/ui/DetailedReviewComponent.vue'
import MediaRecommendationsComponent from '@/shared/ui/MediaRecommendationsComponent.vue'

defineProps<{}>()

const route = useRoute()

const id = computed(() => route.params.id)
const doesAnimePicturesCharactersHaveData = computed(
  () => animeSuccess && picturesSuccess && charactersSuccess
)

const {
  data: anime,
  isFetching: isAnimeDetailsFetching,
  isSuccess: animeSuccess
} = useQuery({
  queryKey: ['animeDetails', id],
  queryFn: () => getAnimeDetail(id.value),
  enabled: true
})

const {
  data: pictures,
  isFetching: arePicturesFetching,
  isSuccess: picturesSuccess
} = useQuery({
  queryKey: ['animePictures', id],
  queryFn: () => getAnimePictures(id.value),
  enabled: true
})

const {
  data: characters,
  isFetching: areCharactersFetching,
  isSuccess: charactersSuccess
} = useQuery({
  queryKey: ['animeCharacters', id],
  queryFn: () => getAnimeCharacters(id.value),
  enabled: true
})

const {
  data: staff,
  isFetching: areStaffFetching,
  isSuccess: staffSuccess
} = useQuery({
  queryKey: ['animeStaff', id],
  queryFn: () => getAnimeStaff(id.value),
  enabled: doesAnimePicturesCharactersHaveData.value
})

const {
  data: reviews,
  isFetching: areReviewsFetching,
  isSuccess: reviewsSuccess
} = useQuery({
  queryKey: ['animeReviews', id],
  queryFn: () => getAnimeReviews(id.value),
  enabled: staffSuccess
})

const { data: recommendations, isFetching: areRecommendationsFetching } = useQuery({
  queryKey: ['animeRecommendations', id],
  queryFn: () => getAnimeRecommendations(id.value),
  enabled: reviewsSuccess
})
</script>

<template>
  <div class="col-12 flex flex-column gap-1 mt-1">
    <PanelComponent>
      <MainPreviewContentComponent
        v-if="anime"
        :media="anime"
        type="animes"
        :isLoading="isAnimeDetailsFetching"
        :pictures="pictures"
      >
        <DetailedPreviewContent :media="anime" type="animes" />
      </MainPreviewContentComponent>
    </PanelComponent>
    <PanelComponent title="Background" :isCollapsed="false">
      <div v-if="anime?.background">{{ anime.background }}</div>
    </PanelComponent>
    <PanelComponent title="Relations" :isCollapsed="true">
      <div class="h-7rem overflow-auto">
        <RelationsComponent v-if="anime?.relations" :relations="anime.relations" />
      </div>
    </PanelComponent>
    <div class="flex flex-column xl:flex-row lg:flex-row md:flex-row gap-1">
      <PanelComponent class="w-6" title="Opening Theme(s)" :isCollapsed="true">
        <ThemeComponent v-if="anime?.openings" class="flex-1" :data="anime.openings" />
      </PanelComponent>
      <PanelComponent class="w-6" title="Ending Theme(s)" :isCollapsed="true">
        <ThemeComponent v-if="anime?.endings" class="flex-1" :data="anime.endings" />
      </PanelComponent>
    </div>
    <PanelComponent class="flex-1" title="Characters" :isCollapsed="false">
      <div class="h-20rem overflow-auto">
        <CharactersComponent v-if="characters" :characters="characters" />
      </div>
    </PanelComponent>
    <PanelComponent title="Staff" :isCollapsed="true" class="flex-1">
      <div class="h-20rem overflow-auto">
        <StaffComponent v-if="staff" :staff="staff" />
      </div>
    </PanelComponent>
    <PanelComponent title="Latest Reviews" :isCollapsed="false">
      <div class="max-h-30rem overflow-auto">
        <DetailedReviewComponent
          v-for="review of reviews"
          :key="review.date"
          class="w-12"
          :review="review"
        />
      </div>
    </PanelComponent>
    <PanelComponent title="Recommendations" :isCollapsed="false">
      <div class="max-h-30rem overflow-auto">
        <MediaRecommendationsComponent
          v-if="recommendations && recommendations.length > 0"
          :recommendations="recommendations"
          route="anime-detail"
        />
      </div>
    </PanelComponent>
  </div>
</template>
