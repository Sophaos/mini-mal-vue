import axios from 'axios'
import { app } from '@/main'
import type { HomeRecommendation } from '@/shared/data-access/models/homeRecommendation'
import type { Review } from '@/shared/data-access/models/review'

axios.interceptors.response.use(
  (response) => {
    return response
  },
  (error) => {
    console.error('HTTP error occurred:', error)
    app.config.globalProperties.$toast.add({
      severity: 'error',
      summary: 'Error',
      detail: error,
      life: 3000
    })

    return Promise.reject(error)
  }
)

const BASE_URL = 'https://api.jikan.moe/v4'

export const getTopAiringAnimes = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/top/anime`)
    return res.data
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getRecentAnimeReviews = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/reviews/anime`)
    const currentDate = new Date()
    const recentAnimeReviews: Review[] = res.data.data
      .map((item: any) => {
        const targetDate = new Date(item.date)
        const timeDifferenceMillis = currentDate.getTime() - targetDate.getTime()
        const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60)
        return {
          id: item.entry.mal_id,
          score: item.score,
          content: item.review,
          imageSrc: item.entry.images.jpg.image_url,
          title: item.entry.title,
          user: item.user.username,
          tags: [...item.tags],
          hoursDifference: Math.round(hoursDifference)
        } satisfies Review
      })
      .slice(0, 10)
    return recentAnimeReviews
  } catch (error) {
    console.error('Error fetching recent anime reviews:', error)
    throw error
  }
}

export const getRecentAnimeRecommendations = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/recommendations/anime`)
    const currentDate = new Date()
    const recentAnimeRecommendations: HomeRecommendation[] = res.data.data
      .map((item: any) => {
        const targetDate = new Date(item.date)
        const timeDifferenceMillis = currentDate.getTime() - targetDate.getTime()
        const hoursDifference = timeDifferenceMillis / (1000 * 60 * 60)
        return {
          id: item.mal_id,
          likedMediaTitle: item.entry[0].title,
          likedMediaId: item.entry[0].mal_id,
          likedMediaImage: item.entry[0].images.jpg.image_url,
          mightLikeMediatitle: item.entry[1].title,
          mightLikeMediaId: item.entry[1].mal_id,
          mightLikeMediaImage: item.entry[1].images.jpg.image_url,
          content: item.content,
          user: item.user.username,
          hoursDifference: Math.round(hoursDifference)
        } satisfies HomeRecommendation
      })
      .slice(0, 10)
    return recentAnimeRecommendations
  } catch (error) {
    console.error('Error fetching recent anime recommendations:', error)
    throw error
  }
}
