import axios from '@/middleware/axios-config'
import type { AnimeQueryParams } from '@/shared/data-access/models/animeQueryParams'
import type { Media } from '@/shared/data-access/models/media'
import type { Pagination } from '@/shared/data-access/models/pagination'
import type { ImageData } from '@/shared/data-access/models/imageData'

const BASE_URL = 'https://api.jikan.moe/v4'

// export const getSeasonMediaData = async (params: SeasonParams) => {

export const getAnimeList = async (params: AnimeQueryParams) => {
  try {
    const res = await axios.get(`${BASE_URL}/anime`)
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
    const pagination: Pagination = {
      first: res.data.pagination.current_page,
      rows: res.data.pagination.items.per_page,
      total: res.data.pagination.items.total
    }
    return { mediaData: { data, pagination } }
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}

export const getAnimeDetail = async (id: any) => {
  try {
    const res = (await axios.get(`${BASE_URL}/anime/${id}/full`)).data
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
    const res = await axios.get(`${BASE_URL}/anime/${id}/pictures`)
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
