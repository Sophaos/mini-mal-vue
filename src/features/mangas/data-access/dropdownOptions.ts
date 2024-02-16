import type { DropdownOption } from '@/shared/data-access/models/dropdownOption'

export const MEDIAS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'manga', label: 'Manga' },
  { value: 'novel', label: 'Novel' },
  { value: 'lightnovel', label: 'Lightnovel' },
  { value: 'oneshot', label: 'Oneshot' },
  { value: 'doujin', label: 'Doujin' },
  { value: 'manhwa', label: 'Manhwa' }
]

export const STATUSES: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'publishing', label: 'Publishing' },
  { value: 'complete', label: 'Complete' },
  { value: 'hiatus', label: 'Hiatus' },
  { value: 'discontinued', label: 'Discontinued' },
  { value: 'upcoming', label: 'Upcoming' }
]

export const ORDERS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'title', label: 'Title' },
  { value: 'start_date', label: 'Start Date' },
  { value: 'end_date', label: 'End Date' },
  { value: 'chapters', label: 'Chapters' },
  { value: 'volumes', label: 'Volumes' },
  { value: 'score', label: 'Score' },
  { value: 'rank', label: 'Rank' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'favorites', label: 'Favorites' }
]

export const SORTS: DropdownOption[] = [
  { value: '', label: 'None' },
  { value: 'desc', label: 'Descending' },
  { value: 'asc', label: 'Ascending' }
]

export const SCORES: DropdownOption[] = [
  { value: '1', label: '1' },
  { value: '2', label: '2' },
  { value: '3', label: '3' },
  { value: '4', label: '4' },
  { value: '5', label: '5' },
  { value: '6', label: '6' },
  { value: '7', label: '7' },
  { value: '8', label: '8' },
  { value: '9', label: '9' },
  { value: '10', label: '10' }
]
