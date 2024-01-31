
<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import { getCurrentSeason } from '@/shared/utils/currentSeason';

const currentSeason = getCurrentSeason();
const currentYear = new Date().getFullYear();
const seasonUrl = `/season/${currentYear}/${currentSeason}`;
const items = ref([
  {
    label: 'Home',
    url: '/'
  },
  {
    label: 'Animes',
    url: '/animes'
  },
  {
    label: 'Mangas',
    url: '/mangas'
  },
  {
    label: 'Season',
    url: seasonUrl
  }
])
</script>

<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <Avatar image="https://cdn.myanimelist.net/images/kaomoji_mal_white.png" shape="circle" />
      </template>
    </Menubar>
  </div>
</template>