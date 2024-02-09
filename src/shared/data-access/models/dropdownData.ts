import type { DropdownOption } from './dropdownOption'

export interface DropdownData {
  label: string
  value?: string | number
  param: string
  route: 'param' | 'query'
  type?: string
  options?: DropdownOption[]
  multi?: boolean
  change?: (event: string | number, param: string) => void
}
