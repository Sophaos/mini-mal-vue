
<script setup lang="ts">
import { ref } from 'vue'
import Menubar from 'primevue/menubar'
import Avatar from 'primevue/avatar'

const items = ref([
  {
    label: 'Home'
  },
  {
    label: 'Animes'
  },
  {
    label: 'Mangas'
  },
  {
    label: 'Season'
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