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
      path: '/animes/:id', // Define the route with a dynamic segment ':id'
      name: 'anime-detail', // Name the route
      component: () => import('../features/animes/views/AnimeDetailsView.vue'), // Assuming you have a component for anime detail view
      props: true // Enable passing route params as props to the component
    },
    {
      path: '/mangas',
      name: 'mangas',
      component: () => import('../features/mangas/views/MangaListView.vue')
    },
    {
      path: '/mangas/:id', // Define the route with a dynamic segment ':id'
      name: 'manga-detail', // Name the route
      component: () => import('../features/mangas/views/MangaDetailsView.vue'), // Assuming you have a component for anime detail view
      props: true // Enable passing route params as props to the component
    },
    {
      path: '/season/:year/:season',
      name: 'season',
      component: () => import('../features/season/views/SeasonListView.vue')
    }
  ]
})

export default router
