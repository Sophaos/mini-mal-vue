import axios from '@/middleware/axios-config'
import type { AnimeQueryParams } from '@/shared/data-access/models/animeQueryParams'
import type { Media } from '@/shared/data-access/models/media'
import { getPagination, type Pagination } from '@/shared/data-access/models/pagination'
import type { ImageData } from '@/shared/data-access/models/imageData'
import type { BasicDisplayData } from '@/shared/data-access/models/basicDisplayData'
import type { DetailedReview } from '@/shared/data-access/models/detailedReview'
import type { Recommendation } from '@/shared/data-access/models/recommendation'
import type { DropdownOption } from '@/shared/data-access/models/dropdownOption'

const BASE_URL = 'https://api.jikan.moe/v4'
const BASE_URL_ANIME = `${BASE_URL}/anime`

export const getAnimeList = async (queryParams: AnimeQueryParams) => {
  try {
    const res = await axios.get(`${BASE_URL_ANIME}`, {
      params: { ...queryParams }
    })
    const data: Media[] = res.data.data.map(
      (item: any) =>
        ({
          id: item.mal_id,
          title: item.title,
          titleEnglish: item.title_english,
          from: item.aired?.from,
          episodes: item.episodes,
          imageSrc: item.images.jpg.image_url,
          synopsis: item.synopsis,
          score: item.score,
          members: item.members,
          genres: item.genres.map((r: any) => r.name)
        }) satisfies Media
    )
    const pagination: Pagination = getPagination(
      res.data.pagination.items.per_page,
      res.data.pagination.current_page,
      res.data.pagination.items.total
    )
    return { mediaData: { data, pagination } }
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getAnimeGenres = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/genres/anime`)
    const genres: DropdownOption[] = response.data.data.map((item: any) => ({
      value: item.mal_id.toString(),
      label: item.name
    }))
    return genres
  } catch (error) {
    console.error('Error fetching anime genre:', error)
    throw error
  }
}

export const getAnimeDetail = async (id: any) => {
  try {
    const res = (await axios.get(`${BASE_URL_ANIME}/${id}/full`)).data
    const mediaData: Media = {
      id: res.data.mal_id,
      title: res.data.title,
      titleEnglish: res.data.title_english,
      from: res.data.aired?.string,
      episodes: res.data.episodes,
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
      themes: res.data.themes.map((r: any) => r.name),
      demographics: res.data.demographics.map((r: any) => r.name),
      studios: res.data.studios.map((r: any) => r.name),
      producers: res.data.producers.map((r: any) => r.name),
      streaming: res.data.streaming.map((r: any) => r.name),
      licensors: res.data.licensors.map((r: any) => r.name),
      openings: res.data.theme.openings.map((r: any) => r),
      endings: res.data.theme.endings.map((r: any) => r)
    }
    return mediaData
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getAnimePictures = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL_ANIME}/${id}/pictures`)
    const images: ImageData[] = res.data.data.map(
      (item: any) =>
        ({
          imageLarge: item.jpg.large_image_url,
          imageSmall: item.jpg.small_image_url
        }) satisfies ImageData
    )
    return images
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getAnimeRecommendations = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL_ANIME}/${id}/recommendations`)
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
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getAnimeReviews = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL_ANIME}/${id}/reviews`)
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

export const getAnimeCharacters = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL_ANIME}/${id}/characters`)
    const characters: BasicDisplayData[] = res.data.data.map(
      (item: any) =>
        ({
          imageSrc: item.character.images.jpg.image_url,
          title: `${item.character.name} (${item.role})`,
          informations: item.voice_actors.map((v: any) => `${v.person.name} ${v.language}`)
        }) satisfies BasicDisplayData
    )
    return characters
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getAnimeStaff = async (id: any) => {
  try {
    const res = await axios.get(`${BASE_URL_ANIME}/${id}/staff`)
    const staff: BasicDisplayData[] = res.data.data.map(
      (item: any) =>
        ({
          imageSrc: item.person.images.jpg.image_url,
          title: `${item.person.name}`,
          informations: item.positions.map((v: string) => `${v}`)
        }) satisfies BasicDisplayData
    )
    return staff
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}
