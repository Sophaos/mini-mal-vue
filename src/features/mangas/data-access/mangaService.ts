import axios from '@/middleware/axios-config'
import type { BasicDisplayData } from '@/shared/data-access/models/basicDisplayData'
import type { DetailedReview } from '@/shared/data-access/models/detailedReview'
import type { MangaQueryParams } from '@/shared/data-access/models/mangaQueryParams'
import type { Media } from '@/shared/data-access/models/media'
import type { Pagination } from '@/shared/data-access/models/pagination'
import type { Recommendation } from '@/shared/data-access/models/recommendation'
import type { ImageData } from '@/shared/data-access/models/imageData'

const BASE_URL = 'https://api.jikan.moe/v4/manga'

export const getMangaList = async (params: MangaQueryParams) => {
  try {
    const res = await axios.get(`${BASE_URL}`)
    const data: Media[] = res.data.data.map(
      (item: any) =>
        ({
          id: item.mal_id,
          title: item.title,
          titleEnglish: item.title_english,
          from: item.aired?.from,
          episodes: item.episodes,
          genres: item.genres.map((r: any) => r.name),
          imageSrc: item.images.jpg.image_url,
          synopsis: item.synopsis,
          score: item.score,
          members: item.members
        }) satisfies Media
    )
    const pagination: Pagination = {
      first: res.data.pagination.current_page,
      rows: res.data.pagination.items.per_page,
      total: res.data.pagination.items.total
    }
    return { mediaData: { data, pagination } }
  } catch (error) {
    console.error('Error fetching top airing mangas:', error)
    throw error
  }
}

export const getMangaDetail = async (id: any) => {
  try {
    const res = (await axios.get(`${BASE_URL}/${id}/full`)).data
    const mediaData: Media = {
      id: res.data.mal_id,
      title: res.data.title,
      titleEnglish: res.data.title_english,
      imageSrc: res.data.images.jpg.image_url,
      synopsis: res.data.synopsis,
      score: res.data.score,
      members: res.data.members,
      rank: res.data.rank,
      popularity: res.data.popularity,
      favorites: res.data.favorites,
      source: res.data.source,
      type: res.data.type,
      rating: res.data.rating,
      status: res.data.status,
      duration: res.data.duration,
      season: res.data.season,
      year: res.data.year,
      background: res.data.background,
      imageLargeSrc: res.data.images.jpg.large_image_url,
      relations: res.data.relations.map((r: any) => ({
        title: r.relation,
        informations: r.entry.map((e: any) => e.name)
      })),
      genres: res.data.genres.map((r: any) => r.name),
      demographics: res.data.demographics.map((r: any) => r.name)
    }
    return mediaData
  } catch (error) {
    console.error('Error fetching top airing mangas:', error)
    throw error
  }
}

export const getMangaPictures = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/pictures`)
    const images: ImageData[] = res.data.data.map(
      (item: any) =>
        ({
          imageLarge: item.jpg.large_image_url,
          imageSmall: item.jpg.small_image_url
        }) satisfies ImageData
    )
    return images
  } catch (error) {
    console.error('Error fetching top airing mangas:', error)
    throw error
  }
}

export const getMangaRecommendations = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/recommendations`)
    const recommendations = res.data.data.map(
      (item: any) =>
        ({
          id: item.entry.mal_id,
          title: item.entry.title,
          votes: item.votes,
          imageSrc: item.entry.images.jpg.image_url
        }) satisfies Recommendation
    )
    return recommendations
  } catch (error) {
    console.error('Error fetching top airing mangas:', error)
    throw error
  }
}

export const getMangaReviews = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/reviews`)
    const reviews: DetailedReview[] = res.data.data.map((item: any) => {
      return {
        content: item.review,
        score: item.score,
        user: item.user.username,
        imageSrc: item.user.images.jpg.image_url,
        tags: [...item.tags],
        date: item.date
      } satisfies DetailedReview
    })
    return reviews
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getMangaCharacters = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL}/${id}/characters`)
    const characters: BasicDisplayData[] = res.data.data.map(
      (item: any) =>
        ({
          imageSrc: item.character.images.jpg.image_url,
          title: `${item.character.name} (${item.role})`
        }) satisfies BasicDisplayData
    )
    return characters
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}
