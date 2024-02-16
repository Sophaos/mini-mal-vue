<script setup lang="ts">
import {
  getMangaDetail,
  getMangaPictures,
  getMangaCharacters,
  getMangaReviews,
  getMangaRecommendations
} from '@/features/mangas/data-access/mangaService'
import { useQuery } from '@tanstack/vue-query'
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DetailedPreviewContent from '@/shared/ui/DetailedPreviewContent.vue'
import PanelComponent from '@/shared/ui/PanelComponent.vue'
import MainPreviewContentComponent from '@/shared/ui/MainPreviewContentComponent.vue'
import RelationsComponent from '@/shared/ui/RelationsComponent.vue'
import ThemeComponent from '@/shared/ui/ThemeComponent.vue'
import CharactersComponent from '@/shared/ui/CharactersComponent.vue'
import DetailedReviewComponent from '@/shared/ui/DetailedReviewComponent.vue'
import MediaRecommendationsComponent from '@/shared/ui/MediaRecommendationsComponent.vue'

defineProps<{}>()

const route = useRoute()

const id = computed(() => route.params.id)
const doesMangaPicturesCharactersHaveData = computed(
  () => mangaSuccess && picturesSuccess && charactersSuccess
)

const {
  data: manga,
  isFetching: isMangaDetailsFetching,
  isSuccess: mangaSuccess
} = useQuery({
  queryKey: ['mangaDetails', id],
  queryFn: () => getMangaDetail(id.value),
  enabled: true
})

const {
  data: pictures,
  isFetching: arePicturesFetching,
  isSuccess: picturesSuccess
} = useQuery({
  queryKey: ['mangaPictures', id],
  queryFn: () => getMangaPictures(id.value),
  enabled: true
})

const {
  data: characters,
  isFetching: areCharactersFetching,
  isSuccess: charactersSuccess
} = useQuery({
  queryKey: ['mangaCharacters', id],
  queryFn: () => getMangaCharacters(id.value),
  enabled: true
})

const {
  data: reviews,
  isFetching: areReviewsFetching,
  isSuccess: reviewsSuccess
} = useQuery({
  queryKey: ['mangaReviews', id],
  queryFn: () => getMangaReviews(id.value),
  enabled: doesMangaPicturesCharactersHaveData.value
})

const { data: recommendations, isFetching: areRecommendationsFetching } = useQuery({
  queryKey: ['mangaRecommendations', id],
  queryFn: () => getMangaRecommendations(id.value),
  enabled: reviewsSuccess
})
</script>

<template>
  <div class="col-12 flex flex-column gap-1 mt-1">
    <PanelComponent>
      <MainPreviewContentComponent
        v-if="manga"
        :media="manga"
        type="mangas"
        :isLoading="isMangaDetailsFetching"
        :pictures="pictures"
      >
        <DetailedPreviewContent :media="manga" type="mangas" />
      </MainPreviewContentComponent>
    </PanelComponent>
    <PanelComponent title="Background" :isCollapsed="false">
      <div v-if="manga?.background">{{ manga.background }}</div>
    </PanelComponent>
    <PanelComponent title="Relations" :isCollapsed="true">
      <div class="h-7rem overflow-auto">
        <RelationsComponent v-if="manga?.relations" :relations="manga.relations" />
      </div>
    </PanelComponent>
    <PanelComponent class="flex-1" title="Characters" :isCollapsed="false">
      <div class="h-20rem overflow-auto">
        <CharactersComponent v-if="characters" :characters="characters" />
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
          route="manga-detail"
        />
      </div>
    </PanelComponent>
  </div>
</template>
