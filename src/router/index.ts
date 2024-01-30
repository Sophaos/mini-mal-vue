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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../features/animes/views/AnimeListView.vue')
    },
    {
      path: '/season',
      name: 'season',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../features/season/views/SeasonListView.vue')
    },
    {
      path: '/mangas',
      name: 'mangas',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../features/mangas/views/MangaListView.vue')
    }
  ]
})

export default router
