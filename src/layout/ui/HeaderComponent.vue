<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'
import { getCurrentSeason } from '@/shared/utils/currentSeason'

const currentSeason = getCurrentSeason()
const currentYear = new Date().getFullYear()
const seasonUrl = `/season/${currentYear}/${currentSeason}?page=1&limit=16`
const items = ref([
  {
    label: 'Home',
    route: '/'
  },
  {
    label: 'Animes',
    route: '/animes'
  },
  {
    label: 'Mangas',
    route: '/mangas'
  },
  {
    label: 'Season',
    route: seasonUrl
  }
])
</script>

<template>
  <div class="card">
    <Menubar :model="items">
      <template #start>
        <Avatar image="https://cdn.myanimelist.net/images/kaomoji_mal_white.png" shape="circle" />
      </template>
      <template #item="{ item, props }">
        <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
          <a v-ripple :href="href" v-bind="props.action" @click="navigate">
            <span class="ml-2">{{ item.label }}</span>
          </a>
        </router-link>
      </template>
    </Menubar>
  </div>
</template>
