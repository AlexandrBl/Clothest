import type { Product } from './type'

// pageNum: number
// `?page=${pageNum}&pageSize=1`

export const initProductsFetch = async (): Promise<Product[]> => {
  const res = await fetch('/api/products')

  const data = await res.json()

  return data
}
