<script setup lang="ts">
import { computed, onMounted, watch } from 'vue'
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

defineProps<{}>()

const route = useRoute()
const doesAnimePicturesCharactersHaveData = computed(
  () => animeSuccess && picturesSuccess && charactersSuccess
)

const {
  data: anime,
  isFetching: isAnimeDetailsFetching,
  isSuccess: animeSuccess
} = useQuery({
  queryKey: ['animeDetails'],
  queryFn: () => getAnimeDetail(route.params.id),
  enabled: true
})

const {
  data: pictures,
  isFetching: arePicturesFetching,
  isSuccess: picturesSuccess
} = useQuery({
  queryKey: ['animePictures'],
  queryFn: () => getAnimePictures(route.params.id),
  enabled: true
})

const {
  data: characters,
  isFetching: areCharactersFetching,
  isSuccess: charactersSuccess
} = useQuery({
  queryKey: ['animeCharacters'],
  queryFn: () => getAnimeCharacters(route.params.id),
  enabled: true
})

const {
  data: staff,
  isFetching: areStaffFetching,
  isSuccess: staffSuccess
} = useQuery({
  queryKey: ['animeStaff'],
  queryFn: () => getAnimeStaff(route.params.id),
  enabled: doesAnimePicturesCharactersHaveData.value
})

const {
  data: reviews,
  isFetching: areReviewsFetching,
  isSuccess: reviewsSuccess
} = useQuery({
  queryKey: ['animeReviews'],
  queryFn: () => getAnimeReviews(route.params.id),
  enabled: staffSuccess
})

const { data: recommendations, isFetching: areRecommendationsFetching } = useQuery({
  queryKey: ['animeRecommendations'],
  queryFn: () => getAnimeRecommendations(route.params.id),
  enabled: reviewsSuccess
})
</script>

<template>
  <div class="col-12 flex flex-column gap-1 mt-1">
    <template v-if="anime">
    <PanelComponent>
      
        <MainPreviewContentComponent
          :media="anime"
          type="animes"
          :isLoading="isAnimeDetailsFetching"
          :pictures="pictures"
        >
          <DetailedPreviewContent :media="anime" type="animes" />
        </MainPreviewContentComponent>
        <!-- 
        <app-items-container title="Relations" [isCollapsed]="true">
          <div class="h-7rem overflow-auto">
            <app-relations
              *ngIf="vm.anime.relations"
              [relations]="vm.anime.relations"
            />
          </div>
        </app-items-container>
        <div class="flex flex-column xl:flex-row lg:flex-row md:flex-row gap-1">
          <app-theme
            *ngIf="vm.anime.openings"
            class="flex-1"
            [data]="vm.anime.openings"
            title="Opening Theme"
            [isCollapsed]="true"
          />
          <app-theme
            *ngIf="vm.anime.endings"
            class="flex-1"
            [data]="vm.anime.endings"
            title="Ending Theme"
            [isCollapsed]="true"
          />
        </div>
        <app-items-container
          title="Characters"
          [isCollapsed]="false"
          class="flex-1"
        >
          <div class="h-20rem overflow-auto">
            <app-characters [characters]="vm.characters" />
          </div>
        </app-items-container>
      </ng-container>
    </ng-container>
    <ng-container *ngIf="vmExternal$ | async as vm; else externalLoading">
      <ng-container *ngIf="!vm.isLoading; else externalLoading">
        <app-items-container title="Staff" [isCollapsed]="true" class="flex-1">
          <div class="h-20rem overflow-auto">
            <app-staff [staff]="vm.staff" />
          </div>
        </app-items-container>
        <app-items-container title="Latest Reviews" [isCollapsed]="false">
          <div class="max-h-30rem overflow-auto">
            <ng-container *ngFor="let review of vm.reviews">
              <app-detailed-review class="w-12" [review]="review" />
            </ng-container>
          </div>
        </app-items-container>
        <app-items-container title="Recommendations" [isCollapsed]="false">
          <div class="max-h-30rem overflow-auto">
            <app-media-recommendations
              *ngIf="vm.recommendations && vm.recommendations.length > 0"
              [recommendations]="vm.recommendations"
            />
          </div>
        </app-items-container>
      </ng-container>
    </ng-container>
         -->
        </PanelComponent>
        <PanelComponent title="Background" :isCollapsed="false">
          <div>{{ anime.background }}</div>
        </PanelComponent>
      </template>
  </div>
</template>
