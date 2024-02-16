import type { LocationQueryValue } from 'vue-router'
import type { DropdownOption } from './dropdownOption'

export interface DropdownData {
  label: string
  value?: LocationQueryValue | LocationQueryValue[] | number
  param: string
  route: 'param' | 'query'
  type?: string
  options?: DropdownOption[]
  multi?: boolean
}
