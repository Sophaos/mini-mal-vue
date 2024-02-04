export interface Pagination {
  first: number
  rows: number
  total: number
}
export function getPagination(
  limit: string | number,
  page: string | number,
  total: number
): Pagination {
  const first = Number(page) - 1
  return {
    first: first * Number(limit),
    rows: Number(limit),
    total
  }
}
