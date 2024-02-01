import axios from '@/middleware/axios-config'
import type { AnimeQueryParams } from '@/shared/data-access/models/animeQueryParams'
import type { MangaQueryParams } from '@/shared/data-access/models/mangaQueryParams'
import type { Media } from '@/shared/data-access/models/media'
import type { Pagination } from '@/shared/data-access/models/pagination'

const BASE_URL = 'https://api.jikan.moe/v4'

// export const getSeasonMediaData = async (params: SeasonParams) => {

export const getMangaList = async (params: MangaQueryParams) => {
  try {
    const res = await axios.get(`${BASE_URL}/manga`)
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
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}
