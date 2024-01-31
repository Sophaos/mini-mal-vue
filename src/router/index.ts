import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../features/home/views/HomeView.vue')
    },
    {
      path: '/animes',
      name: 'animes',
      component: () => import('../features/animes/views/AnimeListView.vue')
    },
    {
      path: '/season/:year/:season',
      name: 'season',
      component: () => import('../features/season/views/SeasonListView.vue')
    },
    {
      path: '/mangas',
      name: 'mangas',
      component: () => import('../features/mangas/views/MangaListView.vue')
    }
  ]
})

export default router
