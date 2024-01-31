import axios from '@/middleware/axios-config'
import type { DropdownOption } from '@/shared/data-access/models/dropdownOption'
import type { Media } from '@/shared/data-access/models/media'
import type { Pagination } from '@/shared/data-access/models/pagination'
import type { SeasonData } from '@/shared/data-access/models/seasonData'
import type { SeasonParams } from '@/shared/data-access/models/seasonParams'

const BASE_URL = 'https://api.jikan.moe/v4'

// export const getSeasonMediaData = async (params: SeasonParams) => {

export const getSeasonMediaData = async (params: SeasonParams) => {
  try {
    const res = await axios.get(`${BASE_URL}/seasons/${params.year}/${params.season}`)
    const data: Media[] = res.data.data.map((item: any) => ({
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
    }))
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

export const getSeasonData = async () => {
  try {
    const res = await axios.get(`${BASE_URL}/seasons`)
    const seasonData: SeasonData[] = res.data.data.map(
      (item: any) =>
        ({
          year: item.year,
          seasonOptions: item.seasons.map(
            (s: string) =>
              ({
                label: s.charAt(0).toUpperCase() + s.slice(1),
                value: s
              }) satisfies DropdownOption
          )
        }) satisfies SeasonData
    )
    const yearOptions: DropdownOption[] = seasonData.map(
      (s: SeasonData) =>
        ({
          label: s.year,
          value: s.year.toString()
        }) satisfies DropdownOption
    )
    return { yearsSeasonsData: { seasonData, yearOptions } }
  } catch (error) {
    console.error('Error fetching top airing animes:', error)
    throw error
  }
}
